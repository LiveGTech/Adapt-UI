# `RadioButtonInput` component
Astronaut:
```javascript
RadioButtonInput({group, mode: "primary", value: false}) ()
```

HTML:
```html
<input type="radio" name="" checked aui-mode="primary">
```

An [`Input`](input.md) (derived) that can represent a checked or unchecked state, and whose value is mutually exclusive from other `RadioButtonInput`s in the same group (where the group name is denoted by the `group` property).

For an input whose value is not mutually exclusive from other inputs, a [`CheckboxInput`](checkboxinput.md) should be used instead (other `CheckboxInput`s in the same group will not become unchecked when a `CheckboxInput` is checked).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `group` | `name` | The name of the group of `RadioButtonInput`s that are to be mutually exclusive from each other. |
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `RadioButtonInput` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `value` (default: `false`) | `checked` | The default value to be stored in the `RadioButtonInput` when created. |