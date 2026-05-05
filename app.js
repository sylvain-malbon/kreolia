/* ============================================================
   APP — point d'entrée
   ============================================================ */
import { getFam, getUILang } from './state.js';
import { bindEvents }        from './events.js';
import { renderFam, setUILangDOM } from './render.js';

function initHeroCarousel() {
  const image = document.getElementById('heroCarouselImage');
  const bars = Array.from(document.querySelectorAll('.hero-carousel-bar'));
  if (!image) return;

  const slides = ['hero-visual.jpg', 'hero-visual-2.jpg', 'hero-visual-3.jpg'];

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
  setUILangDOM(getUILang()); // traduit les onglets selon langue UI
  renderFam(getFam());       // charge kilti par défaut (inclut buildFooterIsos)
  initHeroCarousel();
}

document.addEventListener('DOMContentLoaded', init);