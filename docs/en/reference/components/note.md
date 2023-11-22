# `Note` component
Astronaut:
```javascript
Note({mode: "primary"}) ()
```

HTML:
```html
<blockquote aui-mode="primary"></blockquote>
```

A container with a distinct style to visually denote contained information as a note, warning or quotation.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`mode` (default: `"primary"`) | `aui-mode` | A string representing how the `Note` should be displayed. The value `"primary"` should be used to represent primary `Note`s, `"secondary"` for secondary `Note`s, and `"dangerous"` for `Notes`s that represent an error state or contain information on something that users should avoid doing. |