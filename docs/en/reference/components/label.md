# `Label` component
Astronaut:
```javascript
Label() (
    Text(),
    Input() ()
)
Label() (
    CheckboxInput() (),
    Text()
)
Label() (
    RadioButtonInput() (),
    Text()
)
Label() (
    Text(),
    SwitchInput() ()
)
```

HTML:
```html
<div>
    <label for></label>
    <input id>
</div>
<div>
    <label for></label>
    <input type="checkbox" id>
</div>
<div>
    <label for></label>
    <input type="radio" id>
</div>
<div>
    <label for></label>
    <input type="checkbox" role="switch" id>
</div>
```

A container that can contain a user interface component (such as an [`Input`](reference/components/input.md)) alongside textual information that describes or names that component.

If the user interface component is a [`CheckboxInput`](reference/components/checkboxinput.md) or [`RadioButtonInput`](reference/components/radiobuttoninput.md), then it should be the first child, with the `Text` component after it. Otherwise, the `Text` component should come first.

## Accessibility
When Astronaut is not used, the `label` element must be given a `for` attribute containing the ID of the user interface element so that that element is properly described.