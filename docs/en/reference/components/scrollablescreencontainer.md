# `ScrollableScreenContainer` component
Astronaut:
```javascript
ScrollableScreenContainer({mode: null}) (
    Container() (),
    Container() (),
    Container() ()
)
```

HTML:
```html
<aui-screenscroll></aui-screenscroll>
```

A container for multiple subcontainers that can be scrolled horizontally as _screens_ (different from [`Screen`s](reference/components/screen.md), but conceptually similar).

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
| `mode` (default: `null`) | `aui-mode` | A string representing how the `ScrollableScreenContainer` should behave. The value of `"paginated"` will automatically add a paginator component after the `ScrollableScreenContainer` that will control it. |