/* ============================================================
   RENDER — rendu DOM
   ============================================================ */
import { FAMILIES, UI_LABELS, APROPOS_CONTENT } from './data.js';
import {
  getFam, getTab, getCultureTab, getUILang,
  getSelectedCreole, getSearchQuery,
  isPlaying, setPlaying, getPlayTimeout, setPlayTimeout,
  getToastTimeout, setToastTimeout
} from './state.js';
import { getSession } from './auth.js';

/* ============================================================
   HELPERS
   ============================================================ */
function ui() { return UI_LABELS[getUILang()] || UI_LABELS.fr; }
function fam() { return FAMILIES[getFam()]; }

function formatHeroBaseLabel(lang, baseLabel) {
  if (lang !== 'fr' || !baseLabel) return baseLabel;
  return /^[aeiouhàâäéèêëîïôöùûü]/i.test(baseLabel) ? `d'${baseLabel}` : baseLabel;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ============================================================
   RENDER FAM — point d'entrée principal
   ============================================================ */
export function renderFam(famKey) {
  const f = FAMILIES[famKey]; if (!f) return;
  const _ui = ui();
  const tab = getTab();

  /* -- Header logo -- */
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) {
    headerLogo.textContent = f.name;
    headerLogo.className = 'logo ' + (f.nameClass || '');
  }

  /* -- Hero adaptatif -- */
  renderHero(famKey, tab);

  /* -- Chip label -- */
  const heroChipLabel = document.getElementById('heroChipLabel');
  if (heroChipLabel)
    heroChipLabel.textContent = _ui.chipLabel + ' ' + formatHeroBaseLabel(getUILang(), _ui.bases[f.base] ?? f.base);

  /* -- Audio label -- */
  setText('audioLbl', f.audioLbl);

  /* -- Banner -- */
  setText('bannerTitle', f.name);
  setText('bannerBaseline', f.baseline);
  setText('bannerDesc', f.desc);
  setText('statCount', f.creoles.length);
  setText('statSpeakers', f.speakers);

  /* -- Footer -- */
  setText('footerLogo', f.name);
  const footerTagline = document.getElementById('footerTagline');
  if (footerTagline) footerTagline.textContent = f.footer + '\n' + _ui.footerTaglineSuffix;

  /* -- Onglets principaux labels -- */
  setText('tab-langue',     _ui.langue);
  setText('tab-culture',    _ui.culture);
  setText('tab-apropos',    _ui.apropos);
  setText('tab-communaute', _ui.communaute);

  /* -- Search placeholder -- */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = tab === 'culture'
      ? _ui.searchPlaceholderCulture
      : _ui.searchPlaceholder;
  }

  /* -- Chips créoles -- */
  renderChips(famKey);

  /* -- Progress strip (langue uniquement) -- */
  renderProgressStrip(famKey);

  /* -- Contenu onglet actif -- */
  renderTab(tab, famKey);
}

/* ============================================================
   HERO ADAPTATIF
   ============================================================ */
export function renderHero(famKey, tab) {
  const f = FAMILIES[famKey]; if (!f) return;
  const _ui = ui();

  /* Titre & sous-titre */
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.textContent = f.heroTitles?.[tab] ?? f.title;
    heroTitle.className = 'hero-title ' + (tab === 'langue' ? (f.titleClass || '') : '');
  }
  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.textContent = f.heroSubs?.[tab] ?? f.sub;

  /* Eyebrow */
  setText('heroEyebrow', f.eyebrow);

  /* Boutons hero selon onglet */
  const btnPLabel = document.getElementById('heroBtnPLabel');
  const btnSLabel = document.getElementById('heroBtnSLabel');
  if (btnPLabel) btnPLabel.textContent = _ui[`heroBtnP_${tab}`] ?? f.btnP;
  if (btnSLabel) btnSLabel.textContent = _ui[`heroBtnS_${tab}`] ?? f.btnS;

  /* Images carousel selon onglet */
  const images = f.heroImages?.[tab] ?? ['assets/images/hero-visual.jpg'];
  updateCarouselImages(images);
}

/* pool d'images courant pour le carousel */
let _carouselImages = [
  'assets/images/hero-visual.jpg',
  'assets/images/hero-visual-2.jpg',
  'assets/images/hero-visual-3.jpg'
];
let _carouselIndex = 0;

