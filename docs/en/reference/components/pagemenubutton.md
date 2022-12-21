# `PageMenuButton` component
Astronaut:
```javascript
PageMenuButton({selected: false, page: null}) ()
```

HTML:
```html
<button aui-selected aui-page=""></button>
```

A button that is intended for use as a child inside [`PageMenu`s](reference/components/pagemenu.md).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`selected` (default: `false`) | `aui-selected` | A boolean value representing whether the `PageMenuButton` should be shown as selected or not. |
| `page` (default: `null`) | `aui-page` ([`Page`](reference/components/page.md) element's selector instead of Astronaut component) | The Astronaut component representing the `Page` to visit when pressed, if present. No page will be visited if `null`. |