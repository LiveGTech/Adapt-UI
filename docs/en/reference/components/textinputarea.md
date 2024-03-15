# `TextInputArea` component
Astronaut:
```javascript
TextInputArea({placeholder: "", mode: "primary", value: ""}) ()
```

HTML:
```html
<textarea placeholder="" aui-mode="primary">
    <!-- Initial value is stored in text node inside element -->
</textarea>
```

An [`Input`](reference/components/input.md) (derived) that can contain multiple lines of text..

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `placeholder` (default: `""`) | `placeholder` | The text to be shown if the `TextInputArea` is empty, used as a general guide as to what data should be entered. |
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `TextInputArea` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `value` (default: `false`) | `checked` | The default value key to be selected in the `SelectionInput` when created. |