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
    new DOMWrapper(scope.querySelector(selector));

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
    unwrap(el).addEventListener(event, handler, options);

  global.off = (el, event, handler, options) =>
    unwrap(el).removeEventListener(event, handler, options);

  global.once = (el, event, handler) =>
    unwrap(el).addEventListener(event, handler, { once: true });

  global.delegate = (parent, selector, event, handler) => {
    parent = unwrap(parent);
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
    unwrap(el).classList.add(...classes);

  global.removeClass = (el, ...classes) =>
    unwrap(el).classList.remove(...classes);

  global.toggleClass = (el, className, force) =>
    unwrap(el).classList.toggle(className, force);

  global.hasClass = (el, className) =>
    unwrap(el).classList.contains(className);


  /* -------------------------
     Attributes & Data
  ------------------------- */

  global.attr = (el, name, value) => {
    el = unwrap(el);
    if (value === undefined) return el.getAttribute(name);
    el.setAttribute(name, value);
  };

  global.removeAttr = (el, name) =>
    unwrap(el).removeAttribute(name);

  global.data = (el, key, value) => {
    el = unwrap(el);
    if (value === undefined) return el.dataset[key];
    el.dataset[key] = value;
  };


  /* -------------------------
     Styles
  ------------------------- */

  global.css = (el, styles) =>
    Object.assign(unwrap(el).style, styles);

  global.getStyle = (el, prop) =>
    getComputedStyle(unwrap(el))[prop];

  global.show = (el) =>
    (unwrap(el).style.display = '');

  global.hide = (el) =>
    (unwrap(el).style.display = 'none');


  /* -------------------------
     Content
  ------------------------- */

  global.html = (el, value) => {
    el = unwrap(el);
    if (value === undefined) return el.innerHTML;
    el.innerHTML = value;
  };

  global.text = (el, value) => {
    el = unwrap(el);
    if (value === undefined) return el.textContent;
    el.textContent = value;
  };

  global.empty = (el) =>
    unwrap(el).replaceChildren();


  /* -------------------------
     DOM Insertion
  ------------------------- */

  global.append = (el, child) =>
    unwrap(el).append(unwrap(child));

  global.prepend = (el, child) =>
    unwrap(el).prepend(unwrap(child));

  global.remove = (el) =>
    unwrap(el).remove();

  global.create = (tag, options = {}) => {
    const el = document.createElement(tag);
    Object.assign(el, options);
    return el;
  };


  /* -------------------------
     Traversal
  ------------------------- */

  global.parent = (el) =>
    unwrap(el).parentElement;

  global.children = (el) =>
    Array.from(unwrap(el).children);

  global.next = (el) =>
    unwrap(el).nextElementSibling;

  global.prev = (el) =>
    unwrap(el).previousElementSibling;

  global.closest = (el, selector) =>
    unwrap(el).closest(selector);


  /* -------------------------
     Forms
  ------------------------- */

  global.serialize = (form) =>
    Object.fromEntries(new FormData(unwrap(form)).entries());


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


  /* -------------------------
     Chainable DOM Wrapper
  ------------------------- */

  const unwrap = (el) => (el instanceof DOMWrapper) ? el.el : el;

  class DOMWrapper {
    constructor(el) {
      this.el = el;
    }

    on(event, handler, options) {
      if (!this.el) return this;
      global.on(this.el, event, handler, options);
      return this;
    }

    off(event, handler, options) {
      if (!this.el) return this;
      global.off(this.el, event, handler, options);
      return this;
    }

    once(event, handler) {
      if (!this.el) return this;
      global.once(this.el, event, handler);
      return this;
    }

    delegate(selector, event, handler) {
      if (!this.el) return this;
      global.delegate(this.el, selector, event, handler);
      return this;
    }

    addClass(...classes) {
      if (!this.el) return this;
      global.addClass(this.el, ...classes);
      return this;
    }

    removeClass(...classes) {
      if (!this.el) return this;
      global.removeClass(this.el, ...classes);
      return this;
    }

    toggleClass(className, force) {
      if (!this.el) return this;
      global.toggleClass(this.el, className, force);
      return this;
    }

    hasClass(className) {
      if (!this.el) return false;
      return global.hasClass(this.el, className);
    }

    attr(name, value) {
      if (!this.el) return value === undefined ? undefined : this;
      if (value === undefined) return global.attr(this.el, name);
      global.attr(this.el, name, value);
      return this;
    }

    removeAttr(name) {
      if (!this.el) return this;
      global.removeAttr(this.el, name);
      return this;
    }

    data(key, value) {
      if (!this.el) return value === undefined ? undefined : this;
      if (value === undefined) return global.data(this.el, key);
      global.data(this.el, key, value);
      return this;
    }

    css(styles) {
      if (!this.el) return this;
      global.css(this.el, styles);
      return this;
    }

    getStyle(prop) {
      if (!this.el) return undefined;
      return global.getStyle(this.el, prop);
    }

    show() {
      if (!this.el) return this;
      global.show(this.el);
      return this;
    }

    hide() {
      if (!this.el) return this;
      global.hide(this.el);
      return this;
    }

    html(value) {
      if (!this.el) return value === undefined ? undefined : this;
      if (value === undefined) return global.html(this.el);
      global.html(this.el, value);
      return this;
    }

    text(value) {
      if (!this.el) return value === undefined ? undefined : this;
      if (value === undefined) return global.text(this.el);
      global.text(this.el, value);
      return this;
    }

    empty() {
      if (!this.el) return this;
      global.empty(this.el);
      return this;
    }

    append(child) {
      if (!this.el) return this;
      global.append(this.el, child);
      return this;
    }

    prepend(child) {
      if (!this.el) return this;
      global.prepend(this.el, child);
      return this;
    }

    remove() {
      if (!this.el) return this;
      global.remove(this.el);
      return this;
    }

    parent() {
      if (!this.el) return this;
      return new DOMWrapper(global.parent(this.el));
    }

    children() {
      if (!this.el) return [];
      return global.children(this.el);
    }

    next() {
      if (!this.el) return this;
      return new DOMWrapper(global.next(this.el));
    }

    prev() {
      if (!this.el) return this;
      return new DOMWrapper(global.prev(this.el));
    }

    closest(selector) {
      if (!this.el) return this;
      return new DOMWrapper(global.closest(this.el, selector));
    }
  }

}(window));
