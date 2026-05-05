import { FAMILIES, UI_LABELS } from './data.js';
import { getFam, getTab, getUILang, getSelectedCreole, getSearchQuery, isPlaying, setPlaying, getPlayTimeout, setPlayTimeout, getToastTimeout, setToastTimeout } from './state.js';

function formatHeroBaseLabel(lang, baseLabel) {
  if (lang !== 'fr') return baseLabel;
  if (!baseLabel) return baseLabel;
  if (/^[aeiouhàâäéèêëîïôöùûü]/i.test(baseLabel)) return `d'${baseLabel}`;
  return baseLabel;
}

export function renderFam(fam) {
  const f = FAMILIES[fam]; if (!f) return;
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) { headerLogo.textContent = f.name; headerLogo.className = 'logo ' + (f.nameClass||''); }
  const heroEyebrow = document.getElementById('heroEyebrow');
  if (heroEyebrow) heroEyebrow.textContent = f.eyebrow;
  const ht = document.getElementById('heroTitle'); if (ht) { ht.textContent=f.title; ht.className='hero-title '+(f.titleClass||''); }
  const heroSub = document.getElementById('heroSub'); if (heroSub) heroSub.textContent=f.sub;
  const heroBtnPLabel = document.getElementById('heroBtnPLabel'); if (heroBtnPLabel) heroBtnPLabel.textContent=f.btnP;
  const heroBtnSLabel = document.getElementById('heroBtnSLabel'); if (heroBtnSLabel) heroBtnSLabel.textContent=f.btnS;
  const uiLang = getUILang();
  const _ui = UI_LABELS[uiLang]||UI_LABELS.fr;
  const heroChipLabel = document.getElementById('heroChipLabel');
  if (heroChipLabel) heroChipLabel.textContent = _ui.chipLabel+' '+formatHeroBaseLabel(uiLang, _ui.bases[f.base]??f.base);
  const audioLbl = document.getElementById('audioLbl'); if (audioLbl) audioLbl.textContent=f.audioLbl;
  const bannerTitle = document.getElementById('bannerTitle'); if (bannerTitle) bannerTitle.textContent=f.name;
  const bannerBaseline = document.getElementById('bannerBaseline'); if (bannerBaseline) bannerBaseline.textContent=f.baseline;
  const bannerDesc = document.getElementById('bannerDesc'); if (bannerDesc) bannerDesc.textContent=f.desc;
  const statCount = document.getElementById('statCount'); if (statCount) statCount.textContent=f.creoles.length;
  const statSpeakers = document.getElementById('statSpeakers'); if (statSpeakers) statSpeakers.textContent=f.speakers;
  const footerLogo = document.getElementById('footerLogo'); if (footerLogo) footerLogo.textContent=f.name;
  const footerTagline = document.getElementById('footerTagline'); if (footerTagline) footerTagline.textContent=f.footer+"\nAll the world's creoles, one platform.";
  const langSectionTitle = document.getElementById('langSectionTitle'); if (langSectionTitle) langSectionTitle.textContent=f.langSectionTitle;
  const cuisineSectionTitle = document.getElementById('cuisineSectionTitle'); if (cuisineSectionTitle) cuisineSectionTitle.textContent=f.cuisineSectionTitle;
  const vieSectionTitle = document.getElementById('vieSectionTitle'); if (vieSectionTitle) vieSectionTitle.textContent=f.vieSectionTitle;
  const musiqueSectionTitle = document.getElementById('musiqueSectionTitle'); if (musiqueSectionTitle) musiqueSectionTitle.textContent=f.musiqueSectionTitle;
  renderChips(fam); renderProgressStrip(fam); renderTab(getTab(), fam); buildFooterIsos();
}

export function renderChips(fam){ const f=FAMILIES[fam]; const sel=getSelectedCreole(); const c=document.getElementById('creoleChips'); if(!c)return; c.innerHTML=''; f.creoles.forEach((cr,idx)=>{ const d=document.createElement('div'); d.className='creole-chip'+(sel===String(idx)?' selected':''); d.textContent=cr.name; d.title=cr.full+' · '+cr.iso; d.dataset.iso=cr.iso; d.dataset.idx=String(idx); c.appendChild(d); }); }

export function renderProgressStrip(fam){ const f=FAMILIES[fam]; const s=document.getElementById('progressStrip'); if(!s)return; s.innerHTML=''; const lessons = Array.isArray(f.langue) ? f.langue : []; const t=Math.max(1, lessons.length); const d=Math.floor(t*0.33); for(let i=0;i<t;i++){ const cell=document.createElement('div'); cell.className='progress-cell'+(i<d?' done':''); s.appendChild(cell); } }

