# `Card` component
Astronaut:
```javascript
Card() ()
```

HTML:
```html
<aui-card aui-mode aui-linked></aui-card>
```

A container with a distinct style to visually separate information from other `Card`s and non-`Card` content. If multiple `Card`s are used, they should be inside a [`Cards` component](reference/components/cards.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `Card` should be behave. The value `"keepUnlinked"` will prevent the `Card` from automatically acting as a large, pressable area that activates the first [`Link`](reference/components/link.md) when pressed. |