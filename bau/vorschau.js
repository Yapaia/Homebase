// Design-Vorschau: eine kleine Leiste unten, mit der man zwischen den
// Designs umschaltet. Wird nur ausgeliefert, wenn VORSCHAU=1 gesetzt ist.
(() => {
  const designs = [
    ['horizont', 'Horizont'],
    ['kompass', 'Kompass'],
    ['logbuch', 'Logbuch'],
  ];
  const aktuell = document.documentElement.dataset.design;
  const leiste = document.createElement('div');
  leiste.setAttribute('role', 'region');
  leiste.setAttribute('aria-label', 'Design-Vorschau');
  leiste.style.cssText = 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;display:flex;gap:4px;align-items:center;padding:6px;border-radius:999px;background:rgba(17,24,39,.92);color:#fff;font:600 13px/1 system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.3);white-space:nowrap';
  const titel = document.createElement('span');
  titel.textContent = 'Design:';
  titel.style.cssText = 'padding:0 8px 0 10px;opacity:.7';
  if (window.innerWidth > 480) leiste.append(titel);
  for (const [name, text] of designs) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    const an = name === aktuell;
    b.setAttribute('aria-pressed', String(an));
    b.style.cssText = `border:0;border-radius:999px;padding:9px 12px;cursor:pointer;font:inherit;${an ? 'background:#fff;color:#111827' : 'background:transparent;color:#fff'}`;
    b.addEventListener('click', () => {
      document.cookie = `design=${name}; Path=/; Max-Age=31536000; SameSite=Lax`;
      location.reload();
    });
    leiste.append(b);
  }
  document.body.append(leiste);
})();