export function updateCarouselImages(images) {
  _carouselImages = images.length ? images : ['assets/images/hero-visual.jpg'];
  _carouselIndex = 0;
  const img = document.getElementById('heroCarouselImage');
  if (img) {
    img.src = _carouselImages[0];
    img.classList.remove('is-fading');
  }
  /* Sync barres */
  const bars = document.querySelectorAll('.hero-carousel-bar');
  bars.forEach((b, i) => b.classList.toggle('active', i === 0));
}

export function carouselNext() {
  const image = document.getElementById('heroCarouselImage');
  if (!image || _carouselImages.length < 2) return;
  image.classList.add('is-fading');
  setTimeout(() => {
    _carouselIndex = (_carouselIndex + 1) % _carouselImages.length;
    image.src = _carouselImages[_carouselIndex];
    image.classList.remove('is-fading');
    const bars = document.querySelectorAll('.hero-carousel-bar');
    bars.forEach((b, i) => b.classList.toggle('active', i === _carouselIndex % bars.length));
    const cells = document.querySelectorAll('#progressStrip .progress-cell');
    if (cells.length) cells.forEach((c, i) => c.classList.toggle('active', i === _carouselIndex % cells.length));
  }, 220);
}

/* ============================================================
   CHIPS CRÉOLES
   ============================================================ */
export function renderChips(famKey) {
  const f = FAMILIES[famKey];
  const sel = getSelectedCreole();
  const c = document.getElementById('creoleChips');
  if (!c) return;
  c.innerHTML = '';
  f.creoles.forEach((cr, idx) => {
    const d = document.createElement('div');
    d.className = 'creole-chip' + (sel === String(idx) ? ' selected' : '');
    d.textContent = cr.name;
    d.title = cr.full + ' · ' + cr.iso;
    d.dataset.iso = cr.iso;
    d.dataset.idx = String(idx);
    c.appendChild(d);
  });
}

/* ============================================================
   PROGRESS STRIP
   ============================================================ */
export function renderProgressStrip(famKey) {
  const f = FAMILIES[famKey];
  const s = document.getElementById('progressStrip');
  if (!s) return;
  s.innerHTML = '';
  const lessons = Array.isArray(f.langue) ? f.langue : [];
  const t = Math.max(1, lessons.length);
  const d = Math.floor(t * 0.33);
  for (let i = 0; i < t; i++) {
    const cell = document.createElement('div');
    cell.className = 'progress-cell' + (i < d ? ' done' : '');
    s.appendChild(cell);
  }
}

/* ============================================================
   DISPATCH ONGLETS
   ============================================================ */
export function renderTab(tab, famKey) {
  if      (tab === 'langue')     renderLangue(famKey);
  else if (tab === 'culture')    renderCulture(famKey);
  else if (tab === 'apropos')    renderApropos();
  else if (tab === 'communaute') renderCommunaute();
}

/* ============================================================
   ONGLET LANGUE
   ============================================================ */
export function renderLangue(famKey) {
  const f = FAMILIES[famKey];
  const sel = getSelectedCreole();
  const q = getSearchQuery();
  const lessons = Array.isArray(f.langue) ? f.langue : [];
  const _ui = ui();

  const selectedIso = sel !== null && f.creoles[+sel] ? f.creoles[+sel].iso : null;
  let items = selectedIso ? lessons.filter(l => l.iso === selectedIso) : lessons;
  if (q) items = items.filter(l =>
    l.phrase.toLowerCase().includes(q) ||
    l.fr.toLowerCase().includes(q) ||
    l.tag.toLowerCase().includes(q)
  );

  setText('langSectionTitle', _ui.sectionTitles.langue);
  const cnt = document.getElementById('langCount');
  if (cnt) cnt.textContent = _ui.lessonCount(items.length);

  const cont = document.getElementById('langCards');
  if (!cont) return;
  cont.innerHTML = '';

  if (items.length === 0) {
    const name = selectedIso ? f.creoles.find(c => c.iso === selectedIso)?.name || selectedIso : '';
    const available = f.creoles
      .filter((cr, idx, arr) => arr.findIndex(x => x.iso === cr.iso) === idx && lessons.some(l => l.iso === cr.iso))
      .map(cr => cr.name).join(', ');
    const msg = selectedIso
      ? `Contenu pour <strong>${name}</strong> bientôt disponible.<br><small>Leçons disponibles : ${available || 'aucune pour l\'instant'}.</small>`
      : _ui.noLesson;
    cont.innerHTML = `<p style="color:var(--text-3);font-size:14px;padding:24px 0;line-height:1.6">${msg}</p>`;
    return;
  }

  const isAr = famKey === 'takafa';
  const listenLabel = (f.audioLbl || '').split(' ')[0] || '▶';
  items.forEach((l, i) => {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.dataset.lessonIndex = String(i);
    card.innerHTML = `
      <div class="card-top">
        <span class="card-tag">${l.tag}</span>
        <div class="card-phrase ${isAr ? 'card-phrase-ar' : ''}">${l.phrase}</div>
        <div class="card-translation">${l.fr}</div>
      </div>
      <div class="madras-band-thin"></div>
      <div class="card-bottom">
        <button class="btn-listen" data-listen-index="${i}">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><polygon points="3,2 14,8 3,14"/></svg>
          ${listenLabel}
        </button>
        <span class="card-iso">${l.iso}</span>
      </div>`;
    cont.appendChild(card);
  });
}

