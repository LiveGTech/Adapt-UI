# `TableCell` component
Astronaut:
```javascript
TableCell() ()
```

HTML:
```javascript
<th></th>
```

A cell within a [`TableRow`](reference/components/tablerow.md) that is a child of a [`TableMain`](reference/components/tablemain.md) container.

## Accessibility
This component should not be used for table headers (so should not be a descendant of a [`TableHeader`](reference/components/tableheader.md) container) — for this, [`TableHeaderCell`](reference/components/tableheadercell.md) should be used instead.