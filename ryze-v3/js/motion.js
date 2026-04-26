/* ============================================================
   RYZE V3 — MOTION (vanilla JS, respects prefers-reduced-motion)
   ============================================================ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Scroll reveal ─────────────────────────────── */
  function initReveal() {
    if (reduced) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* ── 2. Hero stagger ──────────────────────────────── */
  function initHeroStagger() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const items = hero.querySelectorAll('[data-stagger]');
    if (reduced) { items.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; }); return; }
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        items.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
      });
    });
  }

  /* ── 3. Logo smile draw ───────────────────────────── */
  function initSmileDraw() {
    if (reduced) return;
    const smile = document.querySelector('.smile-path');
    if (!smile) return;
    const len = smile.getTotalLength ? smile.getTotalLength() : 60;
    smile.style.strokeDasharray = len;
    smile.style.strokeDashoffset = len;
    smile.style.transition = `stroke-dashoffset 800ms cubic-bezier(0.22,1,0.36,1) 400ms`;
    requestAnimationFrame(() => { smile.style.strokeDashoffset = '0'; });
  }

  /* ── 4. Nav scroll state ──────────────────────────── */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 5. Mobile menu toggle ────────────────────────── */
  function initMobileMenu() {
    const burger = document.querySelector('.nav__burger');
    const mobile = document.querySelector('.nav__mobile');
    if (!burger || !mobile) return;
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobile.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 6. Stat count-up ─────────────────────────────── */
  function initCountUp() {
    if (reduced) return;
    const stats = document.querySelectorAll('[data-count]');
    if (!stats.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    stats.forEach(el => io.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('fr-FR') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── 7. Accordion (details polyfill + animation) ── */
  function initAccordion() {
    document.querySelectorAll('.accordion details').forEach(d => {
      d.querySelector('summary')?.addEventListener('click', (e) => {
        // Let native details handle it
      });
    });
  }

  /* ── Init ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initHeroStagger();
    initSmileDraw();
    initNavScroll();
    initMobileMenu();
    initCountUp();
    initAccordion();
  });
})();