export function openLesson(idx) {
  const famKey = getFam();
  const f = FAMILIES[famKey];
  const lessons = Array.isArray(f.langue) ? f.langue : [];
  const sel = getSelectedCreole();
  const selectedIso = sel !== null && f.creoles[+sel] ? f.creoles[+sel].iso : null;
  const items = selectedIso ? lessons.filter(l => l.iso === selectedIso) : lessons;
  const l = items[idx];
  if (!l) return;

  const dpPhrase = document.getElementById('dpPhrase');
  if (dpPhrase) {
    dpPhrase.textContent = l.phrase;
    dpPhrase.className = 'detail-phrase' + (famKey === 'takafa' ? ' detail-phrase-ar' : '');
  }
  setText('dpFr', l.fr);
  setText('quizQ', l.q);

  const opts = document.getElementById('quizOpts');
  if (!opts) return;
  opts.innerHTML = '';
  l.opts.forEach((o, i) => {
    const b = document.createElement('button');
    b.className = 'qopt';
    b.textContent = o;
    b.onclick = () => {
      opts.querySelectorAll('.qopt').forEach(x => x.disabled = true);
      b.classList.add(i === l.ans ? 'correct' : 'wrong');
      showToast(i === l.ans ? '✓ Correct !' : '✗ Réessaye');
    };
    opts.appendChild(b);
  });

  stopPlay();
  document.getElementById('detailPanel')?.classList.add('open');
}

export function closeDetail() {
  document.getElementById('detailPanel')?.classList.remove('open');
}

/* ============================================================
   ONGLET CULTURE — sous-onglets
   ============================================================ */
export function renderCulture(famKey) {
  const _ui = ui();
  const sub = getCultureTab();

  /* Labels sous-onglets */
  setText('subTab-voyage',  _ui.cultureSubTabs.voyage);
  setText('subTab-cuisine', _ui.cultureSubTabs.cuisine);
  setText('subTab-musique', _ui.cultureSubTabs.musique);

  /* Activer le bon sous-onglet */
  document.querySelectorAll('.culture-sub-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.sub === sub)
  );
  document.querySelectorAll('.culture-sub-pane').forEach(p =>
    p.classList.toggle('active', p.dataset.subPane === sub)
  );

  if      (sub === 'voyage')  renderVoyage(famKey);
  else if (sub === 'cuisine') renderCuisine(famKey);
  else if (sub === 'musique') renderMusique(famKey);
}

/* ---- Voyage ---- */
export function renderVoyage(famKey) {
  const f = FAMILIES[famKey];
  const _ui = ui();
  const q = getSearchQuery();
  let items = Array.isArray(f.voyage) ? f.voyage : [];
  if (q) items = items.filter(e =>
    e.phrase.toLowerCase().includes(q) ||
    e.fr.toLowerCase().includes(q) ||
    e.sit.toLowerCase().includes(q)
  );

  setText('voyageSectionTitle', _ui.sectionTitles.voyage);
  const cnt = document.getElementById('voyageCount');
  if (cnt) cnt.textContent = _ui.expressionCount(items.length);

  const cont = document.getElementById('voyageCards');
  if (!cont) return;
  cont.innerHTML = '';
  const isAr = famKey === 'takafa';
  items.forEach(e => {
    const d = document.createElement('div');
    d.className = 'expr-card';
    d.innerHTML = `
      <div class="expr-situation">${e.sit}</div>
      <div class="expr-phrase ${isAr ? 'expr-phrase-ar' : ''}">${e.phrase}</div>
      <div class="expr-fr">${e.fr}</div>
      <div class="madras-band-thin" style="border-radius:4px;margin-bottom:10px;"></div>
      <div class="expr-note">${e.note}</div>`;
    cont.appendChild(d);
  });
}

