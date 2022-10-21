# `Message` component
Astronaut:
```javascript
Message() (
    Icon() (),
    Heading() (),
    Paragraph() (),
    Paragraph() (),
    Paragraph() (),
    ButtonRow() (
        Button(),
        Button(),
        Button()
    )
)
```

HTML:
```html
<aui-message></aui-message>
```

An area inside a [`Section`](reference/components/section.md) that is designed to fill the [`Page`](reference/components/page.md) with a message. The `Message` is rendered with a lower opacity than normal text, and is intended to communicate information to a user when there content it replaces is not available (such as a list of items being empty, or that there is no connection to the internet available).