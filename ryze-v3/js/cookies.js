/* ============================================================
   RYZE V3 — COOKIE BANNER (CNIL compliant)
   3 equivalent buttons: Accepter / Refuser / Personnaliser
   No non-essential cookies before explicit consent.
   ============================================================ */
(function () {
  'use strict';

  const COOKIE_KEY = 'ryze_consent';
  const EXPIRY_DAYS = 180;

  function getConsent() {
    try {
      const v = localStorage.getItem(COOKIE_KEY);
      return v ? JSON.parse(v) : null;
    } catch { return null; }
  }

  function setConsent(value) {
    const data = { ...value, date: new Date().toISOString() };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(data));
    // Set a cookie too for server-side reading
    const exp = new Date(Date.now() + EXPIRY_DAYS * 864e5).toUTCString();
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(data))};expires=${exp};path=/;SameSite=Lax`;
  }

  function hideBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) banner.classList.remove('show');
  }

  function showBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) banner.classList.add('show');
  }

  function acceptAll() {
    setConsent({ analytics: true, marketing: true });
    hideBanner();
  }

  function refuseAll() {
    setConsent({ analytics: false, marketing: false });
    hideBanner();
  }

  function showCustomize() {
    // Toggle customize panel
    const panel = document.querySelector('.cookie-customize');
    if (panel) panel.classList.toggle('show');
  }

  function saveCustom() {
    const analytics = document.getElementById('cookie-analytics')?.checked || false;
    const marketing = document.getElementById('cookie-marketing')?.checked || false;
    setConsent({ analytics, marketing });
    hideBanner();
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    const consent = getConsent();
    if (!consent) {
      showBanner();
    }

    // Bind buttons
    document.querySelector('[data-cookie="accept"]')?.addEventListener('click', acceptAll);
    document.querySelector('[data-cookie="refuse"]')?.addEventListener('click', refuseAll);
    document.querySelector('[data-cookie="customize"]')?.addEventListener('click', showCustomize);
    document.querySelector('[data-cookie="save"]')?.addEventListener('click', saveCustom);
  });
})();