export function renderTab(tab,fam){ if(tab==='langue')renderLangue(fam); else if(tab==='cuisine')renderCuisine(fam); else if(tab==='vie')renderVie(fam); else if(tab==='musique')renderMusique(fam); }

export function renderLangue(fam){
  const f=FAMILIES[fam]; const sel=getSelectedCreole(); const q=getSearchQuery(); const lessons = Array.isArray(f.langue) ? f.langue : [];
  const selectedIso = sel !== null && f.creoles[+sel] ? f.creoles[+sel].iso : null;
  let items = selectedIso ? lessons.filter(l=>l.iso===selectedIso) : lessons;
  if(q) items=items.filter(l=>l.phrase.toLowerCase().includes(q)||l.fr.toLowerCase().includes(q)||l.tag.toLowerCase().includes(q));
  const cont=document.getElementById('langCards'); const cnt=document.getElementById('langCount');
  if(!cont||!cnt)return;
  cont.innerHTML=''; cnt.textContent=items.length+' lesson'+(items.length!==1?'s':'');
  const isAr=fam==='takafa';
  if(items.length===0){
    const name = selectedIso ? f.creoles.find(c=>c.iso===selectedIso)?.name||selectedIso : '';
    const available = f.creoles.filter((cr, idx, arr) => arr.findIndex(x => x.iso === cr.iso) === idx && lessons.some(l => l.iso === cr.iso)).map(cr => cr.name).join(', ');
    const msg = selectedIso ? `Contenu pour <strong>${name}</strong> bientôt disponible.<br><small>Leçons disponibles : ${available || 'aucune pour l\'instant'}.</small>` : 'Aucune leçon trouvée.';
    cont.innerHTML=`<p style="color:var(--text-3);font-size:14px;padding:24px 0;line-height:1.6">${msg}</p>`; return;
  }
  const listenLabel = (f.audioLbl||'').split(' ')[0] || '▶';
  items.forEach((l,i)=>{ const card=document.createElement('div'); card.className='lesson-card'; card.dataset.lessonIndex=String(i); card.innerHTML=`<div class="card-top"><span class="card-tag">${l.tag}</span><div class="card-phrase ${isAr?'card-phrase-ar':''}">${l.phrase}</div><div class="card-translation">${l.fr}</div></div><div class="madras-band-thin"></div><div class="card-bottom"><button class="btn-listen" data-listen-index="${i}"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><polygon points="3,2 14,8 3,14"/></svg> ${listenLabel}</button><span class="card-iso">${l.iso}</span></div>`; cont.appendChild(card); });
}

export function openLesson(idx){ const fam=getFam(); const f=FAMILIES[fam]; const lessons = Array.isArray(f.langue) ? f.langue : []; const sel=getSelectedCreole(); const selectedIso = sel !== null && f.creoles[+sel] ? f.creoles[+sel].iso : null; let items=selectedIso?lessons.filter(l=>l.iso===selectedIso):lessons; const l=items[idx]; if(!l)return; const dpPhrase=document.getElementById('dpPhrase'); if(dpPhrase){ dpPhrase.textContent=l.phrase; dpPhrase.className='detail-phrase'+(fam==='takafa'?' detail-phrase-ar':''); } const dpFr=document.getElementById('dpFr'); if(dpFr) dpFr.textContent=l.fr; const quizQ=document.getElementById('quizQ'); if(quizQ) quizQ.textContent=l.q; const opts=document.getElementById('quizOpts'); if(!opts)return; opts.innerHTML=''; l.opts.forEach((o,i)=>{ const b=document.createElement('button'); b.className='qopt'; b.textContent=o; b.onclick=()=>{opts.querySelectorAll('.qopt').forEach(x=>x.disabled=true); b.classList.add(i===l.ans?'correct':'wrong'); showToast(i===l.ans?'✓ Correct!':'✗ Réessaye');}; opts.appendChild(b);}); stopPlay(); const detailPanel=document.getElementById('detailPanel'); if(detailPanel) detailPanel.classList.add('open'); }
export function closeDetail(){ document.getElementById('detailPanel').classList.remove('open'); }

