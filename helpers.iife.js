/* ==========================================================================
   Minimal DOM Helpers (Modern Vanilla JS)
   Zero dependencies — Browser Global (IIFE) version
   Include with: <script src="helpers.iife.js"></script>
   ========================================================================== */

(function (global) {

  /* -------------------------
     Selection
  ------------------------- */

  global.$ = (selector, scope = document) =>
    scope.querySelector(selector);

  global.$$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));


  /* -------------------------
     DOM Ready
  ------------------------- */

  global.ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };


  /* -------------------------
     Events
  ------------------------- */

  global.on = (el, event, handler, options) =>
    el.addEventListener(event, handler, options);

  global.off = (el, event, handler, options) =>
    el.removeEventListener(event, handler, options);

  global.once = (el, event, handler) =>
    el.addEventListener(event, handler, { once: true });

  global.delegate = (parent, selector, event, handler) => {
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target && parent.contains(target)) {
        handler.call(target, e);
      }
    });
  };


  /* -------------------------
     Classes
  ------------------------- */

  global.addClass = (el, ...classes) =>
    el.classList.add(...classes);

  global.removeClass = (el, ...classes) =>
    el.classList.remove(...classes);

  global.toggleClass = (el, className, force) =>
    el.classList.toggle(className, force);

  global.hasClass = (el, className) =>
    el.classList.contains(className);


  /* -------------------------
     Attributes & Data
  ------------------------- */

  global.attr = (el, name, value) => {
    if (value === undefined) return el.getAttribute(name);
    el.setAttribute(name, value);
  };

  global.removeAttr = (el, name) =>
    el.removeAttribute(name);

  global.data = (el, key, value) => {
    if (value === undefined) return el.dataset[key];
    el.dataset[key] = value;
  };


  /* -------------------------
     Styles
  ------------------------- */

  global.css = (el, styles) =>
    Object.assign(el.style, styles);

  global.getStyle = (el, prop) =>
    getComputedStyle(el)[prop];

  global.show = (el) =>
    (el.style.display = '');

  global.hide = (el) =>
    (el.style.display = 'none');


  /* -------------------------
     Content
  ------------------------- */

  global.html = (el, value) => {
    if (value === undefined) return el.innerHTML;
    el.innerHTML = value;
  };

  global.text = (el, value) => {
    if (value === undefined) return el.textContent;
    el.textContent = value;
  };

  global.empty = (el) =>
    el.replaceChildren();


  /* -------------------------
     DOM Insertion
  ------------------------- */

  global.append = (el, child) =>
    el.append(child);

  global.prepend = (el, child) =>
    el.prepend(child);

  global.remove = (el) =>
    el.remove();

  global.create = (tag, options = {}) => {
    const el = document.createElement(tag);
    Object.assign(el, options);
    return el;
  };


  /* -------------------------
     Traversal
  ------------------------- */

  global.parent = (el) =>
    el.parentElement;

  global.children = (el) =>
    Array.from(el.children);

  global.next = (el) =>
    el.nextElementSibling;

  global.prev = (el) =>
    el.previousElementSibling;

  global.closest = (el, selector) =>
    el.closest(selector);


  /* -------------------------
     Forms
  ------------------------- */

  global.serialize = (form) =>
    Object.fromEntries(new FormData(form).entries());


  /* -------------------------
     Network (Fetch Wrapper)
  ------------------------- */

  global.request = async (url, options = {}) => {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return res.json();
    }

    return res.text();
  };

}(window));
