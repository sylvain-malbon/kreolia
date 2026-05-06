/* ============================================================
   APP — point d'entrée
   ============================================================ */
import { getFam, getUILang } from './state.js';
import { bindEvents }        from './events.js';
import { renderFam, setUILangDOM } from './render.js';
import { bindAuthModal, updateAuthUI } from './auth.js';

function initHeroCarousel() {
  const image = document.getElementById('heroCarouselImage');
  const bars = Array.from(document.querySelectorAll('.hero-carousel-bar'));
  if (!image) return;

  const slides = [
    'assets/images/hero-visual.jpg',
    'assets/images/hero-visual-2.jpg',
    'assets/images/hero-visual-3.jpg'
  ];

  let currentIndex = 0;
  let fadeTimer = null;

  const updateIndicators = (index) => {
    const progressCells = Array.from(document.querySelectorAll('#progressStrip .progress-cell'));
    if (progressCells.length > 0) {
      const cellIndex = index % progressCells.length;
      progressCells.forEach((cell, i) => cell.classList.toggle('active', i === cellIndex));
    }

    if (bars.length === slides.length) {
      bars.forEach((bar, i) => bar.classList.toggle('active', i === index));
    }
  };

  const setSlide = (index, immediate = false) => {
    const nextIndex = (index + slides.length) % slides.length;
    updateIndicators(nextIndex);

    clearTimeout(fadeTimer);
    if (immediate) {
      currentIndex = nextIndex;
      image.classList.remove('is-fading');
      image.src = slides[currentIndex];
      image.alt = `Hero Visual ${currentIndex + 1}`;
      return;
    }

    image.classList.add('is-fading');
    fadeTimer = setTimeout(() => {
      currentIndex = nextIndex;
      image.src = slides[currentIndex];
      image.alt = `Hero Visual ${currentIndex + 1}`;
      image.classList.remove('is-fading');
    }, 220);
  };

  setSlide(0, true);
  setInterval(() => setSlide(currentIndex + 1), 4500);
}

function init() {
  bindEvents();
  bindAuthModal();       // initialise la modale d'auth
  updateAuthUI();        // restaure la session si existante
  setUILangDOM(getUILang());
  renderFam(getFam());
  initHeroCarousel();
}

document.addEventListener('DOMContentLoaded', init);