# Getting started with Adapt UI
Adapt UI has been designed from the ground up to be intuitive, yet powerful. This guide will show you how to build your first app using Adapt UI.

## Project template
Create a new HTML file and insert the following boilerplate code:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My First App</title>
        <meta name="charset" content="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
        <link rel="stylesheet" href="/path/to/adaptui.css">
    </head>
    <body>
    </body>
</html>
```

Ensure that the reference to `adaptui.css` is the correct path.

## Saying hello
Inside the `<body>` element, insert the following content:

```html
<aui-screen id="welcome">
    <main>
        <section>
            <h1 id="helloHeader">Hello, world!</h1>
            <p>Welcome to my first app using Adapt UI.</p>
        </section>
    </main>
</aui-screen>
```

As you can see, this HTML is easy to interpret and write. Let's break down what the `<aui-screen>`, `<main>` and `<section>` elements do:

* `<aui-screen>` contains elements that will be shown for one specific page in our app. When you want to add more pages, add extra `<aui-screen hidden id="example">` elements.
* `<main>` contains the main contents of our app. When it comes to adding the header navigation bar, the `<main>` element will automatically be resized to accomodate it.
* `<section>` defines a section of unique content in our app. It can contain a variety of information, from user-generated content to a group of inputs.

## Adding a navigation bar
To add a navigation bar to our app, insert a `<header>` element above the `<main>` element like this:

```html
<aui-screen id="welcome">
    <header>
        <span>My First App</span>
    </header>
    <main>
        <section>
            <h1 id="helloHeader">Hello, world!</h1>
            <p>Welcome to my first app using Adapt UI.</p>
        </section>
    </main>
</aui-screen>
```

You can then add buttons later on for opening a menu or going back a screen.

## Creating a simple script
Create a script called `script.js` and ensure it's linked in your HTML like so:

```html
<script type="module" src="script.js"></script>
```

The `type="module"` part enables JavaScript module support, which is what is needed to use Adapt UI's functionality. JavaScript modules allow you to do similar stuff to Python modules, in that you can use the `import` statement (and additionally the `export` statement, too).

Inside `script.js`, write:

```javascript
import * as $g from "/path/to/adaptui.js";
```

> **Note:** If you want to use `$g` in the debugger console, you will need to add `window.$g = $g;` to your script so it can be accessed ouside of modules.

Ensure that the reference to `adaptui.js` is the correct path.

## Adding a UI
Let's add a UI which asks for the user's name and performs a certain action with it. Inside of `<main>` in your HTML file, create another `<section>` element:

```html
<section>
    <div>
        <label for="name">What's your name?</label>
        <input id="name">
    </div>
    <br>
    <aui-buttons>
        <button id="saveButton">Save</button>
        <button aui-mode="secondary" id="clearButton">Clear</button>
    </aui-buttons>
</section>
```

Let's see what some of it means:

* The `<div>` ensures that both the `<label>` and `<input>` are kept together on one line.
* The `<br>` adds extra vertical spacing in-between the input and the buttons.
* The `<aui-buttons>` element holds a row of buttons. Adding the `aui-mode="end"` attribute can align the buttons to the right of the page (or left in RTL languages), with the first button being the rightmost.
* The `aui-mode="secondary"` attribute will make the button be coloured in the secondary colour (to signify that the button isn't the primary action).

> **Note:** Using `aui-mode="dangerous"` will colour the button in red. This is useful for marking buttons that delete things as potentially dangerous to the user.

Of course our code doesn't actually do anything yet ─ we'll need to add the functionality in `script.js`. Let's set the `<h1>` (with ID `helloHeader`) when a name is entered:

```javascript
$g.waitForLoad().then(function() {
    $g.sel("#saveButton").on("click", function() {
        $g.sel("#helloHeader").setText(`Hello, ${$g.sel("#name").getValue()}!`);
    });

    $g.sel("#clearButton").on("click", function() {
        $g.sel("#name").setValue("");
    });
});
```

Now try entering your name and press the **Save** button. Your name should appear in the header!

The JavaScript code you've written will do the following:

1. Wait for the HTML page to finish loading and rendering
2. Attaches a click event to the **Save** button
3. Sets the text of the header to the value of the input when the button is clicked
4. Attaches a click event to the **Clear** button
5. Sets the value of the input to be blank when the button is clicked

## Creating a dialog box
Dialog boxes are useful for creating a new context in our app where the user can either view a message or enter some information. In this case, we'll make a dialog box which appears when the user doesn't enter anything into the input.

Firstly, you'll need to add a `<dialog>` element below the `<aui-screen>` element:

```html
<dialog id="nameError">
    <h1>No name entered</h1>
    <aui-dialogcontent>
        <p>Please enter your name into the input.</p>
    </aui-dialogcontent>
    <aui-buttons aui-mode="end">
        <button aui-bind="close">OK</button>
    </aui-buttons>
</dialog>
```

Let's break down what this means:

* The `<dialog>` element contains everything which is shown for the dialog.
* The `<h1>` element contains the dialog's title.
* The `<aui-dialogcontent>` element contains the actual contents of the dialog, excluding buttons. This element is usually useful for when the contents of the dialog exceed a particular height, for which scroll bars must be shown.
* The `<aui-buttons>` element (which we used earlier) contains the dialog buttons. `aui-mode="end"` positions them at the far side of the dialog.
* The `<button>` element is the button to dismiss the dialog. `aui-bind="close"` will tell Adapt UI to close the dialog when it's clicked (this saves on having to write JavaScript to close the dialog yourself, though you can if you need to).

We then need to make our dialog show when the input is empty. Modify the **Save** button's click event to this:

```javascript
$g.sel("#saveButton").on("click", function() {
    var name = $g.sel("#name").getValue();

    if (name.trim() != "") {
        $g.sel("#helloHeader").setText(`Hello, ${name}!`);
    } else {
        $g.sel("#nameError").dialogOpen();
    }
});
```

The `if` statement will check if the name entered isn't empty, and if so, will perform the action we assigned earlier. Otherwise, if it is empty (or if the contents is just whitespace, since `.trim()` removes leading/trailing spaces), then show the dialog instead.

Now try entering your name into the input ─ it should work as before. Then try leaving the input blank ─ the dialog should correctly show up.