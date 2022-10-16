# `Icon` component
Astronaut:
```javascript
Image(icon, type) ()
Image({icon, type: "dark"}) ()
```

HTML:
```html
<img src="" aui-icon="dark" aria-hidden="true">
```

A graphical icon [`Image`](reference/components/image.md) (derived) that can be used as an alternative to text in [`Button`s](reference/components/button.md) (with [`IconButton`s](reference/components/iconbutton.md)).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `icon` | `src` (inside `img`; must be full icon path) | The icon to use inside the `IconButton`. |
| `type` | `aui-icon` | A string representing the styling type to use. The value of `"light"` will display an icon in a light colour, `"dark"` in a dark colour, and `"light embedded"` and `"dark embedded"` in their respective colours with dark mode support (used outside of `Button`s). |