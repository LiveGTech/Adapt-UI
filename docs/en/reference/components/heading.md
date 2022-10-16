# `Heading` component
Astronaut:
```javascript
Heading(level) ()
Heading({level: 1}) ()
```

HTML:
```html
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
```

A heading that is used to define key sections of a document.

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
|`level` (default: `1`) | (Tag name) | The level at which the heading represents in the document. Must be an integer between 1 and 6. |

## Accessibility
The topmost heading must have a level of 1, and any subheadings below the topmost heading must have a level of 2. Any subheadings to those subheadings must have a level of 3, and so on. The heading levels must describe a hierachy that represents the document correctly, and so arbitrary levels that are intended solely to change the size of the heading text should be avoided.