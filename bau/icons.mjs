/**
 * Linien-Symbole (24er-Raster, Farbe = currentColor), damit jedes Design sie
 * in seinen eigenen Farben zeigt. Bewusst inline statt Icon-Font: keine
 * Anfrage an fremde Server, kein Flackern.
 */

const pfade = {
  go: '<path d="M3 17h2m14 0h2M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M9 17h6M3 17V8a2 2 0 0 1 2-2h9l4 4h1a2 2 0 0 1 2 2v5"/><path d="M14 6v4h5"/>',
  route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16"/>',
  beat: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="m7 8 9-5"/><circle cx="15" cy="14" r="3"/><path d="M6 12h3m-3 3h3"/>',
  router: '<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 16.5h.01M11 16.5h.01"/><path d="M17 13V9"/><path d="M14.5 6.5a3.5 3.5 0 0 1 5 0M12.5 4.5a6.5 6.5 0 0 1 9 0"/>',
  satellite: '<rect x="8" y="2" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>',
  zentrale: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><circle cx="12" cy="14.5" r="2"/><path d="M12 12.5V11m0 6v1.5m-2.5-4h-1.5m6 0h1.5"/>',
  offline: '<path d="M2 8.8a15 15 0 0 1 4.2-2.6m3.9-.9A15 15 0 0 1 22 8.8"/><path d="M5 12.5a10 10 0 0 1 4-2m4.6-.4A10 10 0 0 1 19 12.5"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 20h.01"/><path d="m3 3 18 18"/>',
  massband: '<path d="M3 8h18v8H3z"/><path d="M7 8v3m4-3v4m4-4v3m4-3v4"/>',
  haus: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  offen: '<path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2.5-9-3 12"/>',
  karte: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14m6-12v14"/>',
  blitz: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  sim: '<path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="8.5" y="11" width="7" height="7" rx="1"/><path d="M12 11v7m-3.5-3.5h7"/>',
  ziel: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  tacho: '<path d="M4.5 18a9 9 0 1 1 15 0"/><path d="m12 13 4-5"/><circle cx="12" cy="13" r="1.5"/>',
  werkzeug: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  buch: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><rect x="10" y="10" width="4" height="4"/>',
  pfeil: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  welt: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  haken: '<path d="m5 12 5 5 9-10"/>',
  menue: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sonne: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
};

export function icon(name, klasse = 'icon') {
  const p = pfade[name];
  if (!p) throw new Error(`Unbekanntes Symbol: ${name}`);
  return `<svg class="${klasse}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

export const ICONS = Object.keys(pfade);
