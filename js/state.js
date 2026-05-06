/* ============================================================
   STATE — store global centralisé
   ============================================================ */

let curFam         = "kilti";
let curTab         = "langue";      // langue | culture | apropos | communaute
let curCultureTab  = "voyage";      // voyage | cuisine | musique
let curTheme       = "light";
let selectedCreole = null;          // index string "0","1",... ou null
let searchQuery    = "";
let playing        = false;
let playTimeout    = null;
let toastTimeout   = null;
let uiLang         = "fr";

// --- Getters ---
export const getFam            = () => curFam;
export const getTab            = () => curTab;
export const getCultureTab     = () => curCultureTab;
export const getTheme          = () => curTheme;
export const getSelectedCreole = () => selectedCreole;
export const getSearchQuery    = () => searchQuery;
export const isPlaying         = () => playing;
export const getPlayTimeout    = () => playTimeout;
export const getToastTimeout   = () => toastTimeout;
export const getUILang         = () => uiLang;

// --- Setters ---
export function setFam(fam)              { curFam = fam; }
export function setTab(tab)              { curTab = tab; }
export function setCultureTab(tab)       { curCultureTab = tab; }
export function setTheme(theme)          { curTheme = theme; }
export function setSelectedCreole(value) { selectedCreole = value; }
export function setSearchQuery(q)        { searchQuery = q; }
export function setUILang(lang)          { uiLang = lang; }
export function setPlaying(val)          { playing = val; }
export function setPlayTimeout(t)        { playTimeout = t; }
export function setToastTimeout(t)       { toastTimeout = t; }
