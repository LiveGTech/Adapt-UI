# `ProgressIndicator` component
Astronaut:
```javascript
ProgressIndicator({mode: "primary", max: null value: null}) ()
```

HTML:
```html
<progress aui-mode="primary" max="1" value="">
```

An indicator that shows the user the current progress of a task that is being processed or loaded.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `ProgressIndicator` should be displayed. The value `"primary"` should be used to represent primary indicators, `"secondary"` for secondary indicators. |
| `max` (default: `1`) | `max` | The divisor/value when at 100% of the `ProgressIndicator`. |
| `value` (default: `null`) | `value` | The dividend value to be stored in the `ProgressIndicator` when created. A value of `null` or `-1` represents indeterminate progress. |