/* ============================================================
   RENDER — toutes les fonctions d'affichage DOM
   ============================================================ */
import { FAMILIES, UI_LABELS } from './data.js';
import {
  getFam, getTab, getUILang, getSelectedCreole, getSearchQuery,
  isPlaying, setPlaying, getPlayTimeout, setPlayTimeout,
  getToastTimeout, setToastTimeout
} from './state.js';

/* ---------------------------------------------------------- */
/*  FAM (hero + banner + chips + tab actif)                   */
/* ---------------------------------------------------------- */
export function renderFam(fam) {
  const f = FAMILIES[fam];
  if (!f) return;

  const logo = document.getElementById('headerLogo');
  if (logo) {
    logo.textContent = f.name;
    logo.className = 'logo ' + (f.nameClass || '');
  }

  const heroEyebrow = document.getElementById('heroEyebrow');
  if (heroEyebrow) heroEyebrow.textContent = f.eyebrow;

  const ht = document.getElementById('heroTitle');
  if (ht) {
    ht.textContent = f.title;
    ht.className = 'hero-title ' + (f.titleClass || '');
  }

  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.textContent = f.sub;

  const heroBtnP = document.getElementById('heroBtnP');
  if (heroBtnP) heroBtnP.textContent = f.btnP;

  const heroBtnS = document.getElementById('heroBtnS');
  if (heroBtnS) heroBtnS.textContent = f.btnS;

  const _uiLabels = UI_LABELS[getUILang()] || UI_LABELS['fr'];
  const heroChipLabel = document.getElementById('heroChipLabel');
  if (heroChipLabel) {
    const baseName = _uiLabels.bases[f.base] ?? f.base;
    heroChipLabel.textContent = _uiLabels.chipLabel + ' ' + baseName;
  }

  const audioLbl = document.getElementById('audioLbl');
  if (audioLbl) audioLbl.textContent = f.audioLbl;

  const bt = document.getElementById('bannerTitle');
  if (bt) {
    bt.textContent = f.name;
    bt.className = 'fam-banner-title' +
      (f.nameClass === 'logo-ar'    ? ' fam-banner-title-ar'    :
       f.nameClass === 'logo-serif' ? ' fam-banner-title-serif' : '');
  }

  const bannerBaseline = document.getElementById('bannerBaseline');
  if (bannerBaseline) bannerBaseline.textContent = f.baseline;

  const bannerDesc = document.getElementById('bannerDesc');
  if (bannerDesc) bannerDesc.textContent = f.desc;

  const statCount = document.getElementById('statCount');
  if (statCount) statCount.textContent = f.creoles.length;

  const statSpeakers = document.getElementById('statSpeakers');
  if (statSpeakers) statSpeakers.textContent = f.speakers;

  const fl = document.getElementById('footerLogo');
  if (fl) {
    fl.textContent = f.name;
    fl.className = 'footer-logo ' + (f.nameClass || '');
  }

  const footerTagline = document.getElementById('footerTagline');
  if (footerTagline) footerTagline.textContent =
    f.footer + '\nAll the world\'s creoles, one platform.';

  if (f.langSectionTitle) {
    const langSectionTitle = document.getElementById('langSectionTitle');
    if (langSectionTitle) langSectionTitle.textContent = f.langSectionTitle;
  }
  if (f.cuisineSectionTitle) {
    const cuisineSectionTitle = document.getElementById('cuisineSectionTitle');
    if (cuisineSectionTitle) cuisineSectionTitle.textContent = f.cuisineSectionTitle;
  }
  if (f.vieSectionTitle) {
    const vieSectionTitle = document.getElementById('vieSectionTitle');
    if (vieSectionTitle) vieSectionTitle.textContent = f.vieSectionTitle;
  }

  renderChips(fam);
  renderProgressStrip(fam);
  renderTab(getTab(), fam);
  buildFooterIsos();
}

