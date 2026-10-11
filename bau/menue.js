// Menü auf dem Handy auf- und zuklappen; Abschnitte beim Scrollen einblenden.
document.addEventListener('DOMContentLoaded', () => {
  const knopf = document.querySelector('.menue-knopf');
  const nav = document.getElementById('hauptnav');
  if (knopf && nav) {
    knopf.addEventListener('click', () => {
      const offen = knopf.getAttribute('aria-expanded') === 'true';
      knopf.setAttribute('aria-expanded', String(!offen));
      nav.classList.toggle('offen', !offen);
    });
  }
  const ziele = document.querySelectorAll('[data-erscheinen]');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ziele.forEach((z) => z.classList.add('sichtbar'));
    return;
  }
  const beobachter = new IntersectionObserver((eintraege) => {
    for (const e of eintraege) {
      if (e.isIntersecting) {
        e.target.classList.add('sichtbar');
        beobachter.unobserve(e.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  ziele.forEach((z) => beobachter.observe(z));
});
