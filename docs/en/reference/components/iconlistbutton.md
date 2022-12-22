# `IconListButton` component
Astronaut:
```javascript
IconListButton() (
    Icon() (),
    Container() (
        BoldTextFragment() (),
        LineBreak() (),
        TextFragment() ()
    )
)
```

HTML:
```html
<button aui-listitem="icon">
    <img src="" aui-icon="dark embedded" aria-hidden="true">
    <div>
        <strong></strong><br>
        <span></span>
    </div>
</button>
```

A [`ListButton`](reference/components/listbutton.md) (derived) which is designed to contain an [`Icon`](reference/components/icon.md).