# `NumericalInput` component
Astronaut:
```javascript
NumericalInput({placeholder: "", mode: "primary", min: null, max: null, step: 1, value: ""}) ()
```

HTML:
```html
<input type="number" placeholder="" min="" max="" step="1" value="" aui-mode="primary">
```

An [`Input`](reference/components/input.md) (derived) that contains numerical data that is input by the user.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `placeholder` (default: `""`) | `placeholder` | The text to be shown if the `NumericalInput` is empty, used as a general guide as to what data should be entered. |
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `NumericalInput` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `min` (default: `""`) | `min` | The minimum value allowed in the `NumericalInput`. |
| `max` (default: `""`) | `max` | The maximum value allowed in the `NumericalInput`. |
| `step` (default: `""`) | `step` | How much the value should increase/decrease by when being changed. |
| `value` (default: `""`) | `value` | The default value to be stored in the `NumericalInput` when created. |