# `ProgressIndicator` component
Astronaut:
```javascript
ProgressIndicator({max: null value: 0}) ()
```

HTML:
```html
<input type="range" min="" max="" step="1" value="">
```

An indicator that shows the user the current progress of a task that is being processed or loaded.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `max` (default: `1`) | `max` | The divisor/value when at 100% of the `ProgressIndicator`. |
| `value` (default: `0`) | `value` | The dividend value to be stored in the `ProgressIndicator` when created. A value of `-1` represents indeterminate progress. |