# `CheckboxInput` component
Astronaut:
```javascript
CheckboxInput({mode: "primary", value: false}) ()
```

HTML:
```html
<input type="checkbox" checked aui-mode="primary">
```

An [`Input`](input.md) (derived) that can represent a checked or unchecked state.

For an input whose value is mutually exclusive from other inputs in the same group, a [`RadioButtonInput`](radiobuttoninput.md) should be used instead (other `RadioButtonInput`s in the same group will become unchecked when a `RadioButtonInput` is checked).

For an input that is designed to signify that its state is automatically applied when its state changes, a [`SwitchInput`](switchinput.md) should be used instead.

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `CheckboxInput` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `value` (default: `false`) | `checked` | The default value to be stored in the `CheckboxInput` when created. |