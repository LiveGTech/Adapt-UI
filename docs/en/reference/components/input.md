# `Input` component
Astronaut:
```javascript
Input({type: "text", placeholder: "", mode: "primary", value: ""}) ()
```

HTML:
```html
<input type="text" placeholder="" value="" aui-mode="primary">
```

A component that contains data that is input by the user (such as textual data if the `type` property is set to be `"text"`).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`type` (default: `"text"`) | `type` | A string representing the type and format of data required. The value `"text"` allows for textual input to be entered, `"email"` for email addresses, and `"password"` for passwords (of which, the password being `Input` is concealed and not shown to the user — bullet characters are shown instead). |
| `placeholder` (default: `""`) | `placeholder` | The text to be shown if the `Input` is empty, used as a general guide as to what data should be entered. |
| `mode` (default: `"primary"`) | `aui-mode` | A string representing how the `Input` should be displayed. The value `"primary"` should be used to represent primary inputs, `"secondary"` for secondary inputs. |
| `value` (default: `""`) | `value` | The default value to be stored in the `Input` when created. |