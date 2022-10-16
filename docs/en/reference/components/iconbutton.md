# `IconButton` component
Astronaut:
```javascript
IconButton(icon, alt) ()
IconButton({icon, alt}) ()
```

HTML:
```html
<button title="" aria-label="">
    <img src="" aui-icon="light" aria-hidden="true">
</button>
```

A [`Button`](button.md) (derived) which contains an [`Icon`](icon.md).

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
| `alt` | `title` and `aria-label` | The accessible description string of the `IconButton`. |
| `icon` | `src` (inside `img`; must be full icon path) | The icon to use inside the `IconButton`. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `IconButton`.