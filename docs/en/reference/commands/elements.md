# Element operations
Existing elements can be queried by using the `$g.sel` command, and created by using the `$g.create` command. Both of these commands return a set of operations that can be performed on the target elements.

## `$g.create`
```javascript
$g.create(tagName: String): {Function}
```

Create an element with the tag name given by the `tagName` argument and return an object containing operations that may be performed on the selected elements.

## `$g.sel`
```javascript
$g.sel(selector: String | Element | [Element], multiReturn: Boolean = false): {Function}
```

Select one or more elements that exist in the root that match the CSS selector given by the `selector` argument and return an object containing operations that may be performed on the selected elements.

## `$g.sel(...).get`
```javascript
$g.sel(...).get(): Element
```

Get the first selected element as an HTML DOM `Element`.

## `$g.sel(...).getAll`
```javascript
$g.sel(...).getAll(): [Element]
```

Get all the selected elements as an `Array` of HTML DOM `Element`s.

## `$g.sel(...).items`
```javascript
$g.sel(...).items(): [{Function}]
```

Map all selected elements to an `Array` containing `Object`s that each contain operations for each selected element.

## `$g.sel(...).find`
```javascript
$g.sel(...).find(selector: String): {Function}
```

Return the operations for children of the selected elements that match the CSS selector given by the `selector` argument.

## `$g.sel(...).where`
```javascript
$g.sel(...).where(selector: String): {Function}
```

Return the operations for the selected elements that match the CSS selector given by the `selector` argument.

## `$g.sel(...).is`
```javascript
$g.sel(...).is(selector): Boolean
```

Determine whether the selected elements match the CSS selector given by the `selector` argument and return `true` if matched.

## `$g.sel(...).filter`
```javascript
$g.sel(...).filter(filterFunction: Function) {Function}
```

Return the operations for the selected elements where calling the function given by the `filterFunction` argument returns a truthy value.

### Callbacks
```javascript
filterFunction(element: {Function}): Boolean
```

## `$g.sel(...).map`
```javascript
$g.sel(...).map(mapFunction: Function): [any]
```

Map each selected item to an `Array` using the function given by the `mapFunction` argument.

### Callbacks
```javascript
mapFunction(element: {Function}, index: Number): any
```

## `$g.sel(...).forEach`
```javascript
$g.sel(...).forEach(iterationFunction: Function): {Function}
```

Iterate over the selected elements and call the function given by the `iterationFunction` argument for each element.

### Callbacks
```javascript
iterationFunction(element: {Function}, index: Number)
```

## `$g.sel(...).ancestor`
```javascript
$g.sel(...).ancestor(selector: String): {Function}
```

Return the operations for ancestors of the selected elements that match the CSS selector given by the `selector` argument.

## `$g.sel(...).first`
```javascript
$g.sel(...).first(): {Function}
```

Return the operations for the first selected element.

## `$g.sel(...).last`
```javascript
$g.sel(...).last(): {Function}
```

Return the operations for the last selected element.

## `$g.sel(...).prev`
```javascript
$g.sel(...).prev(): {Function}
```

Return the operations for the previous element in the DOM tree for each selected element.

## `$g.sel(...).next`
```javascript
$g.sel(...).next(): {Function}
```

Return the operations for the next element in the DOM tree for each selected element.

## `$g.sel(...).add`
```javascript
$g.sel(...).add(...elementsToAdd: [Function | {Function}]): {Function}
```

Add the elements given by the `elementsToAdd` argument (a spreaded `Array` of either DOM elements or element operations) to the selected elements.

This operation allows other operations to be chained.

## `$g.sel(...).remove`
```javascript
$g.sel(...).remove()
```

Remove the selected elements from their parents in the DOM tree.

## `$g.sel(...).condition`
```javascript
$g.sel(...).condition(condition: Boolean, ifTrue: Function, ifFalse: Function): any
```

If the condition given by the `condition` argument is truthy, then call the function given by the `ifTrue` argument, or otherwise call the function given by the `ifFalse` argument. Return the value of the function called.

### Callbacks
```javascript
ifTrue(element: {Function}): any
ifFalse(element: {Function}): any
```

