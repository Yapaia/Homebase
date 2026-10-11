/**
 * Gemeinsame Bausteine für alle drei Designs: HTML-Gerüst, Navigation,
 * Doku-Seiten. Die Designs unterscheiden sich in Startseite, Kopf, Fuß und
 * CSS – Inhalt und Struktur der Unterseiten bleiben gleich, damit ein Text
 * nur EINMAL gepflegt wird.
 */

import { icon } from './icons.mjs';
import { GITHUB } from './texte.mjs';

export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Das vollständige HTML-Dokument. */
export function dokument(ctx, { titel, beschreibung, main, klasse = '', kopf, fuss }) {
  const { sprache, design } = ctx;
  const volltitel = titel ? `${titel} · Yapaia` : 'Yapaia – Smart RV Solutions';
  const andere = sprache === 'de' ? 'en' : 'de';
  return `<!doctype html>
<html lang="${sprache}" data-design="${design.name}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(volltitel)}</title>
<meta name="description" content="${esc(beschreibung ?? '')}">
<meta property="og:title" content="${esc(volltitel)}">
<meta property="og:description" content="${esc(beschreibung ?? '')}">
<meta property="og:type" content="website">
<meta property="og:image" content="/assets/bilder/og.png">
<meta name="theme-color" content="${design.themeFarbe}">
<link rel="alternate" hreflang="${sprache}" href="/${sprache}${ctx.pfad}">
<link rel="alternate" hreflang="${andere}" href="/${andere}${ctx.pfad}">
<link rel="icon" href="/assets/bilder/icon.png">
${design.schriften.map((s) => `<link rel="preload" href="/assets/schriften/${s}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<link rel="stylesheet" href="/assets/${design.name}.css?v=${ctx.version}">
<script src="/assets/menue.js?v=${ctx.version}" defer></script>
<script src="/_vorschau.js" defer></script>
</head>
<body class="${esc(klasse)}">
<a class="springen" href="#inhalt">${sprache === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}</a>
${kopf}
<main id="inhalt">
${main}
</main>
${fuss}
</body>
</html>
`;
}

/** Die Hauptnavigation als Liste – jedes Design setzt sie in seinen Kopf. */
export function navLinks(ctx) {
  const { t, url } = ctx;
  return [
    { href: url('/#module'), text: t.module },
    { href: url('/docs/handbuch/'), text: t.handbuch, aktiv: ctx.pfad.startsWith('/docs/handbuch') },
    { href: url('/docs/technik/'), text: t.technik, aktiv: ctx.pfad.startsWith('/docs/technik') },
  ];
}

export function sprachLink(ctx) {
  const andere = ctx.sprache === 'de' ? 'en' : 'de';
  return `<a class="sprachwahl" href="/${andere}${ctx.pfad}" hreflang="${andere}" lang="${andere}">${icon('welt')}<span>${andere.toUpperCase()}</span></a>`;
}

export function githubLink(ctx, mitText = false) {
  return `<a class="github" href="${GITHUB}" rel="noopener">${icon('github')}${mitText ? `<span>${ctx.t.quelltext}</span>` : `<span class="nur-leser">GitHub</span>`}</a>`;
}

/** Standard-Kopf: Logo, Navigation, Sprache. Designs geben ihre Klassen dazu. */
export function standardKopf(ctx, { logo, klasse = 'kopf' } = {}) {
  const links = navLinks(ctx)
    .map((l) => `<li><a href="${l.href}"${l.aktiv ? ' aria-current="page"' : ''}>${esc(l.text)}</a></li>`)
    .join('');
  return `<header class="${klasse}">
  <div class="kopf-innen">
    <a class="marke" href="${ctx.url('/')}" aria-label="Yapaia ${esc(ctx.t.start)}">${logo}</a>
    <button class="menue-knopf" aria-expanded="false" aria-controls="hauptnav">${icon('menue')}<span class="nur-leser">${esc(ctx.t.menue)}</span></button>
    <nav id="hauptnav" class="hauptnav" aria-label="${esc(ctx.t.menue)}">
      <ul>${links}</ul>
      <div class="kopf-extra">${sprachLink(ctx)}${githubLink(ctx)}<a class="knopf knopf-klein" href="${ctx.url('/docs/handbuch/installation/')}">${esc(ctx.t.installieren)}</a></div>
    </nav>
  </div>
</header>`;
}

export function standardFuss(ctx, { logo, klasse = 'fuss' } = {}) {
  const { t, url, inhalt } = ctx;
  const module = inhalt.module.map((m) => `<li><a href="${url(`/module/${m.slug}/`)}">${esc(m.titel)}</a></li>`).join('');
  const hb = inhalt.handbuch.slice(0, 5).map((k) => `<li><a href="${url(`/docs/handbuch/${k.slug}/`)}">${esc(k.titel)}</a></li>`).join('');
  const tk = inhalt.technik.slice(0, 5).map((k) => `<li><a href="${url(`/docs/technik/${k.slug}/`)}">${esc(k.titel)}</a></li>`).join('');
  return `<footer class="${klasse}">
  <div class="fuss-innen">
    <div class="fuss-marke">${logo}<p>${esc(t.fussText)}</p>${githubLink(ctx, true)}</div>
    <div><h2>${esc(t.module)}</h2><ul>${module}</ul></div>
    <div><h2>${esc(t.handbuch)}</h2><ul>${hb}</ul></div>
    <div><h2>${esc(t.technik)}</h2><ul>${tk}</ul></div>
  </div>
  <div class="fuss-unten">
    <span>© ${new Date().getFullYear()} Yapaia · ${esc(t.karten)}</span>
    <span><a href="${url('/impressum/')}">${esc(t.impressum)}</a> · <a href="${url('/datenschutz/')}">${esc(t.datenschutz)}</a> · ${sprachLink(ctx)}</span>
  </div>
</footer>`;
}

/* ─── Unterseiten ─────────────────────────────────────────────────────── */

export function statusMarke(ctx, status) {
  if (!status) return '';
  return `<span class="status status-${esc(status)}">${esc(ctx.t.status[status] ?? status)}</span>`;
}

export function modulSeite(ctx, m) {
  const punkte = String(m.punkte ?? '').split('|').map((p) => p.trim()).filter(Boolean);
  const andere = ctx.inhalt.module.filter((x) => x.slug !== m.slug);
  return `<article class="modulseite modul-${esc(m.slug)}">
  <header class="modul-held">
    <div class="modul-held-text">
      <p class="kicker">${icon(m.icon ?? m.slug, 'icon icon-kicker')} ${esc(m.titel)} ${statusMarke(ctx, m.status)}</p>
      <h1>${esc(m.claim)}</h1>
      <p class="einleitung">${esc(m.kurz)}</p>
      ${punkte.length ? `<ul class="haken-liste">${punkte.map((p) => `<li>${icon('haken')}${esc(p)}</li>`).join('')}</ul>` : ''}
      <p class="knoepfe">
        <a class="knopf" href="${ctx.url(m.handbuch ?? '/docs/handbuch/installation/')}">${esc(ctx.t.zumHandbuch)}</a>
        <a class="knopf knopf-zweit" href="${ctx.url('/docs/handbuch/installation/')}">${esc(ctx.t.installieren)}</a>
      </p>
    </div>
    ${m.mock === 'handy' ? `<div class="modul-mock">${ctx.bilder.handyMock(ctx)}</div>` : m.mock === 'ha' ? `<div class="modul-mock">${ctx.bilder.haMock(ctx)}</div>` : m.bild ? `<figure class="modul-bild"><img src="/assets/bilder/${esc(m.bild)}" alt="${esc(m.bildtext ?? m.titel)}" loading="eager"></figure>` : `<div class="modul-symbol">${icon(m.icon ?? m.slug, 'icon icon-gross')}</div>`}
  </header>
  <div class="prosa modul-text">
${m.html}
  </div>
  <nav class="andere-module" aria-label="${esc(ctx.t.alleModule)}">
    <h2>${esc(ctx.t.alleModule)}</h2>
    <ul>${andere.map((x) => `<li><a href="${ctx.url(`/module/${x.slug}/`)}">${icon(x.icon ?? x.slug)}<strong>${esc(x.titel)}</strong><span>${esc(x.claim)}</span></a></li>`).join('')}</ul>
  </nav>
</article>`;
}

export function docsUebersicht(ctx, bereichFokus = null) {
  const { t, url, inhalt } = ctx;
  const spalte = (bereich, titel, kurz, liste, sym) => `<section class="docs-bereich docs-${bereich}">
    <h2>${icon(sym)} ${esc(titel)}</h2>
    <p>${esc(kurz)}</p>
    <ol>${liste.map((k) => `<li><a href="${url(`/docs/${bereich}/${k.slug}/`)}"><strong>${esc(k.titel)}</strong><span>${esc(k.kurz ?? '')}</span></a></li>`).join('')}</ol>
  </section>`;
  const teile = [
    ['handbuch', t.handbuch, t.handbuchKurz, inhalt.handbuch, 'buch'],
    ['technik', t.technik, t.technikKurz, inhalt.technik, 'chip'],
  ].filter(([b]) => !bereichFokus || b === bereichFokus);
  return `<div class="docs-uebersicht">
  <header class="seitenkopf"><h1>${esc(bereichFokus === 'technik' ? t.technik : bereichFokus === 'handbuch' ? t.handbuch : t.docs)}</h1></header>
  <div class="docs-spalten">${teile.map((x) => spalte(...x)).join('')}</div>
</div>`;
}

export function dokuSeite(ctx, kapitel, bereich) {
  const { t, url, inhalt } = ctx;
  const liste = inhalt[bereich];
  const i = liste.findIndex((k) => k.slug === kapitel.slug);
  const vor = liste[i - 1];
  const nach = liste[i + 1];
  const seitenleiste = (['handbuch', 'technik'])
    .map((b) => `<div class="leiste-gruppe${b === bereich ? ' aktiv' : ''}"><h2><a href="${url(`/docs/${b}/`)}">${esc(t[b])}</a></h2><ol>${inhalt[b]
      .map((k) => `<li><a href="${url(`/docs/${b}/${k.slug}/`)}"${b === bereich && k.slug === kapitel.slug ? ' aria-current="page"' : ''}>${esc(k.titel)}</a></li>`)
      .join('')}</ol></div>`)
    .join('');
  const toc = kapitel.ueberschriften.filter((u) => u.ebene === 2);
  return `<div class="doku">
  <aside class="doku-leiste" aria-label="${esc(t.docs)}">${seitenleiste}</aside>
  <article class="doku-artikel">
    <header class="seitenkopf">
      <p class="kicker">${esc(t[bereich])}</p>
      <h1>${esc(kapitel.titel)}</h1>
      ${kapitel.kurz ? `<p class="einleitung">${esc(kapitel.kurz)}</p>` : ''}
    </header>
    ${toc.length > 2 ? `<nav class="toc" aria-label="${esc(t.aufDieserSeite)}"><h2>${esc(t.aufDieserSeite)}</h2><ul>${toc.map((u) => `<li><a href="#${u.id}">${esc(u.text)}</a></li>`).join('')}</ul></nav>` : ''}
    <div class="prosa">
${kapitel.html}
    </div>
    <nav class="blaettern">
      ${vor ? `<a class="vor" href="${url(`/docs/${bereich}/${vor.slug}/`)}"><span>${esc(t.zurueck)}</span>${esc(vor.titel)}</a>` : '<span></span>'}
      ${nach ? `<a class="nach" href="${url(`/docs/${bereich}/${nach.slug}/`)}"><span>${esc(t.weiter)}</span>${esc(nach.titel)}</a>` : '<span></span>'}
    </nav>
  </article>
</div>`;
}

export function einfacheSeite(ctx, seite) {
  return `<article class="einfach">
  <header class="seitenkopf"><h1>${esc(seite.titel)}</h1></header>
  <div class="prosa">
${seite.html}
  </div>
</article>`;
}

export function nichtGefunden(ctx) {
  const { t, url } = ctx;
  return `<section class="nicht-gefunden">
  <p class="riesig">404</p>
  <h1>${esc(t.nichtGefunden)}</h1>
  <p>${esc(t.nichtGefundenText)}</p>
  <p><a class="knopf" href="${url('/')}">${esc(t.zurStart)}</a></p>
</section>`;
}
