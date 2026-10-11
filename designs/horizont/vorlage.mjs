/**
 * Design „Horizont“ – hell, warm, Sonnenuntergang. Für alle, die einfach
 * losfahren wollen: viel Luft, runde Formen, freundliche Sprache.
 */

import { esc, dokument, standardKopf, standardFuss } from '../../bau/html.mjs';
import { icon } from '../../bau/icons.mjs';
import { landschaft, handyMock, haMock } from '../../bau/bilder.mjs';

const logo = `<span class="logo"><svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="hz-logo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#0e9f9a"/></linearGradient></defs><circle cx="20" cy="20" r="19" fill="url(#hz-logo)"/><circle cx="26" cy="15" r="5" fill="#ffe08a"/><path d="M4 28c8-6 14-6 20-2s10 4 12 2v6H4z" fill="#0b3954" opacity=".85"/><path d="M14 36c2-5 6-7 12-8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="3 3"/></svg><span>Yapaia</span></span>`;

export default {
  name: 'horizont',
  titel: 'Horizont',
  themeFarbe: '#ff8a3d',
  schriften: ['nunito-latin-wght-normal.woff2'],

  rahmen(ctx, daten) {
    return dokument(ctx, {
      ...daten,
      kopf: standardKopf(ctx, { logo }),
      fuss: standardFuss(ctx, { logo }),
    });
  },

  start(ctx) {
    const s = ctx.start;
    const module = ctx.inhalt.module;
    return `
<section class="hz-held">
  <div class="hz-held-text innen">
    <p class="kicker">${icon('sonne')} ${esc(s.held.kicker)}</p>
    <h1>${esc(s.held.titel)}</h1>
    <p class="hz-unter">${esc(s.held.untertitel)}</p>
    <p class="knoepfe">
      <a class="knopf" href="${ctx.url('/docs/handbuch/installation/')}">${esc(s.held.knopf)} ${icon('pfeil')}</a>
      <a class="knopf knopf-zweit" href="#module">${esc(s.held.knopf2)}</a>
    </p>
    <ul class="hz-fakten">${s.held.fakten.map((f) => `<li><strong>${esc(f.zahl)}</strong> ${esc(f.text)}</li>`).join('')}</ul>
  </div>
  <div class="hz-held-bild">${landschaft('hz')}</div>
</section>

<section class="hz-versprechen innen" data-erscheinen>
  <h2 class="hz-titel">${esc(s.versprechen.titel)}</h2>
  <div class="hz-karten">
    ${s.versprechen.punkte.map((p) => `<article class="hz-karte"><span class="hz-blase">${icon(p.icon)}</span><h3>${esc(p.titel)}</h3><p>${esc(p.text)}</p></article>`).join('')}
  </div>
</section>

<section id="module" class="hz-module">
  <div class="innen">
    <header class="hz-kopfzeile" data-erscheinen>
      <h2 class="hz-titel">${esc(s.module.titel)}</h2>
      <p>${esc(s.module.text)}</p>
    </header>
    ${module.map((m, i) => {
      const punkte = String(m.punkte ?? '').split('|').map((p) => p.trim()).filter(Boolean);
      const bild = m.slug === 'go'
        ? handyMock(ctx)
        : m.slug === 'zentrale'
          ? haMock(ctx)
          : m.bild
            ? `<img src="/assets/bilder/${esc(m.bild)}" alt="${esc(m.bildtext ?? m.titel)}" loading="lazy">`
            : `<div class="hz-modul-symbol">${icon(m.icon ?? m.slug)}</div>`;
      return `<article class="hz-modul ${i % 2 ? 'hz-modul-rechts' : ''}" data-erscheinen>
      <div class="hz-modul-text">
        <p class="kicker">${icon(m.icon ?? m.slug)} ${esc(m.titel)}</p>
        <h3>${esc(m.claim)}</h3>
        <p>${esc(m.kurz)}</p>
        <ul class="haken-liste">${punkte.map((p) => `<li>${icon('haken')}${esc(p)}</li>`).join('')}</ul>
        <p><a class="hz-link" href="${ctx.url(`/module/${m.slug}/`)}">${esc(ctx.t.mehr)} ${icon('pfeil')}</a></p>
      </div>
      <div class="hz-modul-bild">${bild}</div>
    </article>`;
    }).join('')}
  </div>
</section>

<section class="hz-schritte innen" data-erscheinen>
  <h2 class="hz-titel">${esc(s.schritte.titel)}</h2>
  <ol>${s.schritte.liste.map((x, i) => `<li><span class="hz-nummer">${i + 1}</span><h3>${esc(x.titel)}</h3><p>${esc(x.text)}</p></li>`).join('')}</ol>
</section>

<section class="hz-szenarien">
  <div class="innen">
    <header class="hz-kopfzeile" data-erscheinen><h2 class="hz-titel">${esc(s.szenarien.titel)}</h2><p>${esc(s.szenarien.text)}</p></header>
    <div class="hz-szenen">
      ${s.szenarien.liste.map((x) => `<article class="hz-szene" data-erscheinen><p class="hz-wenn">${icon(x.icon)} ${esc(x.wenn)}</p><p class="hz-dann">${esc(x.dann)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="hz-maker innen" data-erscheinen>
  <div>
    <p class="kicker">${icon('werkzeug')} ${esc(s.maker.kicker)}</p>
    <h2 class="hz-titel">${esc(s.maker.titel)}</h2>
    <p>${esc(s.maker.text)}</p>
    <ul class="haken-liste">${s.maker.punkte.map((p) => `<li>${icon('haken')}${esc(p)}</li>`).join('')}</ul>
    <p class="knoepfe"><a class="knopf knopf-zweit" href="${ctx.url('/docs/technik/')}">${esc(s.maker.knopf)}</a></p>
  </div>
  <pre class="hz-code"><code>${esc(s.maker.code)}</code></pre>
</section>

<section class="hz-kartenserver innen" data-erscheinen>
  <div class="hz-ks-symbol">${icon('karte')}</div>
  <div>
    <p class="kicker">${esc(s.kartenserver.kicker)}</p>
    <h2>${esc(s.kartenserver.titel)}</h2>
    <p>${esc(s.kartenserver.text)}</p>
    <a class="hz-link" href="${ctx.url('/docs/handbuch/karten/')}">${esc(s.kartenserver.knopf)} ${icon('pfeil')}</a>
  </div>
</section>

<section class="hz-fragen fragen innen" data-erscheinen>
  <h2 class="hz-titel">${esc(s.fragen.titel)}</h2>
  ${s.fragen.liste.map((f) => `<details><summary>${esc(f.frage)}</summary><p>${esc(f.antwort)}</p></details>`).join('')}
</section>

<section class="hz-schluss">
  <div class="innen" data-erscheinen>
    <h2>${esc(s.schluss.titel)}</h2>
    <p>${esc(s.schluss.text)}</p>
    <a class="knopf" href="${ctx.url('/docs/handbuch/installation/')}">${esc(s.schluss.knopf)} ${icon('pfeil')}</a>
  </div>
  <div class="hz-schluss-bild">${landschaft('hz2')}</div>
</section>`;
  },
};
