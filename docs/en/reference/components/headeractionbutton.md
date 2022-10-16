# `HeaderActionButton` component
Astronaut:
```javascript
HeaderActionButton({icon, alt}) ()
```

HTML:
```html
<button title="" aria-label="" aui-mode="action">
    <img src="" aui-icon="light" aria-hidden="true">
</button>
```

An [`IconButton`](iconbutton.md) (derived) which describes a primary action on the current [`Screen`](screen.md). `HeaderActionButton`s are intended for use as children inside [`Header`s](header.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`alt` | `title` and `aria-label` | The accessible description string of the `HeaderActionButton`. |
| `icon` | `src` (inside `img`; must be full icon path) | The icon to use inside the `HeaderActionButton`. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `HeaderActionButton`.