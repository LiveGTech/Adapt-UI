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

An [`IconButton`](reference/components/iconbutton.md) (derived) which describes a primary action on the current [`Screen`](reference/components/screen.md). `HeaderActionButton`s are intended for use as children inside [`Header`s](reference/components/header.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`alt` | `title` and `aria-label` | The accessible description string of the `HeaderActionButton`. |
| `icon` | `src` (inside `img`; must be full icon path) | The icon to use inside the `HeaderActionButton`. |
| `iconType` (default: `"light"`) | `aui-icon` (inside `img`; no default) | A string representing the icon's styling type to use. The value of `"light"` will display an icon in a light colour, `"dark"` in a dark colour, and `"light embedded"` and `"dark embedded"` in their respective colours with dark mode support (typically used outside of `Button`s). |

## Accessibility
The `alt` property must be used to provide an accessible description of the `HeaderActionButton`.