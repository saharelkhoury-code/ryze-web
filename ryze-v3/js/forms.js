/* ============================================================
   RYZE V3 — FORMS (POST handler + success state)
   ============================================================ */
(function () {
  'use strict';

  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const successEl = form.closest('.form__wrapper')?.querySelector('.form__success')
        || form.nextElementSibling?.classList.contains('form__success') ? form.nextElementSibling : null;

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--color-error)';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      // Email validation
      const email = form.querySelector('[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = 'var(--color-error)';
        valid = false;
      }

      if (!valid) return;

      // Simulate POST
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Envoi en cours...';
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('show');
        } else {
          // Fallback: create inline success
          const msg = document.createElement('div');
          msg.className = 'form__success show';
          msg.innerHTML = '<h3>Merci !</h3><p>Votre message a bien ete envoye. Nous vous repondrons sous 24h.</p>';
          form.parentNode.insertBefore(msg, form.nextSibling);
        }
      }, 800);
    });
  });
})();
