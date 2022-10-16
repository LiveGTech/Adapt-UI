# `Accordion` component
Astronaut:
```javascript
Accordion(open) ()
Accordion({open: false}) ()
```

HTML:
```html
<details open>
    <summary></summary>
</details>
```

A container that can expand and collapse to show and hide the components inside it. With Astronaut, first child will always be visible and is effectively used as a title for the accordion (a [`Paragraph`](reference/components/paragraph.md) is recommended as the first child).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`open` (default: `false`) | `open` | A boolean value representing whether the accordion is expanded (opened) or not. |