# `SwitchInput` component
Astronaut:
```javascript
SwitchInput({mode: "primary", value: false}) ()
```

HTML:
```html
<input type="checkbox" role="switch" checked aui-mode="primary">
```

An [`Input`](reference/components/input.md) (derived) that can represent a checked or unchecked state, and is designed to signify that its state is automatically applied when its state changes.

For an input that is designed to not signify that its state is automatically applied when its state changes, a [`CheckboxInput`](reference/components/checkboxinput.md) should be used instead.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `SwitchInput` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `value` (default: `false`) | `checked` | The default value to be stored in the `SwitchInput` when created. |