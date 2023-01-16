# `Menu` component
Astronaut:
```javascript
Menu({mode: null}) (
    MenuButton() (),
    MenuButton() (),
    MenuButton() ()
)
```

HTML:
```html
<aui-menu aui-mode=""></aui-menu>
```

A menu that can be opened as a result of pressing a button or right-clicking (in this case, known as a _context menu_), and can overlay over [`Screen`s](reference/components/screen.md). It can contain [`MenuButton`s](reference/components/menubutton.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `Menu` should behave. A value containing `"centred"` will centre the `Menu` visually when opened instead of being visually close by to the previously-pressed element. A value containing `"blur"` will blur the backdrop behind the `Menu` in a similar way to when [`Dialog`s](reference/components/dialog.md) are opened to make the `Menu` visually distinct from the rest of the UI. A value containing `"persistHover"` will keep the `Menu` open if it is a submenu and another `MenuButton` of the parent `Menu` is hovered. A value containing `"openSide"` will open the menu to the side of the opener element as opposed to aligned (this is the behaviour for submenus, but can be reverted by using `"openAlign"`). |