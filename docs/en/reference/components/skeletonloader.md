# `SkeletonLoader` component
Astronaut:
```javascript
SkeletonLoader(alt) ()
SkeletonLoader({alt}) (
    Heading() (),
    Paragraph() (),
    Paragraph() (),
    Paragraph() ()
)
```

HTML:
```html
<div aui-skeleton aria-label="">
    <h1></h1>
    <p></p>
    <p></p>
    <p></p>
</div>
```

A container that represents details that are to be loaded, and is designed to show the user the rough user interface structure/contents while loading.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`alt` | `aria-label` | The accessible description string of the `SkeletonLoader`. An example of an appropriate description would be `"Loading contents..."`. |

## Accessibility
The `alt` property must be used to provide an accessible description of the `SkeletonLoader`.

All [`Heading`s](reference/components/heading.md) and [`Paragraph`s](reference/components/paragraph.md) must not have any textual contents inside them. When Astronaut is not in use, all user interface components inside the `SkeletonLoader` must have the attributes `disabled` and `aria-hidden`.