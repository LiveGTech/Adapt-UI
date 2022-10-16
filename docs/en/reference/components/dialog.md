# `Dialog` component
Astronaut:
```javascript
Dialog() (
    DialogContent() (
        Heading() (),
        Paragraph() (),
        Paragraph() (),
        Paragraph() ()
    ),
    ButtonRow() (
        Button() (),
        Button() (),
        Button() ()
    )
)
```

HTML:
```html
<dialog></dialog>
```

A modal dialog that can contain texual and user interface components, and an be shown and hidden, overlaying [`Screen`s](screen.md). Should contain a [`DialogContent` component](dialogcontent.md) for scrollable textual information and user interface components.