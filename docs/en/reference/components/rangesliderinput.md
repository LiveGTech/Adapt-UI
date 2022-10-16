# `RangeSliderInput` component
Astronaut:
```javascript
RangeSliderInput({min: null, max: null, step: 1, value: ""}) ()
```

HTML:
```html
<input type="range" min="" max="" step="1" value="">
```

An [`Input`](input.md) (derived) that contains numerical data that is input by the user, represented as a sliding range scale.

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
| `min` (default: `""`) | `min` | The minimum value allowed in the `RangeSliderInput`. |
| `max` (default: `""`) | `max` | The maximum value allowed in the `RangeSliderInput`. |
| `step` (default: `""`) | `step` | How much the value should increase/decrease by when being changed. |
| `value` (default: `""`) | `value` | The default value to be stored in the `RangeSliderInput` when created. |