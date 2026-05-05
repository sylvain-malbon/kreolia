/* ============================================================
   STATE — store global centralisé
   ============================================================ */

let curFam          = "kilti";
let curTab          = "langue";
let curTheme        = "light";
let selectedCreole  = null;
let searchQuery     = "";
let playing         = false;
let playTimeout     = null;
let toastTimeout    = null;

// --- Getters ---
export const getFam           = () => curFam;
export const getTab           = () => curTab;
export const getTheme         = () => curTheme;
export const getSelectedCreole= () => selectedCreole;
export const getSearchQuery   = () => searchQuery;
export const isPlaying        = () => playing;
export const getPlayTimeout   = () => playTimeout;

// UI lang (valeur du <select>)
let uiLang = "fr";
export const getUILang = () => uiLang;

// --- Setters ---
export function setFam(fam)                     { curFam = fam; }
export function setTab(tab)                     { curTab = tab; }
export function setTheme(theme)                 { curTheme = theme; }
export function setSelectedCreole(iso)          { selectedCreole = iso; }
export function setSearchQuery(q)               { searchQuery = q; }
export function setUILang(lang)                 { uiLang = lang; }
export function setPlaying(val)                 { playing = val; }
export function setPlayTimeout(t)               { playTimeout = t; }
export function setToastTimeout(t)              { toastTimeout = t; }
export function getToastTimeout()               { return toastTimeout; }
