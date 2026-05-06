// Fonctions utilitaires DOM
export function qs(sel, ctx=document) { return ctx.querySelector(sel); }
export function qsa(sel, ctx=document) { return Array.from(ctx.querySelectorAll(sel)); }
// ...autres helpers à ajouter