/* ---------------------------------------------------------- */
/*  CHIPS créoles                                             */
/* ---------------------------------------------------------- */
export function renderChips(fam) {
  const f = FAMILIES[fam];
  const selectedCreole = getSelectedCreole();
  const container = document.getElementById('creoleChips');
  if (!container) return;
  container.innerHTML = '';
  f.creoles.forEach(c => {
    const d = document.createElement('div');
    d.className = 'creole-chip' + (selectedCreole === c.iso ? ' selected' : '');
    d.textContent = c.name;
    d.title = c.full + ' · ' + c.iso;
    d.setAttribute('data-iso', c.iso);
    container.appendChild(d);
  });
}

/* ---------------------------------------------------------- */
/*  PROGRESS STRIP                                            */
/* ---------------------------------------------------------- */
export function renderProgressStrip(fam) {
  const f = FAMILIES[fam];
  const strip = document.getElementById('progressStrip');
  if (!strip) return;
  strip.innerHTML = '';
  const total = f.langue.length;
  const done  = Math.floor(total * 0.33);
  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'progress-cell' + (i < done ? ' done' : '');
    strip.appendChild(cell);
  }
}

/* ---------------------------------------------------------- */
/*  TAB dispatcher                                            */
/* ---------------------------------------------------------- */
export function renderTab(tab, fam) {
  if      (tab === 'langue')  renderLangue(fam);
  else if (tab === 'cuisine') renderCuisine(fam);
  else if (tab === 'vie')     renderVie(fam);
  else if (tab === 'iso')     renderIsoTable(fam);
}

