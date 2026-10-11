/**
 * Design „Logbuch“ – ein Reisetagebuch: Papier, Serifenschrift, Stempel,
 * gestrichelte Routen. Für Maker und Abenteurer, die ihr Fahrzeug selbst
 * ausbauen und gern in Ruhe stöbern.
 */

import { esc, dokument, standardKopf, standardFuss } from '../../bau/html.mjs';
import { icon } from '../../bau/icons.mjs';
import { landschaft, handyMock } from '../../bau/bilder.mjs';

const logo = `<span class="logo"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="22" r="15.5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/><path d="M10 27c5-3 8-9 12-9s6 5 12 2" fill="none" stroke="#c4582b" stroke-width="2.4" stroke-linecap="round"/><path d="m14 30 4-7 4 4 5-8 5 11z" fill="currentColor" opacity=".9"/></svg><span>Yapaia</span></span>`;

const stempel = (oben, mitte, unten, id) => `<div class="lb-stempel" aria-hidden="true"><svg viewBox="0 0 140 140"><defs><path id="${id}" d="M70 70m-52 0a52 52 0 1 1 104 0a52 52 0 1 1-104 0"/></defs><circle cx="70" cy="70" r="64" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="70" cy="70" r="40" fill="none" stroke="currentColor" stroke-width="1.5"/><text font-size="12" letter-spacing="3" font-weight="700" fill="currentColor"><textPath href="#${id}">${esc(oben)} ★ ${esc(unten)} ★</textPath></text><text x="70" y="78" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor">${esc(mitte)}</text></svg></div>`;

export default {
  name: 'logbuch',
  titel: 'Logbuch',
  themeFarbe: '#f4ecdc',
  schriften: ['fraunces-latin-wght-normal.woff2', 'inter-latin-wght-normal.woff2'],

  rahmen(ctx, daten) {
    return dokument(ctx, {
      ...daten,
      kopf: standardKopf(ctx, { logo }),
      fuss: standardFuss(ctx, { logo }),
    });
  },

  start(ctx) {
    const s = ctx.start;
    const de = ctx.sprache === 'de';
    return `
<section class="lb-held innen">
  <div class="lb-held-text">
    <p class="kicker">${esc(s.held.kicker)} · ${de ? 'Logbuch Nr. 1' : 'Logbook No. 1'}</p>
    <h1>${esc(s.held.titelKurz)} <em>${de ? 'Nur einen guten Plan.' : 'Just a good plan.'}</em></h1>
    <p class="lb-unter">${esc(s.held.untertitel)}</p>
    <p class="knoepfe">
      <a class="knopf" href="${ctx.url('/docs/handbuch/installation/')}">${esc(s.held.knopf)}</a>
      <a class="knopf knopf-zweit" href="#module">${esc(s.held.knopf2)}</a>
    </p>
  </div>
  <figure class="lb-postkarte">
    <div class="lb-postkarte-bild">${landschaft('lb')}</div>
    <figcaption>${de ? 'Grüße vom Pass – ganz ohne Netz.' : 'Greetings from the pass – no signal needed.'}</figcaption>
    ${stempel('YAPAIA', '100%', 'OFFLINE', 'lb-kreis1')}
  </figure>
</section>

<section class="lb-tickets innen" data-erscheinen>
  ${s.versprechen.punkte.map((p, i) => `<article class="lb-ticket"><span class="lb-ticket-nr">№ 0${i + 1}</span>${icon(p.icon)}<h3>${esc(p.titel)}</h3><p>${esc(p.text)}</p></article>`).join('')}
</section>

<section id="module" class="lb-module">
  <div class="innen">
    <header class="lb-kopf" data-erscheinen>
      <p class="kicker">${de ? 'Die Ausrüstung' : 'The kit'}</p>
      <h2>${esc(s.module.titel)}</h2>
      <p>${esc(s.module.text)}</p>
    </header>
    <div class="lb-anhaenger">
      ${ctx.inhalt.module.map((m) => {
        const punkte = String(m.punkte ?? '').split('|').map((p) => p.trim()).filter(Boolean);
        return `<a class="lb-modul" href="${ctx.url(`/module/${m.slug}/`)}" data-erscheinen>
          <span class="lb-loch" aria-hidden="true"></span>
          <span class="lb-modul-kopf">${icon(m.icon ?? m.slug)}<span>${esc(m.titel)}</span></span>
          <strong>${esc(m.claim)}</strong>
          <ul>${punkte.slice(0, 3).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
          <span class="lb-mehr">${esc(ctx.t.mehr)} →</span>
        </a>`;
      }).join('')}
    </div>
  </div>
</section>

<section class="lb-etappen innen" data-erscheinen>
  <h2>${esc(s.schritte.titel)}</h2>
  <ol>
    ${s.schritte.liste.map((x, i) => `<li><span class="lb-pin"><span>${i + 1}</span></span><div><h3>${esc(x.titel)}</h3><p>${esc(x.text)}</p></div></li>`).join('')}
  </ol>
</section>

<section class="lb-notizen innen">
  <div class="lb-seite" data-erscheinen>
    <p class="kicker">${de ? 'Aus dem Bordbuch' : 'From the log'}</p>
    <h2>${esc(s.szenarien.titel)}</h2>
    <p>${esc(s.szenarien.text)}</p>
    <ul>
      ${s.szenarien.liste.map((x) => `<li><span class="lb-wenn">${icon(x.icon)} ${esc(x.wenn)}</span><span class="lb-dann">${esc(x.dann)}</span></li>`).join('')}
    </ul>
  </div>
  <div class="lb-handy" data-erscheinen>${handyMock(ctx)}</div>
</section>

<section class="lb-werkbank">
  <div class="innen lb-werkbank-innen" data-erscheinen>
    <div>
      <p class="kicker">${icon('werkzeug')} ${esc(s.maker.kicker)}</p>
      <h2>${esc(s.maker.titel)}</h2>
      <p>${esc(s.maker.text)}</p>
      <ul class="haken-liste">${s.maker.punkte.map((p) => `<li>${icon('haken')}${esc(p)}</li>`).join('')}</ul>
      <p class="knoepfe"><a class="knopf" href="${ctx.url('/docs/technik/')}">${esc(s.maker.knopf)}</a></p>
    </div>
    <pre><code>${esc(s.maker.code)}</code></pre>
  </div>
</section>

<section class="lb-karten innen" data-erscheinen>
  ${stempel(de ? 'KARTENSERVER' : 'MAP SERVER', '✓', de ? 'GEPRÜFT' : 'VERIFIED', 'lb-kreis2')}
  <div>
    <p class="kicker">${esc(s.kartenserver.kicker)}</p>
    <h2>${esc(s.kartenserver.titel)}</h2>
    <p>${esc(s.kartenserver.text)}</p>
    <a href="${ctx.url('/docs/handbuch/karten/')}">${esc(s.kartenserver.knopf)} →</a>
  </div>
</section>

<section class="lb-fragen fragen innen" data-erscheinen>
  <h2>${esc(s.fragen.titel)}</h2>
  ${s.fragen.liste.map((f) => `<details><summary>${esc(f.frage)}</summary><p>${esc(f.antwort)}</p></details>`).join('')}
</section>

<section class="lb-schluss innen" data-erscheinen>
  <h2>${esc(s.schluss.titel)}</h2>
  <p>${esc(s.schluss.text)}</p>
  <a class="knopf" href="${ctx.url('/docs/handbuch/installation/')}">${esc(s.schluss.knopf)}</a>
</section>`;
  },
};
