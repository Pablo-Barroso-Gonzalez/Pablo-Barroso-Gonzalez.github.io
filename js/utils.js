/**
 * Utilities — Small helper functions
 * No dependencies, tree-shakeable ES modules
 */

/**
 * Debounce function execution
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay = 200) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function execution
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(fn, limit = 200) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {Element} el - Element to check
 * @param {number} offset - Offset from viewport edge
 * @returns {boolean}
 */
export function isInViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
    rect.right >= offset
  );
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Selector or element
 * @param {number} offset - Offset from top
 */
export function scrollToElement(target, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix
 * @returns {string}
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Toggle class with optional force
 * @param {Element} el - Element
 * @param {string} className - Class name
 * @param {boolean} force - Force add/remove
 * @returns {boolean} Whether class is now present
 */
export function toggleClass(el, className, force) {
  if (!el) return false;
  return el.classList.toggle(className, force);
}

/**
 * Add class
 * @param {Element} el - Element
 * @param {string} className - Class name
 */
export function addClass(el, className) {
  if (!el) return;
  el.classList.add(className);
}

/**
 * Remove class
 * @param {Element} el - Element
 * @param {string} className - Class name
 */
export function removeClass(el, className) {
  if (!el) return;
  el.classList.remove(className);
}

/**
 * Check if element has class
 * @param {Element} el - Element
 * @param {string} className - Class name
 * @returns {boolean}
 */
export function hasClass(el, className) {
  if (!el) return false;
  return el.classList.contains(className);
}

/**
 * Trap focus within element (for modals/drawers)
 * @param {Element} container - Container element
 * @returns {Function} Cleanup function
 */
export function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTab(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  container.addEventListener('keydown', handleTab);
  firstElement?.focus();

  return () => container.removeEventListener('keydown', handleTab);
}

/**
 * Announce to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announce(message, priority = 'polite') {
  const liveRegion = document.getElementById('a11y-live-region') || createLiveRegion();
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.textContent = message;
}

function createLiveRegion() {
  const div = document.createElement('div');
  div.id = 'a11y-live-region';
  div.setAttribute('aria-live', 'polite');
  div.setAttribute('aria-atomic', 'true');
  div.className = 'sr-only';
  document.body.appendChild(div);
  return div;
}

/**
 * Parse HTML string to DOM nodes
 * @param {string} html - HTML string
 * @returns {DocumentFragment}
 */
export function parseHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

/**
 * Create element with attributes and children
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes object
 * @param {...(string|Node)} children - Child nodes or text
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class' && Array.isArray(value)) {
      el.classList.add(...value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => (el.dataset[k] = v));
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });
  return el;
}

/**
 * Get CSS custom property value
 * @param {string} property - CSS variable name (e.g., '--color-accent')
 * @param {Element} element - Element to read from (default: :root)
 * @returns {string}
 */
export function getCSSVar(property, element = document.documentElement) {
  return getComputedStyle(element).getPropertyValue(property).trim();
}

/**
 * Set CSS custom property
 * @param {string} property - CSS variable name
 * @param {string} value - Value to set
 * @param {Element} element - Element to set on (default: :root)
 */
export function setCSSVar(property, value, element = document.documentElement) {
  element.style.setProperty(property, value);
}

/**
 * Match media query
 * @param {string} query - Media query string
 * @returns {MediaQueryList}
 */
export function matchMedia(query) {
  return window.matchMedia(query);
}

/**
 * Check if reduced motion is preferred
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if dark mode is preferred
 * @returns {boolean}
 */
export function prefersDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDate(date, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Date(date).toLocaleDateString('es-ES', options);
}

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}