/**
 * Navigation — Sticky header, smooth scroll, mobile menu, active section highlighting
 * Progressive enhancement: works without JS, enhanced with JS
 */

import { debounce, throttle, trapFocus, scrollToElement, announce, prefersReducedMotion } from './utils.js';

/**
 * Initialize all navigation functionality
 */
export function initNavigation() {
  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initActiveSectionHighlighting();
  initBackToTop();
}

/**
 * Sticky header with scroll shadow
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = throttle(() => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check
  handleScroll();
}

/**
 * Mobile menu drawer
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  const backdrop = document.querySelector('.nav-mobile-backdrop');

  if (!menuBtn || !mobileNav) return;

  let focusTrapCleanup = null;

  function openMenu() {
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Trap focus
    focusTrapCleanup = trapFocus(mobileNav);

    // Announce to screen readers
    announce('Menú de navegación abierto');
  }

  function closeMenu() {
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';

    // Cleanup focus trap
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }

    // Return focus to menu button
    menuBtn.focus();

    announce('Menú de navegación cerrado');
  }

  function toggleMenu() {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Button click
  menuBtn.addEventListener('click', toggleMenu);

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  backdrop?.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });

  // Handle resize - close if switching to desktop
  const mediaQuery = window.matchMedia('(min-width: 769px)');
  const handleResize = () => {
    if (mediaQuery.matches && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  };
  mediaQuery.addEventListener?.('change', handleResize);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  // Get all anchor links that point to IDs on the same page
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Update URL without scroll
        history.pushState(null, '', href);

        // Scroll with header offset
        scrollToElement(target);

        // Announce for screen readers
        const sectionTitle = target.querySelector('h1, h2, h3')?.textContent || 'Sección';
        announce(`Navegado a ${sectionTitle}`);
      }
    });
  });
}

/**
 * Active section highlighting in navigation
 * Uses IntersectionObserver for performance
 */
function initActiveSectionHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  // Create observer
  const observerOptions = {
    rootMargin: '-50% 0px -50% 0px', // Trigger at middle of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        updateActiveLink(id);
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => observer.observe(section));

  function updateActiveLink(activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Set initial active link based on scroll position
  const handleScroll = throttle(() => {
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section.id;
      }
    });
    if (currentSection) {
      updateActiveLink(currentSection);
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  const handleScroll = throttle(() => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, 200);

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
    announce('Volviendo al inicio');
  });

  // Initial check
  handleScroll();
}

/**
 * Keyboard navigation enhancement for header
 */
export function initHeaderKeyboardNav() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  header.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
      const menuBtn = document.querySelector('.mobile-menu-btn');
      const mobileNav = document.querySelector('.nav-mobile');
      if (mobileNav?.classList.contains('open')) {
        menuBtn?.click();
      }
    }
  });
}