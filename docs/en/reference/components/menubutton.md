# `MenuButton` component
Astronaut:
```javascript
MenuButton({mode: null, submenu: null}) ()
```

HTML:
```html
<button aui-mode="" aui-submenu=""></button>
```

A button that is intended for use as a child inside [`Menu`s](reference/components/menu.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `MenuButtonButton` should behave. A value containing `"persist"` will keep the `MenuButton`'s parent `Menu` open when pressed. A value containing `"pressToShowSubmenu"` will require the `MenuButton` to be pressed to show its submenu. A value containing `"noSubmenuHint"` will prevent the submenu hint icon from showing on the `MenuButton` in the case that the `MenuButton` has a `submenu` value. |
| `submenu` (default: `null`) | `aui-submenu` (`Menu` element's selector instead of Astronaut component) | The Astronaut component representing the submenu (`Menu` element) to show when pressed or hovered over, if present. No submenu will be shown if `null`. |