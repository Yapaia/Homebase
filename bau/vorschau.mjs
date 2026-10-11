#!/usr/bin/env node
/**
 * Lokale Vorschau ohne Docker: baut die Seite und liefert sie auf
 * http://localhost:4321 aus – mit derselben Design-Umschaltung per Cookie
 * wie Caddy auf dem Server.
 */

import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { baue, DESIGNS } from './bau.mjs';

const PORT = Number(process.env.PORT || 4321);
const DIST = new URL('../dist/', import.meta.url).pathname;
const TYPEN = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain' };

await baue();
createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const wahl = /^\/design\/(\w+)\/?$/.exec(url.pathname);
  if (wahl && DESIGNS.includes(wahl[1])) {
    res.writeHead(302, { Location: '/', 'Set-Cookie': `design=${wahl[1]}; Path=/; Max-Age=31536000; SameSite=Lax` });
    return res.end();
  }
  if (url.pathname === '/') {
    res.writeHead(302, { Location: '/de/' });
    return res.end();
  }
  const keks = /(?:^|;\s*)design=(\w+)/.exec(req.headers.cookie ?? '')?.[1];
  const design = DESIGNS.includes(keks) ? keks : DESIGNS[0];
  const basis = url.pathname === '/_vorschau.js' ? join(DIST, '_vorschau') : join(DIST, design);
  let pfad = normalize(join(basis, decodeURIComponent(url.pathname)));
  if (!pfad.startsWith(basis)) { res.writeHead(400); return res.end(); }
  if (existsSync(pfad) && statSync(pfad).isDirectory()) pfad = join(pfad, 'index.html');
  if (!existsSync(pfad)) {
    pfad = join(DIST, design, url.pathname.startsWith('/en/') ? 'en' : 'de', '404.html');
    res.statusCode = 404;
  }
  res.setHeader('Content-Type', TYPEN[extname(pfad)] ?? 'application/octet-stream');
  createReadStream(pfad).pipe(res);
}).listen(PORT, () => console.log(`Vorschau: http://localhost:${PORT}  (Design wechseln: /design/kompass)`));
