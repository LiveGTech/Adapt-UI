# `Page` component
Astronaut:
```javascript
Page(showing) ()
Page({showing: false}) ()
```

HTML:
```html
<main hidden></main>
```

A page which contains the main information for a [`Screen`](reference/components/screen.md). Each `Page` component represents a single page in a number of pages which can be browsed through with a [`PageMenu`](reference/components/pagemenu.md). `Page`s can transition to other `Page`s as a means of sub-`Screen` navigation.

The `Page` that shows as default must have its `showing` property set to `true`, with all other `Page`s having a `false` `showing` value.

## Properties
| Astronaut property | HTML attribute | Description |
|---|---|---|
|`showing` (default: `false`) | `hidden` (inverted) | A boolean value representing whether the `Page` should be visible and active or not. |