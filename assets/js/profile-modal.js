/* ============================================================
   People page — click-to-enlarge profile modal
   Clicking any person card (PI / PhD / IDD / M.Tech) opens a
   larger, centered view of their photo and full details.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('profileModal');
  if (!modal) return;

  const photoEl = modal.querySelector('.profile-modal-photo');
  const roleEl  = modal.querySelector('.profile-modal-role');
  const nameEl  = modal.querySelector('.profile-modal-name');
  const metaEl  = modal.querySelector('.profile-modal-meta');
  const bodyEl  = modal.querySelector('.profile-modal-body');
  const linksEl = modal.querySelector('.profile-modal-links');

  function openModal(card) {
    const img   = card.querySelector('.avatar img');
    const role  = card.querySelector('.role');
    const name  = card.querySelector('h3');
    const links = card.querySelector('.links');
    const meta  = card.dataset.meta || '';

    photoEl.src = img ? img.src : '';
    photoEl.alt = img ? img.alt : (name ? name.textContent : '');
    roleEl.textContent = role ? role.textContent : '';
    nameEl.textContent = name ? name.textContent : '';
    metaEl.innerHTML = meta;
    metaEl.style.display = meta ? '' : 'none';

    // Clone every detail paragraph (thesis label, thesis, description) in order
    bodyEl.innerHTML = '';
    card.querySelectorAll('.thesis-label, .thesis, .topic').forEach(el => {
      bodyEl.appendChild(el.cloneNode(true));
    });

    linksEl.innerHTML = '';
    if (links) linksEl.appendChild(links.cloneNode(true));

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.card.person').forEach(card => {
    card.classList.add('clickable-profile');
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // let email/LinkedIn/etc links work normally
      openModal(card);
    });
  });

  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
