(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#primary-nav');
  const closeMenu = () => { menuButton?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true'; closeMenu(); if (wasOpen) menuButton.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  const track = document.querySelector('#brow-carousel');
  if (!track) return;
  const cards = [...track.querySelectorAll('.style-card')];
  const controls = document.querySelector('.carousel-controls');
  const prev = controls.querySelector('[data-prev]');
  const next = controls.querySelector('[data-next]');
  const counter = controls.querySelector('[data-count]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stride = () => cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  function update() {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    controls.hidden = max < 3;
    prev.disabled = track.scrollLeft < 3;
    next.disabled = track.scrollLeft >= max - 3;
    const index = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / stride())));
    counter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
  }
  function move(direction) { track.scrollBy({left:direction * stride(), behavior:reducedMotion.matches ? 'instant' : 'smooth'}); }
  prev.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
  let pending = false;
  track.addEventListener('scroll', () => { if (pending) return; pending = true; requestAnimationFrame(() => { update(); pending = false; }); }, {passive:true});
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); track.scrollTo({left:event.key === 'Home' ? 0 : track.scrollWidth, behavior:reducedMotion.matches ? 'instant' : 'smooth'}); }
  });
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(track); else window.addEventListener('resize', update);
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
  update();
})();
