/**
 * Liest die Inhalte aus inhalt/<sprache>/: Markdown mit einem kleinen
 * Kopfbereich (`---` … `---`, je Zeile `schluessel: wert`).
 *
 *   module/<id>.md            eine Modulseite
 *   docs/handbuch/<slug>.md   ein Kapitel des Handbuchs
 *   docs/technik/<slug>.md    ein Kapitel des Technik-Teils
 *   seiten/<slug>.md          Impressum, Datenschutz …
 *
 * Die Startseite ist kein Fließtext, sondern Daten (inhalt/start.mjs) – jedes
 * Design ordnet sie anders an.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { Marked } from 'marked';

export function kopfUndText(roh, datei = '') {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(roh);
  if (!m) throw new Error(`${datei}: Kopfbereich (---) fehlt`);
  const kopf = {};
  for (const zeile of m[1].split('\n')) {
    if (!zeile.trim() || zeile.trim().startsWith('#')) continue;
    const i = zeile.indexOf(':');
    if (i < 0) throw new Error(`${datei}: Zeile ohne Doppelpunkt: ${zeile}`);
    const k = zeile.slice(0, i).trim();
    let v = zeile.slice(i + 1).trim();
    if (/^-?\d+$/.test(v)) v = Number(v);
    kopf[k] = v;
  }
  return { kopf, text: roh.slice(m[0].length) };
}

export function slugVon(text) {
  return String(text)
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Markdown → HTML, dazu die Überschriften (h2/h3) für das Inhaltsverzeichnis. */
export function markdown(text) {
  const ueberschriften = [];
  const vergeben = new Set();
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const inhalt = this.parser.parseInline(tokens);
        let id = slugVon(inhalt) || 'abschnitt';
        while (vergeben.has(id)) id += '-';
        vergeben.add(id);
        if (depth === 2 || depth === 3) ueberschriften.push({ id, text: inhalt.replace(/<[^>]+>/g, ''), ebene: depth });
        return `<h${depth} id="${id}">${inhalt}</h${depth}>\n`;
      },
      table(token) {
        // Breite Tabellen auf dem Handy seitlich wischbar statt die Seite zu sprengen.
        const kopf = token.header.map((z) => `<th${z.align ? ` style="text-align:${z.align}"` : ''}>${this.parser.parseInline(z.tokens)}</th>`).join('');
        const zeilen = token.rows
          .map((r) => `<tr>${r.map((z) => `<td${z.align ? ` style="text-align:${z.align}"` : ''}>${this.parser.parseInline(z.tokens)}</td>`).join('')}</tr>`)
          .join('\n');
        return `<div class="tabelle"><table><thead><tr>${kopf}</tr></thead><tbody>${zeilen}</tbody></table></div>\n`;
      },
    },
  });
  return { html: md.parse(text), ueberschriften };
}

function ordner(pfad) {
  if (!existsSync(pfad)) return [];
  return readdirSync(pfad).filter((d) => d.endsWith('.md')).sort();
}

function lies(pfad) {
  const { kopf, text } = kopfUndText(readFileSync(pfad, 'utf-8'), pfad);
  const { html, ueberschriften } = markdown(text);
  return { slug: basename(pfad, '.md'), ...kopf, html, ueberschriften, quelle: text };
}

export function ladeInhalt(wurzel, sprache) {
  const basis = join(wurzel, sprache);
  const sortiert = (liste) => liste.sort((a, b) => (a.reihenfolge ?? 99) - (b.reihenfolge ?? 99));
  const module = sortiert(ordner(join(basis, 'module')).map((d) => lies(join(basis, 'module', d))));
  const handbuch = sortiert(ordner(join(basis, 'docs', 'handbuch')).map((d) => lies(join(basis, 'docs', 'handbuch', d))));
  const technik = sortiert(ordner(join(basis, 'docs', 'technik')).map((d) => lies(join(basis, 'docs', 'technik', d))));
  const seiten = ordner(join(basis, 'seiten')).map((d) => lies(join(basis, 'seiten', d)));
  return { module, handbuch, technik, seiten };
}
