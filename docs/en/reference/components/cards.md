# `Cards` component
Astronaut:
```javascript
Cards({mode: "list"}) (
    Card() (),
    Card() (),
    Card() ()
)
```

HTML:
```html
<aui-cards aui-mode="list">
    <aui-card></aui-card>
    <aui-card></aui-card>
    <aui-card></aui-card>
</aui-cards>
```

A container for [`Card`](reference/components/card.md) components.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `"list"`) | `aui-mode` | A string representing how the `Cards` should be displayed. The value `"list"` will display the `Card`s vertically, and `"grid"` will display them in a grid (but still vertically on mobile devices). |