/* ---------------------------------------------------------- */
/*  LANGUE (leçons)                                           */
/* ---------------------------------------------------------- */
export function renderLangue(fam) {
  const f = FAMILIES[fam];
  const selectedCreole = getSelectedCreole();
  const searchQuery    = getSearchQuery();

  let items = selectedCreole
    ? f.langue.filter(l => l.iso === selectedCreole)
    : f.langue;

  if (searchQuery) {
    items = items.filter(l =>
      l.phrase.toLowerCase().includes(searchQuery) ||
      l.fr.toLowerCase().includes(searchQuery)     ||
      l.tag.toLowerCase().includes(searchQuery)
    );
  }

  const container = document.getElementById('langCards');
  const langCount = document.getElementById('langCount');

  if (!container || !langCount) return;

  container.innerHTML = '';
  langCount.textContent =
    items.length + ' lesson' + (items.length !== 1 ? 's' : '');

  const isAr = fam === 'takafa';

  if (items.length === 0) {
    container.innerHTML =
      '<p style="color:var(--text-3);font-size:14px;padding:16px 0;">No lessons found.</p>';
    return;
  }

  items.forEach((l, i) => {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.setAttribute('data-lesson-index', i);
    card.innerHTML = `
      <div class="card-top">
        <span class="card-tag">${l.tag}</span>
        <div class="card-phrase ${isAr ? 'card-phrase-ar' : ''}">${l.phrase}</div>
        <div class="card-translation">${l.fr}</div>
      </div>
      <div class="madras-band-thin"></div>
      <div class="card-bottom">
        <button class="btn-listen" data-listen-index="${i}">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <polygon points="3,2 14,8 3,14"/>
          </svg>
          ${f.audioLbl.split(' ')[0]}
        </button>
        <span class="card-iso">${l.iso}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ---------------------------------------------------------- */
/*  DETAIL PANEL (leçon ouverte)                              */
/* ---------------------------------------------------------- */
export function openLesson(idx) {
  const fam  = getFam();
  const f    = FAMILIES[fam];
  const selectedCreole = getSelectedCreole();
  const searchQuery    = getSearchQuery();

  let items = selectedCreole
    ? f.langue.filter(l => l.iso === selectedCreole)
    : f.langue;

  if (searchQuery) {
    items = items.filter(l =>
      l.phrase.toLowerCase().includes(searchQuery) ||
      l.fr.toLowerCase().includes(searchQuery)     ||
      l.tag.toLowerCase().includes(searchQuery)
    );
  }

  const l = items[idx];
  if (!l) return;

  const isAr = fam === 'takafa';

  const dp        = document.getElementById('dpPhrase');
  const dpFr      = document.getElementById('dpFr');
  const audioLbl  = document.getElementById('audioLbl');
  const quizQ     = document.getElementById('quizQ');
  const quizOpts  = document.getElementById('quizOpts');
  const detailPanel = document.getElementById('detailPanel');

  if (!dp || !dpFr || !audioLbl || !quizQ || !quizOpts || !detailPanel) return;

  dp.textContent = l.phrase;
  dp.className = 'detail-phrase' + (isAr ? ' detail-phrase-ar' : '');

  dpFr.textContent     = l.fr;
  audioLbl.textContent = f.audioLbl;

  resetQuiz();
  quizQ.textContent = l.q;
  quizOpts.innerHTML = '';
  l.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'qopt';
    btn.textContent = o;
    btn.addEventListener('click', () => answerQuiz(btn, i === l.ans, quizOpts));
    quizOpts.appendChild(btn);
  });

  stopPlay();
  detailPanel.classList.add('open');
  setTimeout(() => detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

export function closeDetail() {
  const detailPanel = document.getElementById('detailPanel');
  if (detailPanel) detailPanel.classList.remove('open');
}

function resetQuiz() {
  const quizQ    = document.getElementById('quizQ');
  const quizOpts = document.getElementById('quizOpts');
  if (quizQ)    quizQ.textContent  = '';
  if (quizOpts) quizOpts.innerHTML = '';
}

function answerQuiz(btn, correct, container) {
  container.querySelectorAll('.qopt').forEach(b => {
    b.onclick = null;
    b.style.cursor = 'default';
  });
  btn.classList.add(correct ? 'correct' : 'wrong');
  showToast(correct ? '✓ Correct answer!' : '✗ Try again...');
}

/* ---------------------------------------------------------- */
/*  CUISINE                                                   */
/* ---------------------------------------------------------- */
export function renderCuisine(fam) {
  const f = FAMILIES[fam];
  const container  = document.getElementById('cuisineCards');
  const cuisineCount = document.getElementById('cuisineCount');

  if (!container || !cuisineCount) return;

  container.innerHTML = '';
  cuisineCount.textContent =
    f.cuisine.length + ' recipe' + (f.cuisine.length !== 1 ? 's' : '');

  f.cuisine.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <div class="recipe-color-band madras-band-thin"></div>
      <div class="recipe-body">
        <div class="recipe-name">${r.name}</div>
        <div class="recipe-origin">${r.origin}</div>
        <div class="recipe-desc">${r.desc}</div>
      </div>
      <div class="recipe-footer">
        <span class="recipe-tag">${r.tag}</span>
        <span class="recipe-difficulty">${r.diff}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ---------------------------------------------------------- */
/*  VIE QUOTIDIENNE                                           */
/* ---------------------------------------------------------- */
export function renderVie(fam) {
  const f = FAMILIES[fam];
  const container = document.getElementById('vieCards');
  const vieCount  = document.getElementById('vieCount');

  if (!container || !vieCount) return;

  container.innerHTML = '';
  vieCount.textContent =
    f.vie.length + ' expression' + (f.vie.length !== 1 ? 's' : '');

  const isAr = fam === 'takafa';

  f.vie.forEach(e => {
    const card = document.createElement('div');
    card.className = 'expr-card';
    card.innerHTML = `
      <div class="expr-situation">${e.sit}</div>
      <div class="expr-phrase ${isAr ? 'expr-phrase-ar' : ''}">${e.phrase}</div>
      <div class="expr-fr">${e.fr}</div>
      <div class="madras-band-thin" style="border-radius:4px;margin-bottom:10px;"></div>
      <div class="expr-note">${e.note}</div>
    `;
    container.appendChild(card);
  });
}

/* ---------------------------------------------------------- */
/*  ISO TABLE                                                 */
/* ---------------------------------------------------------- */
export function renderIsoTable(fam) {
  const tbody    = document.getElementById('isoTableBody');
  const isoCount = document.getElementById('isoCount');

  if (!tbody || !isoCount) return;

  tbody.innerHTML = '';
  let total = 0;
  Object.entries(FAMILIES).forEach(([key, f]) => {
    if (fam && key !== fam) return;
    f.creoles.forEach(c => {
      total++;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.iso}</td>
        <td class="bold">${c.name}</td>
        <td>${c.full}</td>
        <td data-fam="${key}" style="cursor:pointer;color:var(--primary)">${f.name}</td>
        <td>${f.base}</td>
      `;
      tbody.appendChild(tr);
    });
  });
  isoCount.textContent = total + ' codes';
}

