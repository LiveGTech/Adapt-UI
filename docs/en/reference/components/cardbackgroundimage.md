# `CardBackgroundImage` component
Astronaut:
```javascript
Image(source, alt) ()
Image({source, alt}) ()
```

HTML:
```html
<img src="" alt="" aui-mode="background">
```

An [`Image`](image.md) (derived) that is used as the background image for a [`Card`](card.md). Should be used as the first child in a `Card`.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `source` | `src` | The URL string of the image to be displayed. |
| `alt` | `alt` | The accessible description string of the `Image`. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `CardBackgroundImage`.