export function renderCuisine(fam){ const f=FAMILIES[fam]; const c=document.getElementById('cuisineCards'); const n=document.getElementById('cuisineCount'); if(!c||!n)return; const recipes = Array.isArray(f.cuisine) ? f.cuisine : []; c.innerHTML=''; n.textContent=recipes.length+' recipe'+(recipes.length!==1?'s':''); recipes.forEach(r=>{ const d=document.createElement('div'); d.className='recipe-card'; d.innerHTML=`<div class="recipe-color-band madras-band-thin"></div><div class="recipe-body"><div class="recipe-name">${r.name}</div><div class="recipe-origin">${r.origin}</div><div class="recipe-desc">${r.desc}</div></div><div class="recipe-footer"><span class="recipe-tag">${r.tag}</span><span class="recipe-difficulty">${r.diff}</span></div>`; c.appendChild(d); }); }

export function renderVie(fam){ const f=FAMILIES[fam]; const c=document.getElementById('vieCards'); const n=document.getElementById('vieCount'); if(!c||!n)return; const expressions = Array.isArray(f.vie) ? f.vie : []; c.innerHTML=''; n.textContent=expressions.length+' expression'+(expressions.length!==1?'s':''); const isAr=fam==='takafa'; expressions.forEach(e=>{ const d=document.createElement('div'); d.className='expr-card'; d.innerHTML=`<div class="expr-situation">${e.sit}</div><div class="expr-phrase ${isAr?'expr-phrase-ar':''}">${e.phrase}</div><div class="expr-fr">${e.fr}</div><div class="madras-band-thin" style="border-radius:4px;margin-bottom:10px;"></div><div class="expr-note">${e.note}</div>`; c.appendChild(d); }); }

export function renderMusique(fam){ const f=FAMILIES[fam]; const c=document.getElementById('musiqueCards'); const n=document.getElementById('musiqueCount'); if(!c||!n)return; const styles = Array.isArray(f.musique) ? f.musique : []; c.innerHTML=''; n.textContent=styles.length+' style'+(styles.length!==1?'s':''); styles.forEach(m=>{ const d=document.createElement('div'); d.className='recipe-card'; d.innerHTML=`<div class="recipe-color-band madras-band-thin"></div><div class="recipe-body"><div class="recipe-name">${m.name}</div><div class="recipe-origin">${m.origin}</div><div class="recipe-desc">${m.desc}</div></div><div class="recipe-footer"><span class="recipe-tag">${m.tag}</span><span class="recipe-difficulty">${m.diff}</span></div>`; c.appendChild(d); }); }

export function buildFooterIsos(){ const f=FAMILIES[getFam()]; const c=document.getElementById('footerIsoPills'); if(!c)return; c.innerHTML=''; (Array.isArray(f.creoles) ? f.creoles : []).slice(0,8).forEach(cr=>{ const s=document.createElement('span'); s.className='footer-iso-pill'; s.textContent=cr.iso; c.appendChild(s); }); }

export function setUILangDOM(lang){ const l=UI_LABELS[lang]||UI_LABELS.fr; const tabLangue=document.getElementById('tab-langue'); const tabCuisine=document.getElementById('tab-cuisine'); const tabVie=document.getElementById('tab-vie'); const tabMusique=document.getElementById('tab-musique'); if(tabLangue) tabLangue.textContent=l.langue; if(tabCuisine) tabCuisine.textContent=l.cuisine; if(tabVie) tabVie.textContent=l.vie; if(tabMusique) tabMusique.textContent=l.musique; const f=FAMILIES[getFam()]; const heroChipLabel=document.getElementById('heroChipLabel'); if(heroChipLabel) heroChipLabel.textContent=l.chipLabel+' '+formatHeroBaseLabel(lang, l.bases[f.base]??f.base); }

export function togglePlay(){ if(isPlaying()){stopPlay();return;} setPlaying(true); document.getElementById('playBtn').innerHTML='<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>'; document.querySelectorAll('.wbar').forEach(b=>b.classList.add('playing')); setPlayTimeout(setTimeout(stopPlay,4000)); }
export function stopPlay(){ setPlaying(false); clearTimeout(getPlayTimeout()); document.querySelectorAll('.wbar').forEach(b=>b.classList.remove('playing')); const b=document.getElementById('playBtn'); if(b)b.innerHTML='<svg viewBox="0 0 16 16" fill="currentColor"><polygon points="3,2 14,8 3,14"/></svg>'; }
export function showToast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(getToastTimeout()); setToastTimeout(setTimeout(()=>t.classList.remove('show'),2200)); }