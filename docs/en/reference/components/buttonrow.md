# `ButtonRow` component
Astronaut:
```javascript
ButtonRow({mode: "start"}) ()
```

HTML:
```html
<aui-buttons aui-mode="start"></aui-buttons>
```

A container for multiple [`Button`s](reference/components/button.md) to be shown in a row.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`mode` (default: `"start"`) | `aui-mode` | A string representing how the `Button`s should be aligned and ordered. `"start"` displays the `Button`s with left alignment, and `"end"` displays them with right alignment, and in a reverse order. The opposite behaviours occur when there is a right-to-left text direction. |