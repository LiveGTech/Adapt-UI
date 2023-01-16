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
<dialog>
    <aui-dialogcontent>
        <h1></h1>
        <p></p>
        <p></p>
        <p></p>
    </aui-dialogcontent>
    <aui-buttons>
        <button></button>
        <button></button>
        <button></button>
    </aui-buttons>
</dialog>
```

A modal dialog that can contain texual and user interface components, and an be shown and hidden, overlaying [`Screen`s](reference/components/screen.md). Should contain a [`DialogContent` component](dialogcontent.md) for scrollable textual information and user interface components.