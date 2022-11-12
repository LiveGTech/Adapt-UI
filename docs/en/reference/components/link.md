# `Link` component
Astronaut:
```javascript
Link(source) ()
Link({source: null}) ()
```

HTML:
```html
<a href></a>
```

A fragment of text that is used as a hyperlink to another destination, used inside a block of text. `Link`s are rendered as inline elements, meaning that they do not break the text flow, but still wrap onto new lines.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`source` (default: `null`) | `href` | The URL string to visit when the link is pressed. The value `null` will cause the link to not visit any URL when pressed (so that its action can be handled by a JavaScript event). |