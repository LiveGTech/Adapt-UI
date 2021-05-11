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
            <h1>Hello, world!</h1>
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

## Adding a UI
Let's add a UI which asks for the user's name and performs a certain action with it. Inside of `<main>` in your HTML file, create another `<section>` element:

```html
<section>
    <div>
        <label for="name">What's your name?</label>
        <input id="name">
    </div>
    <aui-buttons>
        <button id="saveButton">Save</button>
        <button id="clearButton">Clear</button>
    </aui-buttons>
</section>
```

Let's see what some of it means:

* The `<div>` ensures that both the `<label>` and `<input>` are kept together on one line.
* The `<aui-buttons>` element holds a row of buttons. Adding the `aui-mode="end"` attribute can align the buttons to the right of the page (or left in RTL languages), with the first button being the rightmost.

Of course our code doesn't actually do anything yet ─ we'll need to add the functionality in `script.js`. Let's set the `<h1>` (with ID `helloHeader`) when a name is entered:

```javascript
$g.waitForLoad().then(function() {
    $g.sel("#saveButton").on("click", function() {
        $g.sel("#helloHeader").setText(`Hello, ${$g.sel("#saveButton").getValue()}!`);
    });
});
```

Now try entering your name and press the **Save** button. Your name should appear in the header!