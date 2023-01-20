# `IconMenuButton` component
Astronaut:
```javascript
IconMenuButton(icon) ()
IconMenuButton({icon: null}) ()
```

HTML:
```html
<button aui-mode="icon">
    <img src="" aui-icon="dark embedded" aria-hidden="true">
</button>
```

A [`MenuButton`](reference/components/menubutton.md) can optionally hold an [`Icon`](reference/components/icon.md) that is shown before the `IconMenuButton`'s textual content.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `icon` | `src` (inside `img`; must be full icon path) | The icon to use inside the `IconMenuButton`. |