/**
 * Illustrationen und Mock-ups, gezeichnet statt fotografiert: Sie laden
 * sofort, sind gestochen scharf und nehmen über CSS-Variablen die Farben
 * des jeweiligen Designs an (--i-…).
 */

import { esc } from './html.mjs';
import { icon } from './icons.mjs';

/** Berge, Straße, Camper. `id` macht Verläufe eindeutig, falls zweimal auf einer Seite. */
export function landschaft(id = 'l') {
  return `<svg class="landschaft" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Ein Wohnmobil fährt auf einer kurvigen Straße in die Berge">
  <defs>
    <linearGradient id="${id}-himmel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--i-himmel1)"/><stop offset="1" stop-color="var(--i-himmel2)"/>
    </linearGradient>
    <linearGradient id="${id}-strasse" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--i-strasse)" stop-opacity=".55"/><stop offset="1" stop-color="var(--i-strasse)"/>
    </linearGradient>
  </defs>
  <rect class="himmel" width="1200" height="520" fill="url(#${id}-himmel)"/>
  <circle class="sonne" cx="860" cy="190" r="74" fill="var(--i-sonne)"/>
  <path class="berg3" fill="var(--i-berg3)" d="M0 300 140 210l90 50 130-120 140 110 110-70 150 120 120-90 140 100 120-60 50 30v240H0z"/>
  <path class="berg2" fill="var(--i-berg2)" d="M0 360 120 300l140 70 170-150 150 130 120-60 160 110 140-80 200 120v180H0z"/>
  <path class="schnee" fill="var(--i-schnee)" d="m430 220 46 40-22 6-24-20-20 18-20-6zm-180 30 30 22-14 4-16-10-14 10-14-4z" opacity=".9"/>
  <path class="berg1" fill="var(--i-berg1)" d="M0 420c160-50 300-40 460-10s330 40 470 0 230-40 270-30v140H0z"/>
  <path class="strasse" fill="url(#${id}-strasse)" d="M560 400c40 6 60 14 40 26s-120 24-150 46-10 48 70 48H330c-60 0-80-30-30-52s150-34 190-50-10-14-30-18z"/>
  <path class="mittellinie" fill="none" stroke="var(--i-linie)" stroke-width="3" stroke-dasharray="10 12" d="M548 404c30 6 40 14 20 24s-110 22-140 44-12 40 40 48"/>
  <g class="camper" transform="translate(372 418) scale(.62)">
    <rect x="0" y="10" width="150" height="62" rx="12" fill="var(--i-van)"/>
    <path d="M150 30h28c12 0 18 8 22 18l8 24h-58z" fill="var(--i-van)"/>
    <rect x="16" y="0" width="96" height="18" rx="7" fill="var(--i-van2)"/>
    <rect x="16" y="26" width="34" height="22" rx="4" fill="var(--i-fenster)"/>
    <rect x="60" y="26" width="34" height="22" rx="4" fill="var(--i-fenster)"/>
    <path d="M158 36h18c6 0 9 4 11 9l4 11h-33z" fill="var(--i-fenster)"/>
    <rect x="104" y="26" width="26" height="40" rx="3" fill="var(--i-van2)"/>
    <rect x="0" y="52" width="208" height="8" fill="var(--i-van2)" opacity=".35"/>
    <circle cx="44" cy="74" r="15" fill="var(--i-reifen)"/><circle cx="44" cy="74" r="6" fill="var(--i-van)"/>
    <circle cx="170" cy="74" r="15" fill="var(--i-reifen)"/><circle cx="170" cy="74" r="6" fill="var(--i-van)"/>
  </g>
</svg>`;
}

/** Yapaia Go im Fahrmodus auf einem Handy – gebaut aus HTML, nicht als Bild. */
export function handyMock(ctx) {
  const de = ctx.sprache === 'de';
  return `<div class="handy" aria-hidden="true">
  <div class="handy-rahmen">
    <div class="handy-karte">
      <svg viewBox="0 0 300 560" preserveAspectRatio="xMidYMid slice">
        <rect width="300" height="560" fill="var(--m-karte)"/>
        <path d="M-20 120 320 60M-20 300 320 250M60 -10 110 570M230 -10 200 570" stroke="var(--m-strasse)" stroke-width="10" fill="none"/>
        <path d="M-20 420 320 380M150 -10 170 570" stroke="var(--m-strasse)" stroke-width="5" fill="none"/>
        <rect x="20" y="150" width="60" height="70" rx="6" fill="var(--m-block)"/><rect x="130" y="130" width="50" height="90" rx="6" fill="var(--m-block)"/>
        <rect x="215" y="300" width="70" height="60" rx="6" fill="var(--m-block)"/><rect x="25" y="330" width="55" height="60" rx="6" fill="var(--m-wald)"/>
        <path class="route" d="M160 560 168 420 175 300 210 250 240 120 250 -10" stroke="var(--m-route)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <circle cx="166" cy="470" r="14" fill="#fff"/><path d="m166 455 10 22-10-6-10 6z" fill="var(--m-route)"/>
      </svg>
    </div>
    <div class="handy-anweisung"><span class="pfeil">↱</span><span><strong>138 m</strong><small>${de ? 'Bergstraße' : 'Mountain Road'}</small></span></div>
    <div class="handy-limit">80</div>
    <div class="handy-tempo"><strong>58</strong><small>km/h</small></div>
    <div class="handy-leiste"><span><strong>13:01</strong><small>${de ? 'Ankunft' : 'Arrival'}</small></span><span><strong>11 Min</strong><small>${de ? 'Restzeit' : 'Remaining'}</small></span><span><strong>1,6 km</strong><small>${de ? 'Entfernung' : 'Distance'}</small></span></div>
  </div>
</div>`;
}

/** Eine Home-Assistant-Karte mit Yapaia-Entitäten. */
export function haMock(ctx) {
  const de = ctx.sprache === 'de';
  const zeilen = [
    ['ziel', de ? 'Ankunft' : 'Arrival', '18:42'],
    ['route', de ? 'Restweg' : 'Distance remaining', '132 km'],
    ['welt', de ? 'Land' : 'Country', 'AT'],
    ['sim', 'SIM', 'SIM 2'],
    ['beat', 'Radio', 'DAB+ · 11D'],
    ['tacho', de ? 'Tempo' : 'Speed', '87 km/h'],
  ];
  return `<div class="ha-karte" aria-hidden="true">
  <div class="ha-titel">${icon('haus')} ${de ? 'Unser Camper' : 'Our camper'}</div>
  ${zeilen.map(([i, n, w]) => `<div class="ha-zeile">${icon(i)}<span>${esc(n)}</span><strong>${esc(w)}</strong></div>`).join('')}
  <div class="ha-zeile ha-schalter">${icon('sim')}<span>${de ? 'SIM nach Land' : 'SIM by country'}</span><span class="schalter an"></span></div>
</div>`;
}
