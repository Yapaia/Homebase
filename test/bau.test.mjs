/**
 * Die Seite baut, alle Designs haben dieselben Seiten, beide Sprachen sind
 * vollständig, und kein Verweis zeigt ins Leere.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { baue, DESIGNS } from '../bau/bau.mjs';
import { kopfUndText, markdown, slugVon, ladeInhalt } from '../bau/inhalt.mjs';

const ZIEL = mkdtempSync(join(tmpdir(), 'homebase-'));
await baue({ ziel: ZIEL, leise: true });
process.on('exit', () => rmSync(ZIEL, { recursive: true, force: true }));

function seiten(ordner) {
  const liste = [];
  const lauf = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) lauf(p);
      else if (n.endsWith('.html')) liste.push(relative(ordner, p));
    }
  };
  lauf(ordner);
  return liste.sort();
}

test('alle drei Designs werden gebaut und haben dieselben Seiten', () => {
  assert.deepEqual(DESIGNS, ['horizont', 'kompass', 'logbuch']);
  const erste = seiten(join(ZIEL, DESIGNS[0]));
  assert.ok(erste.length > 40, `nur ${erste.length} Seiten`);
  for (const d of DESIGNS.slice(1)) assert.deepEqual(seiten(join(ZIEL, d)), erste, d);
});

test('Deutsch und Englisch haben dieselben Kapitel', () => {
  const de = ladeInhalt(join(import.meta.dirname, '..', 'inhalt'), 'de');
  const en = ladeInhalt(join(import.meta.dirname, '..', 'inhalt'), 'en');
  for (const teil of ['module', 'handbuch', 'technik', 'seiten']) {
    assert.deepEqual(en[teil].map((x) => x.slug).sort(), de[teil].map((x) => x.slug).sort(), teil);
  }
});

test('jede Seite trägt Sprache, Design, ihr Stylesheet und einen Titel', () => {
  for (const d of DESIGNS) {
    for (const s of ['de', 'en']) {
      const html = readFileSync(join(ZIEL, d, s, 'index.html'), 'utf-8');
      assert.match(html, new RegExp(`<html lang="${s}" data-design="${d}">`));
      assert.match(html, new RegExp(`href="/assets/${d}\\.css\\?v=`));
      assert.match(html, /<title>Yapaia – Smart RV Solutions<\/title>/);
      assert.match(html, /<script src="\/_vorschau\.js" defer><\/script>/);
      assert.ok(html.includes(`hreflang="${s === 'de' ? 'en' : 'de'}"`));
    }
  }
});

test('keine fremden Server: keine externen Skripte, Schriften oder Stylesheets', () => {
  for (const d of DESIGNS) {
    for (const datei of seiten(join(ZIEL, d))) {
      const html = readFileSync(join(ZIEL, d, datei), 'utf-8');
      assert.doesNotMatch(html, /<(script|link)[^>]+(src|href)="https?:\/\//, `${d}/${datei}`);
    }
    assert.doesNotMatch(readFileSync(join(ZIEL, d, 'assets', `${d}.css`), 'utf-8'), /url\(['"]?https?:/);
  }
});

test('Englische Seiten verlinken nur über den Sprachwechsel ins Deutsche', () => {
  for (const datei of seiten(join(ZIEL, 'horizont', 'en'))) {
    const html = readFileSync(join(ZIEL, 'horizont', 'en', datei), 'utf-8');
    const fremd = [...html.matchAll(/(.{0,14})href="(\/de\/[^"]*)"(.{0,14})/g)].filter(
      ([, davor, , danach]) => !davor.includes('hreflang="de"') && !danach.includes('hreflang="de"'),
    );
    assert.deepEqual(fremd.map((m) => m[2]), [], datei);
  }
});

test('Inhaltsverzeichnis zeigt nur auf vorhandene Überschriften', () => {
  const html = readFileSync(join(ZIEL, 'kompass', 'de', 'docs', 'technik', 'protokoll', 'index.html'), 'utf-8');
  const ziele = [...html.matchAll(/<nav class="toc"[\s\S]*?<\/nav>/g)][0][0].match(/href="#([^"]+)"/g).map((h) => h.slice(7, -1));
  assert.ok(ziele.length >= 5);
  for (const id of ziele) assert.ok(html.includes(`id="${id}"`), id);
});

test('Kopfbereich und Markdown', () => {
  const { kopf, text } = kopfUndText('---\ntitel: Hallo: Welt\nreihenfolge: 3\n---\n# X\n');
  assert.deepEqual(kopf, { titel: 'Hallo: Welt', reihenfolge: 3 });
  assert.equal(text, '# X\n');
  assert.throws(() => kopfUndText('kein Kopf', 'x.md'), /Kopfbereich/);
  assert.equal(slugVon('Größe & Übersicht'), 'groesse-uebersicht');
  const { html, ueberschriften } = markdown('## Eins\n\n| a | b |\n| - | - |\n| 1 | 2 |\n\n## Eins\n');
  assert.match(html, /<div class="tabelle"><table>/);
  assert.deepEqual(ueberschriften.map((u) => u.id), ['eins', 'eins-']);
});

test('Impressum mit Platzhaltern führt zu einer Warnung, nicht zum Abbruch', async () => {
  const ziel = mkdtempSync(join(tmpdir(), 'homebase-w-'));
  const { warnungen } = await baue({ ziel, leise: true });
  rmSync(ziel, { recursive: true, force: true });
  // Solange das Impressum nicht ausgefüllt ist, wird gewarnt.
  const de = readFileSync(join(import.meta.dirname, '..', 'inhalt', 'de', 'seiten', 'impressum.md'), 'utf-8');
  assert.equal(warnungen.some((w) => w.includes('de/seiten/impressum.md')), /\[[^\]]+\](?!\()/.test(de.replace(/<!--[\s\S]*?-->/g, '')));
});
