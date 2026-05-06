/* ============================================================
   EVENTS — délégation et écouteurs
   ============================================================ */
import {
  getFam, setFam,
  getTab, setTab,
  getCultureTab, setCultureTab,
  getTheme, setTheme,
  getUILang, setUILang,
  getSelectedCreole, setSelectedCreole,
  setSearchQuery
} from './state.js';
import {
  renderFam, renderChips, renderTab, renderHero,
  renderCulture, renderLangue,
  setUILangDOM, togglePlay, closeDetail, stopPlay,
  openLesson, showToast, carouselNext
} from './render.js';
import { openAuthModal, logout } from './auth.js';
import { UI_LANGUAGES, UI_LABELS } from './data.js';

/* ============================================================
   INIT SÉLECTEUR DE LANGUE (v1 + v2 grisés)
   ============================================================ */
function initLangSelect() {
  const sel = document.getElementById('uiLang');
  if (!sel) return;
  sel.innerHTML = '';
  UI_LANGUAGES.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = l.v2 ? `${l.label} (v2)` : l.label;
    opt.disabled = l.v2;
    if (l.v2) opt.style.color = 'var(--text-3)';
    sel.appendChild(opt);
  });
  sel.value = getUILang();
}

/* ============================================================
   CAROUSEL — intervalle global
   ============================================================ */
let _carouselInterval = null;

function startCarousel() {
  clearInterval(_carouselInterval);
  _carouselInterval = setInterval(carouselNext, 4500);
}

export function bindEvents() {

  /* -- Init sélecteur langue -- */
  initLangSelect();

  /* -- Démarrer carousel -- */
  startCarousel();

  /* --------------------------------------------------------
     Brand logo : scroll top
     -------------------------------------------------------- */
  const brand = document.querySelector('.brand');
  if (brand) brand.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* --------------------------------------------------------
     Bouton thème
     -------------------------------------------------------- */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const newTheme = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    themeBtn.textContent = newTheme === 'light' ? '☀' : '☾';
  });

  /* --------------------------------------------------------
     Menu burger
     -------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.classList.toggle('menu-open', !isOpen);
    });
  }

  /* --------------------------------------------------------
     Auth
     -------------------------------------------------------- */
  const authBtn = document.getElementById('authBtn');
  if (authBtn) authBtn.addEventListener('click', () => openAuthModal('login'));

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    logout();
    showToast('À bientôt !');
  });

  /* --------------------------------------------------------
     Sélecteur langue UI
     -------------------------------------------------------- */
  const uiLangSel = document.getElementById('uiLang');
  if (uiLangSel) uiLangSel.addEventListener('change', e => {
    const lang = e.target.value;
    setUILang(lang);
    setUILangDOM(lang);
    renderFam(getFam());
  });

  /* --------------------------------------------------------
     Recherche globale (sous le header)
     -------------------------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', e => {
    setSearchQuery(e.target.value.toLowerCase().trim());
    const tab = getTab();
    if (tab === 'langue')  renderLangue(getFam());
    else if (tab === 'culture') renderCulture(getFam());
  });

  /* --------------------------------------------------------
     Bouton play
     -------------------------------------------------------- */
  const playBtn = document.getElementById('playBtn');
  if (playBtn) playBtn.addEventListener('click', togglePlay);

  /* --------------------------------------------------------
     Fermer détail panel
     -------------------------------------------------------- */
  const detailClose = document.getElementById('detailClose');
  if (detailClose) detailClose.addEventListener('click', closeDetail);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });

  /* ========================================================
     DÉLÉGATION — fam-pills
     ======================================================== */
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

    /* Redémarrer carousel avec les nouvelles images */
    startCarousel();

    renderFam(newFam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Family ' + newFam + ' loaded');
  });

  /* ========================================================
     DÉLÉGATION — onglets principaux (4 tabs)
     ======================================================== */
  const tabbarInner = document.querySelector('.tabbar-inner');
  if (tabbarInner) tabbarInner.addEventListener('click', e => {
    const tabBtn = e.target.closest('.tab-btn');
    if (!tabBtn) return;
    const newTab = tabBtn.dataset.tab;
    if (getTab() === newTab) return;

    setTab(newTab);
    closeDetail();
    stopPlay();

    /* Reset search */
    setSearchQuery('');
    if (searchInput) searchInput.value = '';

    /* Activer le bon onglet */
    document.querySelectorAll('.tab-btn').forEach(b =>
      b.classList.toggle('active', b === tabBtn)
    );
    document.querySelectorAll('.tab-pane').forEach(p =>
      p.classList.toggle('active', p.id === 'pane-' + newTab)
    );

    /* Mettre à jour le placeholder de recherche */
    if (searchInput) {
      const _ui = UI_LABELS[getUILang()] || UI_LABELS.fr;
      searchInput.placeholder = newTab === 'culture'
        ? _ui.searchPlaceholderCulture
        : _ui.searchPlaceholder;
    }

    /* Hero adaptatif */
    renderHero(getFam(), newTab);

    /* Redémarrer carousel */
    startCarousel();

    /* Contenu */
    renderTab(newTab, getFam());
  });

  /* ========================================================
     DÉLÉGATION — sous-onglets Culture
     ======================================================== */
  const cultureSubbar = document.getElementById('cultureSubbar');
  if (cultureSubbar) cultureSubbar.addEventListener('click', e => {
    const btn = e.target.closest('.culture-sub-btn');
    if (!btn) return;
    const sub = btn.dataset.sub;
    if (getCultureTab() === sub) return;

    setCultureTab(sub);
    setSearchQuery('');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.culture-sub-btn').forEach(b =>
      b.classList.toggle('active', b === btn)
    );
    document.querySelectorAll('.culture-sub-pane').forEach(p =>
      p.classList.toggle('active', p.dataset.subPane === sub)
    );

    renderCulture(getFam());
  });

  /* ========================================================
     DÉLÉGATION — creole chips
     ======================================================== */
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

  /* ========================================================
     DÉLÉGATION — lesson cards
     ======================================================== */
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

  /* ========================================================
     DÉLÉGATION — footer links fam + tab
     ======================================================== */
  const footerEl = document.querySelector('footer');
  if (footerEl) footerEl.addEventListener('click', e => {
    const link = e.target.closest('a[data-fam], a[data-tab]');
    if (!link) return;
    e.preventDefault();

    if (link.dataset.fam) {
      const newFam = link.dataset.fam;
      setFam(newFam);
      setSelectedCreole(null);
      setSearchQuery('');
      document.documentElement.setAttribute('data-fam', newFam);
      document.querySelectorAll('.fam-pill').forEach(p =>
        p.classList.toggle('active', p.dataset.fam === newFam)
      );
      startCarousel();
      renderFam(newFam);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (link.dataset.tab) {
      const newTab = link.dataset.tab;
      setTab(newTab);
      document.querySelectorAll('.tab-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.tab === newTab)
      );
      document.querySelectorAll('.tab-pane').forEach(p =>
        p.classList.toggle('active', p.id === 'pane-' + newTab)
      );
      renderHero(getFam(), newTab);
      renderTab(newTab, getFam());
    }
  });
}
