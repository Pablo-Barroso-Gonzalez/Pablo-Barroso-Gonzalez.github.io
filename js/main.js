/**
 * Main Entry Point — Application initialization
 * Progressive enhancement: core functionality works without JS
 */

import { initNavigation, initHeaderKeyboardNav } from './navigation.js';
import { announce, prefersReducedMotion } from './utils.js';

/**
 * Initialize all JavaScript functionality
 */
function init() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeApp();
    });
  } else {
    initializeApp();
  }
}

/**
 * Core initialization
 */
function initializeApp() {
  // Initialize navigation
  initNavigation();
  initHeaderKeyboardNav();

  // Announce page load for screen readers
  announce('Página cargada completamente');

  // Initialize scroll animations if not reduced motion
  if (!prefersReducedMotion()) {
    initScrollAnimations();
  }

  // Initialize intersection observer for fade-in animations
  initFadeInObserver();

  console.log('🚀 Personal website initialized');
}

/**
 * Scroll-triggered animations (respects prefers-reduced-motion)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate;
        entry.target.classList.add(`animate-${animation}`);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Fade-in observer for sections
 */
function initFadeInObserver() {
  const sections = document.querySelectorAll('section:not(.hero)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));
}

/**
 * Handle theme changes (future-ready)
 */
function initThemeWatcher() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e) => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  };

  // Initial
  handleChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener?.('change', handleChange);
}

/**
 * Performance: Preload critical resources
 */
function preloadCriticalResources() {
  // Preload hero image if exists
  const heroImage = document.querySelector('.hero img[data-preload]');
  if (heroImage) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage.src;
    document.head.appendChild(link);
  }
}

/**
 * Error handling for development
 */
function initErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason);
  });
}

// Initialize everything
init();
initThemeWatcher();
preloadCriticalResources();
initErrorHandling();

// Export for potential testing
export { initializeApp };