## `$g.sel(...).choose`
```javascript
$g.sel(...).choose(testValue: Boolean, targetValue1?: any, ifEqual1?: Function, targetValue2?: any, ifEqual2?: Function, ... targetValueN?: any, ifEqualN: Function, ifNotEqual: Function): any
```

Based on the value given by the `testValue` argument, compare each target value and function (given as pairs of arguments `targetValueN` and `ifEqualN` respectively) and call the respecive function if the target value is equal to the test value. Otherwise, call the function given by the `ifNotEqual` argument. Return the value of the function called.

This command is intended to act similarly to a `switch` statement:

```javascript
// In `switch` form:
switch (testValue) {
    case targetValue1:
        return ifEqual1(element);

    case targetValue2:
        return ifEqual2(element);

    case targetValue3:
        return ifEqual3(element);

    default:
        return ifNotEqual(element);
}

// In `choose` form:
$g.sel(...).choose(
    testValue,
    targetValue1, ifEqual1,
    targetValue2, ifEqual2,
    targetValueN, ifEqualN,
    ifNotEqual
);
```

### Callbacks
```javascript
ifEqualN(element: {Function}): any
ifNotEqual(element: {Function}): any
```

## `$g.sel(...).copy`
```javascript
$g.sel(...).copy(): {Function}
```

Clone each DOM element of each selected element and return the operations for those cloned elements.

## `$g.sel(...).show`
```javascript
$g.sel(...).show(): {Function}
```

Show the selected elements, both visually and in the accessibility tree.

This operation allows other operations to be chained.

## `$g.sel(...).hide`
```javascript
$g.sel(...).hide(): {Function}
```

Hide the selected elements, both visually and in the accessibility tree. This operation does not remove the selected elements from the DOM tree (to do this, use the `$g.sel(...).remove` command).

This operation allows other operations to be chained.

## `$g.sel(...).clear`
```javascript
$g.sel(...).clear(): {Function}
```

Remove all children of the selected elements from the DOM tree.

This operation allows other operations to be chained.

## `$g.sel(...).getText`
```javascript
$g.sel(...).getText(): String
```

Get the textual contents contained within the selected elements.

## `$g.sel(...).setText`
```javascript
$g.sel(...).setText(value: String): {Function}
```

Set the selected elements' textual contents to the string given by the `value` argument. Any child elements of the selected elements will be removed from the DOM tree and replaced with the text.

This operation allows other operations to be chained.

## `$g.sel(...).getHTML`
```javascript
$g.sel(...).getHTML(): String
```

Get the HTML code of elements and other DOM nodes contained within the selected elements.

## `$g.sel(...).setHTML`
```javascript
$g.sel(...).setHTML(value: String): {Function}
```

Set the selected elements' child elements and nodes from the HTML code given by the `value` argument. Any child elements of the selected elements will be removed from the DOM tree and replaced with the new contents.

This operation allows other operations to be chained.

## `$g.sel(...).getValue`
```javascript
$g.sel(...).getValue(): String | Boolean
```

Get the value of the selected input elements. A `Boolean` value will be returned for [`CheckboxInput`s](reference/components/checkboxinput.md), [`RadioButtonInput`s](reference/components/radiobuttoninput.md) and [`SwitchInput`s](reference/components/switchinput.md), and a `String` for other input types.

## `$g.sel(...).setValue`
```javascript
$g.sel(...).setValue(value: String | Boolean): {Function}
```

Set the value of the selected input elements to that given by the `value` argument. A `Boolean` value can be supplied for [`CheckboxInput`s](reference/components/checkboxinput.md), [`RadioButtonInput`s](reference/components/radiobuttoninput.md) and [`SwitchInput`s](reference/components/switchinput.md), and a `String` for other input types. Supplying the value of `"indeterminate"` will mark the input state as indeterminate for `CheckboxInput`s.

This operation allows other operations to be chained.

## `$g.sel(...).hasAttribute`
```javascript
$g.sel(...).hasAttribute(attributeName: String): Boolean
```

Determine whether the selected elements have the HTML attribute given by the `attributeName` argument.

