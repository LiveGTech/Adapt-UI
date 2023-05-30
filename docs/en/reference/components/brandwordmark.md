# `BrandWordmark` component
Astronaut:
```javascript
BrandWordmark(alt, logoSource, mode) (Text())
BrandWordmark({alt, logoSource: "https://liveg.tech/logo.png", mode: null}) ()
```

HTML:
```html
<aui-wordmark aui-mode="" aria-label="">
    <img src="https://liveg.tech/logo.png">
</aui-wordmark>
```

A fragment of text that represents a product or service name as a brand wordmark. This component is mainly internally used for constructing wordmarks under the LiveG brand.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `alt` | `alt` | The accessible description string of the `BrandWordmark`. |
| `source` (default: `"https://liveg.tech/logo.png"`) | `src` | The URL string of the logo image to be displayed. |
| `mode` (default: `null`) | `aui-mode` | A string representing how the `BrandWordmark` should be displayed. The value of `"acronym"` will modify the style to be more appropriate to acronym wordmarks where no space is added between the logo and text. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `BrandWordmark`. An example of an `alt` value would be `"LiveG Docs"` or `"LiveG OS"`.