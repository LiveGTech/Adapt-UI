# `Image` component
Astronaut:
```javascript
Image(source, alt) ()
Image({source, alt}) ()
```

HTML:
```html
<img src="" alt="">
```

A graphical image/picture. Will be scaled at an appropriate width depending on the parent container.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `source` | `src` | The URL string of the image to be displayed. |
| `alt` | `alt` | The accessible description string of the `Image`. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `Image`.