/* ---- Cuisine ---- */
export function renderCuisine(famKey) {
  const f = FAMILIES[famKey];
  const _ui = ui();
  const q = getSearchQuery();
  let items = Array.isArray(f.cuisine) ? f.cuisine : [];
  if (q) items = items.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.desc.toLowerCase().includes(q) ||
    r.tag.toLowerCase().includes(q)
  );

  setText('cuisineSectionTitle', _ui.sectionTitles.cuisine);
  const cnt = document.getElementById('cuisineCount');
  if (cnt) cnt.textContent = _ui.recipeCount(items.length);

  const cont = document.getElementById('cuisineCards');
  if (!cont) return;
  cont.innerHTML = '';
  items.forEach(r => {
    const d = document.createElement('div');
    d.className = 'recipe-card';
    d.innerHTML = `
      <div class="recipe-color-band madras-band-thin"></div>
      <div class="recipe-body">
        <div class="recipe-name">${r.name}</div>
        <div class="recipe-origin">${r.origin}</div>
        <div class="recipe-desc">${r.desc}</div>
      </div>
      <div class="recipe-footer">
        <span class="recipe-tag">${r.tag}</span>
        <span class="recipe-difficulty">${r.diff}</span>
      </div>`;
    cont.appendChild(d);
  });
}

/* ---- Musique ---- */
export function renderMusique(famKey) {
  const f = FAMILIES[famKey];
  const _ui = ui();
  const q = getSearchQuery();
  let items = Array.isArray(f.musique) ? f.musique : [];
  if (q) items = items.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.desc.toLowerCase().includes(q) ||
    m.tag.toLowerCase().includes(q)
  );

  setText('musiqueSectionTitle', _ui.sectionTitles.musique);
  const cnt = document.getElementById('musiqueCount');
  if (cnt) cnt.textContent = _ui.styleCount(items.length);

  const cont = document.getElementById('musiqueCards');
  if (!cont) return;
  cont.innerHTML = '';
  items.forEach(m => {
    const d = document.createElement('div');
    d.className = 'recipe-card';
    d.innerHTML = `
      <div class="recipe-color-band madras-band-thin"></div>
      <div class="recipe-body">
        <div class="recipe-name">${m.name}</div>
        <div class="recipe-origin">${m.origin}</div>
        <div class="recipe-desc">${m.desc}</div>
      </div>
      <div class="recipe-footer">
        <span class="recipe-tag">${m.tag}</span>
        <span class="recipe-difficulty">${m.diff}</span>
      </div>`;
    cont.appendChild(d);
  });
}

/* ============================================================
   ONGLET À PROPOS
   ============================================================ */
export function renderApropos() {
  const _ui = ui();
  const lang = getUILang();
  const content = APROPOS_CONTENT[lang] || APROPOS_CONTENT.fr;
  const cont = document.getElementById('aproposCont');
  if (!cont) return;

  setText('aproposSectionTitle', _ui.sectionTitles.apropos);

  const statsHTML = content.stats.map(s =>
    `<div class="stat-card"><div class="stat-card-val">${s.val}</div><div class="stat-card-lbl">${s.lbl}</div></div>`
  ).join('');

  const sectionsHTML = content.sections.map(s =>
    `<div class="apropos-section">
      <h3 class="apropos-heading">${s.heading}</h3>
      <p class="apropos-text">${s.text}</p>
    </div>`
  ).join('');

  cont.innerHTML = `
    <div class="apropos-intro">${content.intro}</div>
    <div class="apropos-stats">${statsHTML}</div>
    ${sectionsHTML}
    <div class="apropos-v2-note">
      <span class="v2-badge">v2</span>
      Histoire · Cinéma · Art · Architecture · Littérature
    </div>`;
}

/* ============================================================
   ONGLET COMMUNAUTÉ
   ============================================================ */
const POSTS_KEY = 'kreolia_posts';

