/* ==========================================================================
   Minimal DOM Helpers (Modern Vanilla JS)
   Zero dependencies
   ========================================================================== */

/* -------------------------
   Selection
------------------------- */

export const $ = (selector, scope = document) =>
  scope.querySelector(selector);

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