/* ---------------------------------------------------------- */
/*  FOOTER ISO PILLS                                          */
/* ---------------------------------------------------------- */
export function buildFooterIsos() {
  const fam = getFam();
  const f   = FAMILIES[fam];
  const container = document.getElementById('footerIsoPills');
  if (!container) return;
  container.innerHTML = '';
  f.creoles.slice(0, 8).forEach(c => {
    const pill = document.createElement('span');
    pill.className   = 'footer-iso-pill';
    pill.textContent = c.iso;
    container.appendChild(pill);
  });
}

/* ---------------------------------------------------------- */
/*  UI LANG (onglets traduits)                                */
/* ---------------------------------------------------------- */
export function setUILangDOM(lang) {
  const labels = UI_LABELS[lang] || UI_LABELS['fr'];

  const tabLangue  = document.getElementById('tab-langue');
  const tabCuisine = document.getElementById('tab-cuisine');
  const tabVie     = document.getElementById('tab-vie');
  const tabIso     = document.getElementById('tab-iso');
  const heroChipLabel = document.getElementById('heroChipLabel');

  if (tabLangue)  tabLangue.textContent  = labels.langue;
  if (tabCuisine) tabCuisine.textContent = labels.cuisine;
  if (tabVie)     tabVie.textContent     = labels.vie;
  if (tabIso)     tabIso.textContent     = labels.iso;

  if (heroChipLabel) {
    const fam = getFam();
    const f   = FAMILIES[fam];
    const baseName = labels.bases[f.base] ?? f.base;
    heroChipLabel.textContent = labels.chipLabel + ' ' + baseName;
  }
}

/* ---------------------------------------------------------- */
/*  AUDIO                                                     */
/* ---------------------------------------------------------- */
export function togglePlay() {
  if (isPlaying()) { stopPlay(); return; }
  setPlaying(true);
  const playBtn = document.getElementById('playBtn');
  if (playBtn) playBtn.innerHTML =
    '<svg viewBox="0 0 16 16" fill="currentColor">' +
    '<rect x="3" y="2" width="3.5" height="12" rx="1"/>' +
    '<rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>';
  document.querySelectorAll('.wbar').forEach(b => b.classList.add('playing'));
  setPlayTimeout(setTimeout(stopPlay, 4000));
}

export function stopPlay() {
  setPlaying(false);
  clearTimeout(getPlayTimeout());
  setPlayTimeout(null);
  document.querySelectorAll('.wbar').forEach(b => b.classList.remove('playing'));
  const btn = document.getElementById('playBtn');
  if (btn) btn.innerHTML =
    '<svg viewBox="0 0 16 16" fill="currentColor"><polygon points="3,2 14,8 3,14"/></svg>';
}

/* ---------------------------------------------------------- */
/*  TOAST                                                     */
/* ---------------------------------------------------------- */
export function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(getToastTimeout());
  setToastTimeout(setTimeout(() => t.classList.remove('show'), 2200));
}