# noQuery
Modern helper functions for those who miss the convenience of jQuery

## Usage

### ES Module (recommended)

Import individual helpers in a module-based project:

```js
import { $, $$, on, ready } from './helpers.js';
```

### Browser Global (IIFE)

Include `helpers.iife.js` directly in your HTML — no build step required.
All helpers are attached to `window` and available as globals:

```html
<script src="helpers.iife.js"></script>
<script>
  ready(() => {
    const btn = $('#my-button');
    on(btn, 'click', () => console.log('clicked'));
  });
</script>
```

## Helpers

| Helper | Description |
|---|---|
| `$(selector, scope?)` | `querySelector` shorthand |
| `$$(selector, scope?)` | `querySelectorAll` → Array |
| `ready(fn)` | Run `fn` when the DOM is ready |
| `on(el, event, handler, options?)` | Add event listener |
| `off(el, event, handler, options?)` | Remove event listener |
| `once(el, event, handler)` | Add one-time event listener |
| `delegate(parent, selector, event, handler)` | Event delegation |
| `addClass(el, ...classes)` | Add class(es) |
| `removeClass(el, ...classes)` | Remove class(es) |
| `toggleClass(el, className, force?)` | Toggle a class |
| `hasClass(el, className)` | Check for a class |
| `attr(el, name, value?)` | Get/set an attribute |
| `removeAttr(el, name)` | Remove an attribute |
| `data(el, key, value?)` | Get/set a data attribute |
| `css(el, styles)` | Apply inline styles |
| `getStyle(el, prop)` | Get computed style |
| `show(el)` | Remove `display:none` |
| `hide(el)` | Set `display:none` |
| `html(el, value?)` | Get/set `innerHTML` |
| `text(el, value?)` | Get/set `textContent` |
| `empty(el)` | Remove all child nodes |
| `append(el, child)` | Append child |
| `prepend(el, child)` | Prepend child |
| `remove(el)` | Remove element from DOM |
| `create(tag, options?)` | Create a DOM element |
| `parent(el)` | Parent element |
| `children(el)` | Children → Array |
| `next(el)` | Next sibling element |
| `prev(el)` | Previous sibling element |
| `closest(el, selector)` | Closest ancestor matching selector |
| `serialize(form)` | Serialize form to plain object |
| `request(url, options?)` | Fetch wrapper (returns parsed JSON or text) |
