# `TableRow` component
Astronaut:
```javascript
TableRow() (
    TableHeaderCell() (),
    TableHeaderCell() (),
    TableHeaderCell() ()
)
TableRow() (
    TableCell() (),
    TableCell() (),
    TableCell() ()
)
```

HTML:
```javascript
<tr>
    <th></th>
    <th></th>
    <th></th>
</tr>
<tr>
    <td></td>
    <td></td>
    <td></td>
</tr>
```

A container within a [`TableHeader`](reference/components/tableheader.md) or [`TableMain`](reference/components/tablemain.md) container to hold [`TableHeaderCell`s](reference/components/tableheadercell.md) or [`TableCell`s](reference/components/tablecell.md), respectively.