# `Button` component
Astronaut:
```javascript
Button({mode: "primary"}) ()
```

HTML:
```html
<button></button>
```

A button that can perform an action when pressed.

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
|`mode` (default: `"primary"`) | `aui-mode` | A string representing how the `Button` should be displayed and what type of action it represents. The value `"primary"` should be used to represent primary buttons, `"secondary"` for secondary buttons, and `"dangerous"` for buttons that, when pressed, can have potentially dangerous or undesirable consequences. |