/* ==========================================================================
   Minimal DOM Helpers (Modern Vanilla JS)
   Zero dependencies
   ========================================================================== */

/* -------------------------
   Selection
------------------------- */

export const $ = (selector, scope = document) =>
  new DOMWrapper(scope.querySelector(selector));

export const $$ = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));


/* -------------------------
   DOM Ready
------------------------- */

export const ready = (fn) => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};


/* -------------------------
   Events
------------------------- */

export const on = (el, event, handler, options) =>
  el.addEventListener(event, handler, options);

export const off = (el, event, handler, options) =>
  el.removeEventListener(event, handler, options);

export const once = (el, event, handler) =>
  el.addEventListener(event, handler, { once: true });

export const delegate = (parent, selector, event, handler) => {
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

export const addClass = (el, ...classes) =>
  el.classList.add(...classes);

export const removeClass = (el, ...classes) =>
  el.classList.remove(...classes);

export const toggleClass = (el, className, force) =>
  el.classList.toggle(className, force);

export const hasClass = (el, className) =>
  el.classList.contains(className);


/* -------------------------
   Attributes & Data
------------------------- */

export const attr = (el, name, value) => {
  if (value === undefined) return el.getAttribute(name);
  el.setAttribute(name, value);
};

export const removeAttr = (el, name) =>
  el.removeAttribute(name);

export const data = (el, key, value) => {
  if (value === undefined) return el.dataset[key];
  el.dataset[key] = value;
};


/* -------------------------
   Styles
------------------------- */

export const css = (el, styles) =>
  Object.assign(el.style, styles);

export const getStyle = (el, prop) =>
  getComputedStyle(el)[prop];

export const show = (el) =>
  (el.style.display = '');

export const hide = (el) =>
  (el.style.display = 'none');


/* -------------------------
   Content
------------------------- */

export const html = (el, value) => {
  if (value === undefined) return el.innerHTML;
  el.innerHTML = value;
};

export const text = (el, value) => {
  if (value === undefined) return el.textContent;
  el.textContent = value;
};

export const empty = (el) =>
  el.replaceChildren();


/* -------------------------
   DOM Insertion
------------------------- */

export const append = (el, child) =>
  el.append(child);

export const prepend = (el, child) =>
  el.prepend(child);

export const remove = (el) =>
  el.remove();

export const create = (tag, options = {}) => {
  const el = document.createElement(tag);
  Object.assign(el, options);
  return el;
};


/* -------------------------
   Traversal
------------------------- */

export const parent = (el) =>
  el.parentElement;

export const children = (el) =>
  Array.from(el.children);

export const next = (el) =>
  el.nextElementSibling;

export const prev = (el) =>
  el.previousElementSibling;

export const closest = (el, selector) =>
  el.closest(selector);


/* -------------------------
   Forms
------------------------- */

export const serialize = (form) =>
  Object.fromEntries(new FormData(form).entries());


/* -------------------------
   Network (Fetch Wrapper)
------------------------- */

export const request = async (url, options = {}) => {
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

export class DOMWrapper {
  constructor(el) {
    this.el = el;
  }

  on(event, handler, options) {
    if (!this.el) return this;
    on(this.el, event, handler, options);
    return this;
  }

  off(event, handler, options) {
    if (!this.el) return this;
    off(this.el, event, handler, options);
    return this;
  }

  once(event, handler) {
    if (!this.el) return this;
    once(this.el, event, handler);
    return this;
  }

  delegate(selector, event, handler) {
    if (!this.el) return this;
    delegate(this.el, selector, event, handler);
    return this;
  }

  addClass(...classes) {
    if (!this.el) return this;
    addClass(this.el, ...classes);
    return this;
  }

  removeClass(...classes) {
    if (!this.el) return this;
    removeClass(this.el, ...classes);
    return this;
  }

  toggleClass(className, force) {
    if (!this.el) return this;
    toggleClass(this.el, className, force);
    return this;
  }

  hasClass(className) {
    if (!this.el) return false;
    return hasClass(this.el, className);
  }

  attr(name, value) {
    if (!this.el) return value === undefined ? undefined : this;
    if (value === undefined) return attr(this.el, name);
    attr(this.el, name, value);
    return this;
  }

  removeAttr(name) {
    if (!this.el) return this;
    removeAttr(this.el, name);
    return this;
  }

  data(key, value) {
    if (!this.el) return value === undefined ? undefined : this;
    if (value === undefined) return data(this.el, key);
    data(this.el, key, value);
    return this;
  }

  css(styles) {
    if (!this.el) return this;
    css(this.el, styles);
    return this;
  }

  getStyle(prop) {
    if (!this.el) return undefined;
    return getStyle(this.el, prop);
  }

  show() {
    if (!this.el) return this;
    show(this.el);
    return this;
  }

  hide() {
    if (!this.el) return this;
    hide(this.el);
    return this;
  }

  html(value) {
    if (!this.el) return value === undefined ? undefined : this;
    if (value === undefined) return html(this.el);
    html(this.el, value);
    return this;
  }

  text(value) {
    if (!this.el) return value === undefined ? undefined : this;
    if (value === undefined) return text(this.el);
    text(this.el, value);
    return this;
  }

  empty() {
    if (!this.el) return this;
    empty(this.el);
    return this;
  }

  append(child) {
    if (!this.el) return this;
    append(this.el, child);
    return this;
  }

  prepend(child) {
    if (!this.el) return this;
    prepend(this.el, child);
    return this;
  }

  remove() {
    if (!this.el) return this;
    remove(this.el);
    return this;
  }

  parent() {
    if (!this.el) return this;
    return new DOMWrapper(parent(this.el));
  }

  children() {
    if (!this.el) return [];
    return children(this.el);
  }

  next() {
    if (!this.el) return this;
    return new DOMWrapper(next(this.el));
  }

  prev() {
    if (!this.el) return this;
    return new DOMWrapper(prev(this.el));
  }

  closest(selector) {
    if (!this.el) return this;
    return new DOMWrapper(closest(this.el, selector));
  }
}
