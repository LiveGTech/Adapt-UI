# `Cards` component
Astronaut:
```javascript
Cards({mode: "primary"}) (
    Card() (),
    Card() (),
    Card() ()
)
```

HTML:
```html
<aui-cards aui-mode="primary"></aui-cards>
```

A container for [`Card`](card.md) components.

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `Cards` should be displayed. The value `"primary"` should be used to represent primary cards, `"secondary"` for secondary cards. |