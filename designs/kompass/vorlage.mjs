/**
 * Design „Kompass“ – dunkel, präzise, modern. Wirkt wie ein Premium-Produkt:
 * Bento-Raster, leuchtende Akzente, echte Oberflächen im Mittelpunkt.
 */

import { esc, dokument, standardKopf, standardFuss } from '../../bau/html.mjs';
import { icon } from '../../bau/icons.mjs';
import { handyMock, haMock } from '../../bau/bilder.mjs';

const logo = `<span class="logo"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="m20 6 4.5 14L20 34l-4.5-14z" fill="#34e3c4"/><path d="M20 20 34 20 20 24.5z" fill="#ff8a3d" opacity=".9"/><circle cx="20" cy="20" r="2.5" fill="currentColor"/></svg><span>YAPAIA</span></span>`;

export default {
  name: 'kompass',
  titel: 'Kompass',
  themeFarbe: '#0a0f1c',
  schriften: ['space-grotesk-latin-wght-normal.woff2', 'inter-latin-wght-normal.woff2'],

  rahmen(ctx, daten) {
    return dokument(ctx, {
      ...daten,
      kopf: standardKopf(ctx, { logo }),
      fuss: standardFuss(ctx, { logo }),
    });
  },

  start(ctx) {
    const s = ctx.start;
    const m = Object.fromEntries(ctx.inhalt.module.map((x) => [x.slug, x]));
    const kachel = (slug, klasse, extra = '') => {
      const x = m[slug];
      if (!x) return '';
      return `<a class="ko-kachel ${klasse}" href="${ctx.url(`/module/${slug}/`)}" data-erscheinen>
        <span class="ko-kachel-kopf">${icon(x.icon ?? slug)} ${esc(x.titel)} <span class="ko-pfeil">${icon('pfeil')}</span></span>
        <strong>${esc(x.claim)}</strong>
        <span class="ko-kachel-text">${esc(x.kurz)}</span>
        ${extra}
      </a>`;
    };
    return `
<section class="ko-held">
  <div class="ko-glut" aria-hidden="true"></div>
  <div class="ko-held-innen innen">
    <div class="ko-held-text">
      <p class="ko-pille">${icon('offline')} ${esc(s.held.kicker)} · ${esc(s.held.fakten[0].zahl)} ${esc(s.held.fakten[0].text)}</p>
      <h1>${esc(s.held.titelKurz)}</h1>
      <p class="ko-unter">${esc(s.held.untertitel)}</p>
      <p class="knoepfe">
        <a class="knopf" href="${ctx.url('/docs/handbuch/installation/')}">${esc(s.held.knopf)} ${icon('pfeil')}</a>
        <a class="knopf knopf-zweit" href="#module">${esc(s.held.knopf2)}</a>
      </p>
    </div>
    <div class="ko-held-bild">
      ${handyMock(ctx)}
      <div class="ko-schwebend">${haMock(ctx)}</div>
    </div>
  </div>
  <dl class="ko-zahlen innen">
    ${s.held.fakten.map((f) => `<div><dt>${esc(f.zahl)}</dt><dd>${esc(f.text)}</dd></div>`).join('')}
  </dl>
</section>

<section id="module" class="ko-abschnitt innen">
  <header class="ko-kopfzeile" data-erscheinen>
    <p class="kicker">${esc(ctx.t.module)}</p>
    <h2>${esc(s.module.titel)}</h2>
    <p>${esc(s.module.text)}</p>
  </header>
  <div class="ko-bento">
    ${kachel('go', 'ko-gross', `<span class="ko-chips"><span>Valhalla</span><span>PMTiles</span><span>MapLibre</span><span>Photon</span></span>`)}
    ${kachel('beat', 'ko-hoch', `<img src="/assets/bilder/beat-webui-mobile.png" alt="" loading="lazy">`)}
    ${kachel('router', '', `<span class="ko-sim"><span>DE · SIM 1</span>${icon('pfeil')}<span class="an">AT · SIM 2</span></span>`)}
    ${kachel('satellite', '', `<span class="ko-welle" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>`)}
    ${kachel('zentrale', 'ko-breit', `<span class="ko-chips"><span>Discovery</span><span>Geräte</span><span>Aktionen</span><span>Auslöser</span></span>`)}
  </div>
</section>

<section class="ko-abschnitt innen">
  <div class="ko-vier">
    ${s.versprechen.punkte.map((p) => `<article data-erscheinen>${icon(p.icon)}<h3>${esc(p.titel)}</h3><p>${esc(p.text)}</p></article>`).join('')}
  </div>
</section>

<section class="ko-abschnitt ko-szenarien innen">
  <header class="ko-kopfzeile" data-erscheinen>
    <p class="kicker">Home Assistant</p>
    <h2>${esc(s.szenarien.titel)}</h2>
    <p>${esc(s.szenarien.text)}</p>
  </header>
  <ol class="ko-ablauf">
    ${s.szenarien.liste.map((x) => `<li data-erscheinen><span class="ko-ausloeser">${icon(x.icon)} ${esc(x.wenn)}</span><span class="ko-linie" aria-hidden="true"></span><span class="ko-wirkung">${esc(x.dann)}</span></li>`).join('')}
  </ol>
</section>

<section class="ko-abschnitt innen ko-maker">
  <div data-erscheinen>
    <p class="kicker">${esc(s.maker.kicker)}</p>
    <h2>${esc(s.maker.titel)}</h2>
    <p>${esc(s.maker.text)}</p>
    <ul class="haken-liste">${s.maker.punkte.map((p) => `<li>${icon('haken')}${esc(p)}</li>`).join('')}</ul>
    <p class="knoepfe"><a class="knopf knopf-zweit" href="${ctx.url('/docs/technik/')}">${esc(s.maker.knopf)} ${icon('pfeil')}</a></p>
  </div>
  <div class="ko-fenster" data-erscheinen>
    <div class="ko-fenster-kopf"><i></i><i></i><i></i><span>automation.yaml</span></div>
    <pre><code>${esc(s.maker.code)}</code></pre>
  </div>
</section>

<section class="ko-abschnitt innen">
  <div class="ko-karten-banner" data-erscheinen>
    <div>
      <p class="kicker">${esc(s.kartenserver.kicker)}</p>
      <h2>${esc(s.kartenserver.titel)}</h2>
      <p>${esc(s.kartenserver.text)}</p>
      <a class="ko-link" href="${ctx.url('/docs/handbuch/karten/')}">${esc(s.kartenserver.knopf)} ${icon('pfeil')}</a>
    </div>
    <div class="ko-lade" aria-hidden="true">
      <div><span>alpen.pmtiles</span><span>sha256 ✓</span></div><i style="--w:100%"></i>
      <div><span>lite_search-alpen.db</span><span>sha256 ✓</span></div><i style="--w:100%"></i>
      <div><span>alpen-routing.tar</span><span>72 %</span></div><i style="--w:72%"></i>
    </div>
  </div>
</section>

<section class="ko-abschnitt innen ko-faq">
  <h2 data-erscheinen>${esc(s.fragen.titel)}</h2>
  <div class="fragen">${s.fragen.liste.map((f) => `<details><summary>${esc(f.frage)}</summary><p>${esc(f.antwort)}</p></details>`).join('')}</div>
</section>

<section class="ko-schluss innen" data-erscheinen>
  <h2>${esc(s.schluss.titel)}</h2>
  <p>${esc(s.schluss.text)}</p>
  <a class="knopf" href="${ctx.url('/docs/handbuch/installation/')}">${esc(s.schluss.knopf)} ${icon('pfeil')}</a>
</section>`;
  },
};
