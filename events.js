/* ============================================================
   EVENTS — délégation et écouteurs
   ============================================================ */
import {
  getFam, setFam, getTab, setTab, getTheme, setTheme,
  getUILang, setUILang, getSelectedCreole, setSelectedCreole,
  setSearchQuery
} from './state.js';
import {
  renderFam, renderChips, renderTab, renderLangue,
  setUILangDOM, togglePlay, closeDetail, stopPlay,
  openLesson, showToast, buildFooterIsos
} from './render.js';
import { openAuthModal, logout } from './auth.js';

export function bindEvents() {

  /* -- Brand logo : scroll top -------------------------------- */
  const brand = document.querySelector('.brand');
  if (brand) brand.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* -- Bouton thème ------------------------------------------ */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const newTheme = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    themeBtn.textContent = newTheme === 'light' ? '☀' : '☾';
  });

  /* -- Menu toggle burger ------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
  }

  /* -- Bouton connexion --------------------------------------- */
  const authBtn = document.getElementById('authBtn');
  if (authBtn) authBtn.addEventListener('click', () => openAuthModal('login'));

  /* -- Bouton déconnexion ------------------------------------- */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    logout();
    showToast('À bientôt !');
  });

  /* -- Sélecteur de langue UI -------------------------------- */
  const uiLangSel = document.getElementById('uiLang');
  if (uiLangSel) uiLangSel.addEventListener('change', e => {
    setUILang(e.target.value);
    setUILangDOM(e.target.value);
    renderFam(getFam());
  });

  /* -- Recherche --------------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', e => {
    setSearchQuery(e.target.value.toLowerCase().trim());
    renderLangue(getFam());
  });

  /* -- Bouton play ------------------------------------------- */
  const playBtn = document.getElementById('playBtn');
  if (playBtn) playBtn.addEventListener('click', togglePlay);

  /* -- Bouton fermer détail ---------------------------------- */
  const detailClose = document.getElementById('detailClose');
  if (detailClose) detailClose.addEventListener('click', closeDetail);

  /* -- Escape ferme le panneau ------------------------------- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });

  /* ========================================================= */
  /*  DÉLÉGATION — fam-pills                                   */
  /* ========================================================= */
  const famPillsEl = document.getElementById('famPills');
  if (famPillsEl) famPillsEl.addEventListener('click', e => {
    const pill = e.target.closest('.fam-pill');
    if (!pill) return;
    const newFam = pill.dataset.fam;
    if (getFam() === newFam) return;

    setFam(newFam);
    setSelectedCreole(null);
    setSearchQuery('');
    if (searchInput) searchInput.value = '';
    closeDetail();
    stopPlay();

    document.querySelectorAll('.fam-pill').forEach(p =>
      p.classList.toggle('active', p === pill)
    );
    document.documentElement.setAttribute('data-fam', newFam);

    renderFam(newFam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Family ' + newFam + ' loaded');
  });

  /* ========================================================= */
  /*  DÉLÉGATION — onglets                                     */
  /* ========================================================= */
  const tabbarInner = document.querySelector('.tabbar-inner');
  if (tabbarInner) tabbarInner.addEventListener('click', e => {
    const tabBtn = e.target.closest('.tab-btn');
    if (!tabBtn) return;
    const newTab = tabBtn.dataset.tab;
    setTab(newTab);
    closeDetail();
    stopPlay();

    document.querySelectorAll('.tab-btn').forEach(b =>
      b.classList.toggle('active', b === tabBtn)
    );
    document.querySelectorAll('.tab-pane').forEach(p =>
      p.classList.toggle('active', p.id === 'pane-' + newTab)
    );

    renderTab(newTab, getFam());
  });

  /* ========================================================= */
  /*  DÉLÉGATION — creole chips                                */
  /* ========================================================= */
  const creoleChipsEl = document.getElementById('creoleChips');
  if (creoleChipsEl) creoleChipsEl.addEventListener('click', e => {
    const chip = e.target.closest('.creole-chip');
    if (!chip) return;
    const idx = chip.getAttribute('data-idx');
    setSelectedCreole(getSelectedCreole() === idx ? null : idx);
    setSearchQuery('');
    if (searchInput) searchInput.value = '';
    closeDetail();

    renderChips(getFam());
    renderTab(getTab(), getFam());
  });

  /* ========================================================= */
  /*  DÉLÉGATION — lesson cards                                */
  /* ========================================================= */
  const langCards = document.getElementById('langCards');
  if (langCards) langCards.addEventListener('click', e => {
    const listenBtn = e.target.closest('.btn-listen');
    const card      = e.target.closest('.lesson-card');

    if (listenBtn) {
      e.stopPropagation();
      openLesson(parseInt(listenBtn.getAttribute('data-listen-index'), 10));
    } else if (card) {
      openLesson(parseInt(card.getAttribute('data-lesson-index'), 10));
    }
  });

  /* ========================================================= */
  /*  DÉLÉGATION — ISO table (clic sur famille)               */
  /* ========================================================= */
  const isoTableBody = document.getElementById('isoTableBody');
  if (isoTableBody) isoTableBody.addEventListener('click', e => {
    const td = e.target.closest('td[data-fam]');
    if (!td) return;
    const fam = td.getAttribute('data-fam');
    setFam(fam);
    setSelectedCreole(null);
    setSearchQuery('');
    document.documentElement.setAttribute('data-fam', fam);
    document.querySelectorAll('.fam-pill').forEach(p =>
      p.classList.toggle('active', p.dataset.fam === fam)
    );
    renderFam(fam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========================================================= */
  /*  DÉLÉGATION — footer links fam + tab                     */
  /* ========================================================= */
  const footerEl = document.querySelector('footer');
  if (footerEl) footerEl.addEventListener('click', e => {
    const link = e.target.closest('a[data-fam], a[data-tab]');
    if (!link) return;
    e.preventDefault();

    if (link.dataset.fam) {
      const fam = link.dataset.fam;
      setFam(fam);
      setSelectedCreole(null);
      setSearchQuery('');
      document.documentElement.setAttribute('data-fam', fam);
      document.querySelectorAll('.fam-pill').forEach(p =>
        p.classList.toggle('active', p.dataset.fam === fam)
      );
      renderFam(fam);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (link.dataset.tab) {
      const tab = link.dataset.tab;
      setTab(tab);
      document.querySelectorAll('.tab-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.tab === tab)
      );
      document.querySelectorAll('.tab-pane').forEach(p =>
        p.classList.toggle('active', p.id === 'pane-' + tab)
      );
      renderTab(tab, getFam());
    }
  });
}
