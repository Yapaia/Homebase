#!/usr/bin/env node
/**
 * Baut die Webseite: für jedes Design einen vollständigen, statischen Ordner
 * unter dist/<design>/ – mit allen Seiten in allen Sprachen.
 *
 *   npm run bau
 *
 * Der Webserver (Caddy, siehe server/) liefert je nach Cookie `design` den
 * passenden Ordner aus. So laufen alle Designs gleichzeitig und lassen sich
 * live vergleichen.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ladeInhalt } from './inhalt.mjs';
import { SPRACHEN, TEXTE } from './texte.mjs';
import * as html from './html.mjs';
import { icon } from './icons.mjs';
import * as bilder from './bilder.mjs';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DESIGNS = process.env.BAU_DESIGNS ? process.env.BAU_DESIGNS.split(',') : ['horizont', 'kompass', 'logbuch'];

function schreibe(datei, inhalt) {
  mkdirSync(dirname(datei), { recursive: true });
  writeFileSync(datei, inhalt);
}

/** Alle internen Verweise (href/src="/…") müssen auf eine gebaute Datei zeigen. */
export function pruefeVerweise(ordner) {
  const fehler = [];
  const dateien = [];
  const lauf = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) lauf(p);
      else if (n.endsWith('.html')) dateien.push(p);
    }
  };
  lauf(ordner);
  for (const datei of dateien) {
    const text = readFileSync(datei, 'utf-8');
    for (const [, ziel] of text.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      if (ziel.startsWith('/_vorschau') || ziel.startsWith('/design/')) continue;
      const pfad = ziel.split('#')[0].split('?')[0];
      if (!pfad) continue;
      const kandidat = pfad.endsWith('/') ? join(ordner, pfad, 'index.html') : join(ordner, pfad);
      if (!existsSync(kandidat)) fehler.push(`${datei.slice(ordner.length)} → ${ziel}`);
    }
  }
  return fehler;
}

export async function baue({ ziel = join(WURZEL, 'dist'), leise = false } = {}) {
  const log = leise ? () => {} : (...a) => console.log(...a);
  const paket = JSON.parse(readFileSync(join(WURZEL, 'package.json'), 'utf-8'));
  const start = (await import(pathToFileURL(join(WURZEL, 'inhalt', 'start.mjs')).href)).default;
  const inhalte = Object.fromEntries(SPRACHEN.map((s) => [s, ladeInhalt(join(WURZEL, 'inhalt'), s)]));
  const basisCss = readFileSync(join(WURZEL, 'bau', 'basis.css'), 'utf-8');
  const warnungen = [];

  for (const s of SPRACHEN) {
    for (const seite of inhalte[s].seiten) {
      if (/\[[^\]]+\]/.test(seite.quelle.replace(/\[[^\]]*\]\([^)]*\)/g, ''))) warnungen.push(`${s}/seiten/${seite.slug}.md enthält noch Platzhalter [ … ] – bitte ausfüllen.`);
    }
  }

  rmSync(ziel, { recursive: true, force: true });

  for (const name of DESIGNS) {
    const design = (await import(pathToFileURL(join(WURZEL, 'designs', name, 'vorlage.mjs')).href)).default;
    const aus = join(ziel, name);
    const css = basisCss + '\n' + readFileSync(join(WURZEL, 'designs', name, 'stil.css'), 'utf-8');
    const version = createHash('sha1').update(css + paket.version).digest('hex').slice(0, 8);

    // Gemeinsame Dateien
    cpSync(join(WURZEL, 'assets'), join(aus, 'assets'), { recursive: true });
    schreibe(join(aus, 'assets', `${name}.css`), css);
    schreibe(join(aus, 'assets', 'menue.js'), readFileSync(join(WURZEL, 'bau', 'menue.js'), 'utf-8'));
    for (const schrift of design.schriften) {
      const [paketName] = schrift.split('-latin');
      const quelle = join(WURZEL, 'node_modules', '@fontsource-variable', paketName, 'files', schrift);
      cpSync(quelle, join(aus, 'assets', 'schriften', schrift));
    }
    schreibe(join(aus, 'robots.txt'), 'User-agent: *\nAllow: /\n');
    schreibe(join(aus, 'index.html'), `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/de/"><link rel="canonical" href="/de/"><title>Yapaia</title><a href="/de/">Yapaia</a>`);

    for (const sprache of SPRACHEN) {
      const t = TEXTE[sprache];
      const inhalt = inhalte[sprache];
      const ctxFuer = (pfad) => ({
        sprache, t, pfad, version, inhalt, design, icon, html, bilder,
        start: start[sprache],
        url: (p) => `/${sprache}${p}`,
      });
      const seite = (pfad, daten) => {
        const ctx = ctxFuer(pfad);
        const main = typeof daten.main === 'function' ? daten.main(ctx) : daten.main;
        const datei = join(aus, sprache, pfad, pfad.endsWith('.html') ? '' : 'index.html');
        schreibe(datei, design.rahmen(ctx, { ...daten, main }));
      };

      seite('/', { titel: null, beschreibung: start[sprache].beschreibung, klasse: 'startseite', main: (ctx) => design.start(ctx) });
      for (const m of inhalt.module) {
        seite(`/module/${m.slug}/`, { titel: m.titel, beschreibung: m.kurz, klasse: 'unterseite', main: (ctx) => html.modulSeite(ctx, m) });
      }
      seite('/docs/', { titel: t.docs, beschreibung: t.handbuchKurz, klasse: 'unterseite', main: (ctx) => html.docsUebersicht(ctx) });
      for (const bereich of ['handbuch', 'technik']) {
        seite(`/docs/${bereich}/`, { titel: t[bereich], beschreibung: t[`${bereich}Kurz`], klasse: 'unterseite', main: (ctx) => html.docsUebersicht(ctx, bereich) });
        for (const k of inhalt[bereich]) {
          seite(`/docs/${bereich}/${k.slug}/`, { titel: k.titel, beschreibung: k.kurz, klasse: 'unterseite doku-seite', main: (ctx) => html.dokuSeite(ctx, k, bereich) });
        }
      }
      for (const s of inhalt.seiten) {
        seite(`/${s.slug}/`, { titel: s.titel, beschreibung: '', klasse: 'unterseite', main: (ctx) => html.einfacheSeite(ctx, s) });
      }
      seite('/404.html', { titel: '404', beschreibung: '', klasse: 'unterseite', main: (ctx) => html.nichtGefunden(ctx) });
    }

    const kaputt = pruefeVerweise(aus);
    if (kaputt.length) throw new Error(`Design ${name}: ${kaputt.length} kaputte Verweise:\n  ${kaputt.join('\n  ')}`);
    log(`✓ ${name}`);
  }

  schreibe(join(ziel, '_vorschau', '_vorschau.js'), readFileSync(join(WURZEL, 'bau', 'vorschau.js'), 'utf-8'));
  schreibe(join(ziel, 'version.txt'), `${paket.version}\n`);
  for (const w of warnungen) log(`⚠ ${w}`);
  return { warnungen };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  baue().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
