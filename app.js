/* ============================================================
   APP — point d'entrée
   ============================================================ */
import { getFam, getUILang } from './state.js';
import { bindEvents }        from './events.js';
import { renderFam, setUILangDOM, renderIsoTable, buildFooterIsos } from './render.js';

function init() {
  bindEvents();
  setUILangDOM(getUILang());
  renderFam(getFam());
  renderIsoTable();   // pré-remplit la table ISO (tous créoles)
  buildFooterIsos();
}

document.addEventListener('DOMContentLoaded', init);
