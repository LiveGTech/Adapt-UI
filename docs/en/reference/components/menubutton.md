# `MenuButton` component
Astronaut:
```javascript
MenuButton({mode: null, submenu: null, isCheckable: false, isChecked: false}) ()
```

HTML:
```html
<button aui-mode="" aui-submenu=""></button>
```

A [`Button`](reference/components/button.md) that is intended for use as a child inside [`Menu`s](reference/components/menu.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `MenuButton` should be displayed and how it should behave. A value containing `"persist"` will keep the `MenuButton`'s parent `Menu` open when pressed. A value containing `"pressToShowSubmenu"` will require the `MenuButton` to be pressed to show its submenu. A value containing `"noSubmenuHint"` will prevent the submenu hint icon from showing on the `MenuButton` in the case that the `MenuButton` has a `submenu` value. A value containing `"icon"` will allow the `MenuButton` to optionally contain an [`Icon`](reference/components/icon.md) (see [`IconMenuButton`](reference/components/iconmenubutton.md)). |
| `submenu` (default: `null`) | `aui-submenu` (`Menu` element's selector instead of Astronaut component) | The Astronaut component representing the submenu (`Menu` element) to show when pressed or hovered over, if present. No submenu will be shown if `null`. |
| `isCheckable` (default: `false`) | `aui-role="checkbox"` | Whether the `MenuButton` is intended to have a checked or unchecked state or not. |
| `isChecked` (default: `false`) | `aui-checked` | Whether the `MenuButton` is showing a checked state or not. |