# `Link` component
Astronaut:
```javascript
Link(source, openExternal) ()
Link({source: null, openExternal: false, download: true}) ()
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
|`openExternal` (default: `false`) | `target="_blank"` | Whether to open the link in a new tab or browser window instead of visiting it in the current tab. |
|`download` (default: `false`) | `target="_blank"` | Whether to download the destination of the link instead of visiting it. |