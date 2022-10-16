# `SelectionInput` component
Astronaut:
```javascript
SelectionInput({mode: "primary", value: null}) (
    SelectionInputOption() (),
    SelectionInputOption() (),
    SelectionInputOption() ()
)
```

HTML:
```html
<select></select>
```

An [`Input`](input.md) (derived) that can contain a selected option from a list of options. The `SelectionInput` should contain [`SelectionInputOption`s](selectioninputoption.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `SelectionInput` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `value` (default: `false`) | `checked` | The default value key to be selected in the `SelectionInput` when created. |