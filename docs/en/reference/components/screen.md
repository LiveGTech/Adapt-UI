# `Screen` component
Astronaut:
```javascript
Screen(showing) ()
Screen({showing: false}) ()
```

HTML:
```html
<aui-screen hidden></aui-screen>
```

A screen which covers the viewport. Each `Screen` component represents a screen in an app. `Screen`s can transition to other `Screen`s as a means of navigation in an app.

The `Screen` that shows as default must have its `showing` property set to `true`, with all other screens having a `false` `showing` value.

`Screen`s typically contain [`Page`](page.md)s which contain the main contents to be shown, with the exception of [`Header`s](header.md) and [`PageMenu`s](pagemenu.md).

## Properties
| Astronaut property | HTML attribute | Description |
|-|-|-|
|`showing` (default: `false`) | `hidden` (inverted) | A boolean value representing whether the `Screen` should be visible and active or not. |