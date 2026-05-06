/* ============================================================
   AUTH — inscription / connexion (stockage localStorage)
   ============================================================ */

const USERS_KEY   = 'kreolia_users';
const SESSION_KEY = 'kreolia_session';

// --- Helpers localStorage ---
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function hashSimple(str) {
  // Hash basique côté client (non cryptographique — suffisant pour démo)
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

// --- Session ---
export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
}
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, pseudo: user.pseudo }));
}
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  updateAuthUI();
}

// --- Inscription ---
export function register(pseudo, email, password) {
  if (!pseudo || !email || !password) return { ok: false, msg: 'Tous les champs sont requis.' };
  if (password.length < 6) return { ok: false, msg: 'Mot de passe trop court (min. 6 car.).' };
  const users = getUsers();
  if (users[email]) return { ok: false, msg: 'Cet e-mail est déjà utilisé.' };
  users[email] = { pseudo, email, hash: hashSimple(password) };
  saveUsers(users);
  saveSession(users[email]);
  updateAuthUI();
  return { ok: true };
}

// --- Connexion ---
export function login(email, password) {
  if (!email || !password) return { ok: false, msg: 'E-mail et mot de passe requis.' };
  const users = getUsers();
  const user = users[email];
  if (!user) return { ok: false, msg: 'Compte introuvable.' };
  if (user.hash !== hashSimple(password)) return { ok: false, msg: 'Mot de passe incorrect.' };
  saveSession(user);
  updateAuthUI();
  return { ok: true };
}

// --- Mise à jour de l'UI selon session ---
export function updateAuthUI() {
  const session = getSession();
  const btnAuth   = document.getElementById('authBtn');
  const btnLogout = document.getElementById('logoutBtn');
  const userChip  = document.getElementById('userChip');

  if (session) {
    if (btnAuth)   btnAuth.style.display   = 'none';
    if (btnLogout) btnLogout.style.display = 'inline-flex';
    if (userChip)  { userChip.style.display = 'inline-flex'; userChip.textContent = session.pseudo; }
  } else {
    if (btnAuth)   btnAuth.style.display   = 'inline-flex';
    if (btnLogout) btnLogout.style.display = 'none';
    if (userChip)  userChip.style.display  = 'none';
  }
}

// ============================================================
//  MODALE
// ============================================================
export function openAuthModal(tab = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  switchAuthTab(tab);
  modal.classList.add('open');
  setTimeout(() => {
    const first = modal.querySelector('input');
    if (first) first.focus();
  }, 80);
}

export function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
  clearAuthErrors();
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.authTab === tab)
  );
  document.querySelectorAll('.auth-pane').forEach(p =>
    p.classList.toggle('active', p.dataset.authPane === tab)
  );
}

function clearAuthErrors() {
  document.querySelectorAll('.auth-error').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
}

function showAuthError(paneId, msg) {
  const el = document.querySelector(`[data-auth-pane="${paneId}"] .auth-error`);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

// --- Binding interne de la modale ---
export function bindAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;

  // Fermeture overlay
  modal.addEventListener('click', e => { if (e.target === modal) closeAuthModal(); });

  // Bouton fermer
  const closeBtn = document.getElementById('authModalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);

  // Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAuthModal(); });

  // Onglets
  modal.querySelectorAll('.auth-tab-btn').forEach(btn =>
    btn.addEventListener('click', () => { clearAuthErrors(); switchAuthTab(btn.dataset.authTab); })
  );

  // --- Formulaire login ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearAuthErrors();
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const res = login(email, password);
    if (res.ok) {
      closeAuthModal();
      showToastAuth('👋 Bienvenue, ' + getSession().pseudo + ' !');
    } else {
      showAuthError('login', res.msg);
    }
  });

  // --- Formulaire inscription ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', e => {
    e.preventDefault();
    clearAuthErrors();
    const pseudo   = document.getElementById('registerPseudo').value.trim();
    const email    = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const res = register(pseudo, email, password);
    if (res.ok) {
      closeAuthModal();
      showToastAuth('🎉 Compte créé ! Bienvenue, ' + pseudo + ' !');
    } else {
      showAuthError('register', res.msg);
    }
  });

  // --- Liens de basculement entre panneaux ---
  document.querySelectorAll('[data-switch-auth]').forEach(link =>
    link.addEventListener('click', e => { e.preventDefault(); clearAuthErrors(); switchAuthTab(link.dataset.switchAuth); })
  );
}

function showToastAuth(msg) {
  // Réutilise le toast existant de l'app
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
