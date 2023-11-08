# `Badge` component
Astronaut:
```javascript
Badge(alt) ()
Badge({alt: null}) ()
```

HTML:
```html
<aui-badge alt></aui-badge>
```

A fragment of text that can contain textual information that is stored in its own element, presented as captialised text in a coloured box (typically to represent an indicator that represents the state of the text preceding it, such as a numerical count or text, like `"New"`). `Badge`s are rendered as inline elements, meaning that they do not break the text flow, but still wrap onto new lines.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `alt` (default: `null`) | `alt` | The accessible description string of the `Badge`. If `null`, then the badge's textual content will be used, surrounded by brackets. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `Badge`. It is recommended that the accessible description is surrounded by brackets, such as `"(New)"`, to ensure that, when read as text by an assistive technology, the accessible description of the parent element can be understood as part of a sentence.