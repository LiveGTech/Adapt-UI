# `HeaderPageMenuButton` component
Astronaut:
```javascript
HeaderPageMenuButton({icon: "menu", alt}) ()
```

HTML:
```html
<button title="" aria-label="" aui-bind="aside">
    <img src="" aui-icon="light" aria-hidden="true">
</button>
```

An [`IconButton`](reference/components/iconbutton.md) (derived) which will open a [`PageMenu`](reference/components/pagemenu.md) inside the parent [`Screen`](reference/components/screen.md) on mobile devices. `HeaderPageMenuButton`s are intended for use as children inside [`Header`s](reference/components/header.md). The `HeaderPageMenuButton` is hidden on desktop devices.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`alt` | `title` and `aria-label` | The accessible description string of the `HeaderPageMenuButton`. An example of an appropriate description would be `"Open menu"`. |
| `icon` (default: `"menu"`) | `src` (inside `img`; must be full icon path) | The icon to use inside the `HeaderPageMenuButton`. |
| `iconType` (default: `"light"`) | `aui-icon` (inside `img`; no default) | A string representing the icon's styling type to use. The value of `"light"` will display an icon in a light colour, `"dark"` in a dark colour, and `"light embedded"` and `"dark embedded"` in their respective colours with dark mode support (typically used outside of `Button`s). |

## Accessibility
The `alt` property must be used to provide an accessible description of the `HeaderPageMenuButton`.