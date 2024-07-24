# `TableHeaderCell` component
Astronaut:
```javascript
TableHeaderCell() ()
```

HTML:
```html
<th></th>
```

A cell within a [`TableRow`](reference/components/tablerow.md) that is a child of a [`TableHeader`](reference/components/tableheader.md) container.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `TableHeaderCell` should behave. When the value `"resize"` is used, a handle will be added to the end of the `TableHeaderCell` which can be dragged horizontally to resize the column. Resizing the column will also affect the size of the next sibling column. |