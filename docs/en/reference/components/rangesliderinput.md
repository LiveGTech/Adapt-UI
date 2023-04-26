# `RangeSliderInput` component
Astronaut:
```javascript
RangeSliderInput({mode: "primary", min: null, max: null, step: 1, value: ""}) ()
```

HTML:
```html
<input type="range" aui-mode="primary" min="" max="" step="1" value="">
```

An [`Input`](reference/components/input.md) (derived) that contains numerical data that is input by the user, represented as a sliding range scale.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `RangeSliderInput` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `min` (default: `""`) | `min` | The minimum value allowed in the `RangeSliderInput`. |
| `max` (default: `""`) | `max` | The maximum value allowed in the `RangeSliderInput`. |
| `step` (default: `""`) | `step` | How much the value should increase/decrease by when being changed. |
| `value` (default: `""`) | `value` | The default value to be stored in the `RangeSliderInput` when created. |