function getPosts() {
  try { return JSON.parse(localStorage.getItem(POSTS_KEY)) || []; } catch { return []; }
}
function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function renderCommunaute() {
  const _ui = ui();
  const session = getSession();
  const cont = document.getElementById('communauteCont');
  if (!cont) return;

  setText('communauteSectionTitle', _ui.sectionTitles.communaute);

  const posts = getPosts();

  const postsHTML = posts.length === 0
    ? `<p class="communaute-empty">Soyez le premier à laisser un message ✨</p>`
    : posts.slice().reverse().map(p => `
        <div class="post-card">
          <div class="post-header">
            <span class="post-pseudo">👤 ${p.pseudo}</span>
            <span class="post-date">${new Date(p.date).toLocaleDateString(getUILang(), {day:'2-digit',month:'short',year:'numeric'})}</span>
          </div>
          <div class="post-body">${p.text}</div>
        </div>`).join('');

  const composeHTML = session
    ? `<div class="communaute-compose">
        <textarea id="postTextarea" class="post-textarea" placeholder="${_ui.communautePostPlaceholder}" maxlength="500" rows="3"></textarea>
        <div class="compose-footer">
          <span class="post-charcount" id="postCharCount">0 / 500</span>
          <button type="button" class="btn-primary compose-btn" id="postSubmitBtn">${_ui.communautePostBtn}</button>
        </div>
      </div>`
    : `<p class="communaute-login-prompt">${_ui.communauteLoginPrompt}</p>`;

  cont.innerHTML = `
    ${composeHTML}
    <div class="posts-list">${postsHTML}</div>`;

  /* Bind textarea charcount + submit */
  const textarea = document.getElementById('postTextarea');
  const charCount = document.getElementById('postCharCount');
  const submitBtn = document.getElementById('postSubmitBtn');

  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      charCount.textContent = `${textarea.value.length} / 500`;
    });
  }

  if (submitBtn && textarea && session) {
    submitBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) return;
      const posts = getPosts();
      posts.push({ pseudo: session.pseudo, text, date: Date.now() });
      savePosts(posts);
      renderCommunaute();
      showToast('💬 Message publié !');
    });
  }
}

/* ============================================================
   UI LANG DOM — met à jour toute l'interface
   ============================================================ */
export function setUILangDOM(lang) {
  const _ui = UI_LABELS[lang] || UI_LABELS.fr;
  setText('tab-langue',     _ui.langue);
  setText('tab-culture',    _ui.culture);
  setText('tab-apropos',    _ui.apropos);
  setText('tab-communaute', _ui.communaute);

  if (_ui.cultureSubTabs) {
    setText('subTab-voyage',  _ui.cultureSubTabs.voyage);
    setText('subTab-cuisine', _ui.cultureSubTabs.cuisine);
    setText('subTab-musique', _ui.cultureSubTabs.musique);
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = _ui.searchPlaceholder;

  /* Boutons auth */
  setText('authBtn',    _ui.loginBtn);
  setText('logoutBtn',  _ui.logoutBtn);

  /* Modale */
  document.querySelectorAll('.auth-tab-btn').forEach(b => {
    if (b.dataset.authTab === 'login')    b.textContent = _ui.loginTitle;
    if (b.dataset.authTab === 'register') b.textContent = _ui.registerTitle;
  });

  const f = FAMILIES[getFam()];
  const heroChipLabel = document.getElementById('heroChipLabel');
  if (heroChipLabel && f)
    heroChipLabel.textContent = _ui.chipLabel + ' ' + formatHeroBaseLabel(lang, _ui.bases[f.base] ?? f.base);
}

/* ============================================================
   AUDIO / PLAY
   ============================================================ */
export function togglePlay() {
  if (isPlaying()) { stopPlay(); return; }
  setPlaying(true);
  const b = document.getElementById('playBtn');
  if (b) b.innerHTML = '<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>';
  document.querySelectorAll('.wbar').forEach(b => b.classList.add('playing'));
  setPlayTimeout(setTimeout(stopPlay, 4000));
}

export function stopPlay() {
  setPlaying(false);
  clearTimeout(getPlayTimeout());
  document.querySelectorAll('.wbar').forEach(b => b.classList.remove('playing'));
  const b = document.getElementById('playBtn');
  if (b) b.innerHTML = '<svg viewBox="0 0 16 16" fill="currentColor"><polygon points="3,2 14,8 3,14"/></svg>';
}

/* ============================================================
   TOAST
   ============================================================ */
export function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(getToastTimeout());
  setToastTimeout(setTimeout(() => t.classList.remove('show'), 2200));
}
