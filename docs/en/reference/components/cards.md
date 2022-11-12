# `Cards` component
Astronaut:
```javascript
Cards({mode}) (
    Card() (),
    Card() (),
    Card() ()
)
```

HTML:
```html
<aui-cards aui-mode="list"></aui-cards>
```

A container for [`Card`](reference/components/card.md) components.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `"list"`) | `aui-mode` | A string representing how the `Cards` should be displayed. The value `"list"` will display the `Card`s vertically, and `"grid"` will display them in a grid (but still vertically on mobile devices). |