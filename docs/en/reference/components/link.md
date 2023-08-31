# `Link` component
Astronaut:
```javascript
Link(source, openExternal) ()
Link({mode: null, source: null, openExternal: false, download: null}) ()
```

HTML:
```html
<a href></a>
```

A fragment of text that is used as a hyperlink to another destination, used inside a block of text. `Link`s are rendered as inline elements, meaning that they do not break the text flow, but still wrap onto new lines.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `Link` should behave when pressed. The value `"cardLink"` should be used to specify that this `Link` will be pressed when its parent [`Card`](reference/components/card.md) is pressed, and `"notCardLink"` should be used to specify that this `Link` will not be pressed when its parent `Card` is pressed (another candidate `Link` may be chosen instead). |
| `source` (default: `null`) | `href` | The URL string to visit when the link is pressed. The value `null` will cause the link to not visit any URL when pressed (so that its action can be handled by a JavaScript event). |
| `openExternal` (default: `false`) | `target="_blank"` | Whether to open the link in a new tab or browser window instead of visiting it in the current tab. |
| `download` (default: `null`) | `download` | The filename to use when downloading the destination of the link instead of visiting it. If `null`, then the link will only be visited when pressed, and not downloaded. |