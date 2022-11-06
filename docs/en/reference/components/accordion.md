# `Accordion` component
Astronaut:
```javascript
Accordion(open) ()
Accordion({open: false, mode: null}) ()
```

HTML:
```html
<details open aui-mode="">
    <summary></summary>
</details>
```

A container that can expand and collapse to show and hide the components inside it. With Astronaut, first child will always be visible and is effectively used as a title for the accordion (a [`Paragraph`](reference/components/paragraph.md) is recommended as the first child).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`open` (default: `false`) | `open` | A boolean value representing whether the accordion is expanded (opened) or not. |
|`mode` (default: `null`) | `aui-mode` | A string representing how the `Accordion` should be displayed and what type of action it represents. The value `"boxed"` should be used to represent accordions that should be styled in an enclosed box (typically used to ensure a distinction between the content in the accordion and after it), and `null` for default, non-boxed styling. |