## `$g.sel(...).getAttribute`
```javascript
$g.sel(...).getAttribute(attributeName: String): String
```

Get the value of the HTML attribute given by the `attributeName` argument of the selected elements, or `null` if the selected elements do not have the given attribute.

## `$g.sel(...).setAttribute`
```javascript
$g.sel(...).setAttribute(attributeName: String, value: String): {Function}
```

Set the value (as given by the `value` argument) of the HTML attribute given by the `attributeName` argument of the selected elements.

This operation allows other operations to be chained.

## `$g.sel(...).addAttribute`
```javascript
$g.sel(...).addAttribute(attributeName: String): {Function}
```

Add the HTML attribute given by the `attributeName` argument to the selected elements, which is equal to an empty string (`""`). This is usually used to set boolean attributes to `true` (such as for the `hidden` attribute).

This operation allows other operations to be chained.

## `$g.sel(...).removeAttribute`
```javascript
$g.sel(...).removeAttribute(attributeName: String): {Function}
```

Remove the HTML attribute given by the `attributeName` argument from the selected elements if they have the attribute set. This can be used to set boolean attributes to `false` (such as for the `hidden` attribute).

This operation allows other operations to be chained.

## `$g.sel(...).hasClass`
```javascript
$g.sel(...).hasClass(className: String): Boolean
```

Determine whether the selected elements have the HTML class given by the `className` argument.

## `$g.sel(...).addClass`
```javascript
$g.sel(...).addClass(className: String): {Function}
```

Add the HTML class given by the `className` argument to the selected elements if they do not already have the class.

This operation allows other operations to be chained.

## `$g.sel(...).removeClass`
```javascript
$g.sel(...).removeClass(className: String): {Function}
```

Remove the HTML class given by the `className` argument from the selected elements if they have the class.

This operation allows other operations to be chained.

## `$g.sel(...).toggleClass`
```javascript
$g.sel(...).toggleClass(className: String): {Function}
```

For each selected element, add the HTML class given by the `className` argument to the element if it does not already have the class, or otherwise remove the class if the element has it.

This operation allows other operations to be chained.

## `$g.sel(...).getId`
```javascript
$g.sel(...).getId(): String
```

Get the HTML ID of the selected elements.

## `$g.sel(...).setId`
```javascript
$g.sel(...).setId(value: String): {Function}
```

Set the HTML ID of the selected elements to the value given by the `value` argument.

This operation allows other operations to be chained.

## `$g.sel(...).getStyle`
```javascript
$g.sel(...).getStyle(property: String): String
```

Get the CSS style property value of the selected elements for the property given by the `property` argument, or `null` if the property is not set.

## `$g.sel(...).setStyle`
```javascript
$g.sel(...).setStyle(property: String, value: String): {Function}
```

Set the CSS style property value (to that given by the `value`) of the selected elements for the property given by the `property` argument.

This operation allows other operations to be chained.

## `$.gel(...).applyStyle`
```javascript
$g.sel(...).applyStyle(style: {String}): {Function}
```

Apply the CSS style properties (given by object passed into the `style` argument) to the selected elements.

This operation allows other operations to be chained.

## `$g.sel(...).on`
```javascript
$g.sel(...).on(event: String, callback: Function): {Function}
```

Listen to the event with the type given by the `event` argument with the function to call when the event is emitted for the selected elements given by the `callback` argument.

For a reference list of event types, see the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Events).

This operation allows other operations to be chained.

### Callbacks
```javascript
callback(event: Object): Boolean
```

## `$g.sel(...).emit`
```javascript
$g.sel(...).emit(eventName: String, eventDetail: any = undefined): {Function}
```

Emit the event with the type given by the `eventName` argument and with the detail data (which may be of any type) optionally given by the `eventDetail` argument.

For a reference list of event types, see the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Events).

This operation allows other operations to be chained.

## `$g.sel(...).focus`
```javascript
$g.sel(...).focus(): {Function}
```

Focus the selected elements.

## `$g.sel(...).blur`
```javascript
$g.sel(...).blur(): {Function}
```

Blur (unfocus) the selected elements.