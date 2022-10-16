# `PageMenu` component
Astronaut:
```javascript
PageMenu() (
    PageMenuButton() (),
    PageMenuButton() (),
    PageMenuButton() ()
)
```

HTML:
```html
<aside></aside>
```

A menu that is used primarily to navigate between [`Page`s](page.md). It can contain [`PageMenuButton`s](pagemenubutton.md). It is hidden on mobile (and so a [`HeaderPageMenuButton`](headerpagemenubutton.md) is needed to show it), but is visible on desktop (typically shown to the left of a [`Screen`](screen.md), before a `Page`).