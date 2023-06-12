# `Figure` component
Astronaut:
```javascript
Figure() (
    Text()
)
```

HTML:
```html
<figure>
    <figcaption></figcaption>
</figure>
```

A container that can associate media (such as [`Image`](reference/components/image.md)s) with a textual description. With Astronaut, the first child will be used as the description (which is inserted into the HTML `figcaption` element).