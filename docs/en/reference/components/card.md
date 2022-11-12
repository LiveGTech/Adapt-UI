# `Card` component
Astronaut:
```javascript
Card({linked: false}) ()
```

HTML:
```html
<aui-card aui-linked></aui-card>
```

A container with a distinct style to visually separate information from other `Card`s and non-`Card` content. If multiple `Card`s are used, they should be inside a [`Cards` component](cards.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `linked` (default: `false`) | `aui-linked` | Whether the whole card should be pressable to activate a link inside of it. |