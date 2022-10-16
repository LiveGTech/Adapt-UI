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

A menu that is used primarily to navigate between [`Page`s](reference/components/page.md). It can contain [`PageMenuButton`s](reference/components/pagemenubutton.md). It is hidden on mobile (and so a [`HeaderPageMenuButton`](reference/components/headerpagemenubutton.md) is needed to show it), but is visible on desktop (typically shown to the left of a [`Screen`](reference/components/screen.md), before a `Page`).