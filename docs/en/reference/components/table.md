# `Table` component
Astronaut:
```javascript
Table() (
    TableHeader() (
        TableRow() (
            TableHeaderCell() (),
            TableHeaderCell() (),
            TableHeaderCell() ()
        )
    ),
    TableMain() (
        TableRow() (
            TableCell() (),
            TableCell() (),
            TableCell() ()
        ),
        TableRow() (
            TableCell() (),
            TableCell() (),
            TableCell() ()
        ),
        TableRow() (
            TableCell() (),
            TableCell() (),
            TableCell() ()
        )
    )
)
```

HTML:
```html
<table>
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```

A table that can contain rows and columns of data.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `Table` should be displayed. The value `"truncate"` will truncate text in cells so that they do not occupy more than one line. |
