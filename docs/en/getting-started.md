# Getting started with Adapt UI
Adapt UI has been designed from the ground up to be intuitive, yet powerful. This guide will show you how to build your first app using Adapt UI.

## Project template
Create a new HTML file and insert the following boilerplate code:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My First App</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
        <link rel="stylesheet" href="/path/to/src/adaptui.css">
    </head>
    <body>
    </body>
</html>
```

Ensure that the reference to `src/adaptui.css` is the correct path.

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
import * as $g from "/path/to/src/adaptui.js";
```

> **Note:** If you want to use `$g` in the debugger console, you will need to add `window.$g = $g;` to your script so it can be accessed ouside of modules.

Ensure that the reference to `src/adaptui.js` is the correct path.

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

Of course our code doesn't actually do anything yet — we'll need to add the functionality in `script.js`. Let's set the `<h1>` (with ID `helloHeader`) when a name is entered:

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

Now try entering your name into the input — it should work as before. Then try leaving the input blank — the dialog should correctly show up.

## Adding a navigation menu
Let's now add a navigation menu which will appear at the side of the app (will be hidden by default on mobile). Create an `<aside>` element just below the header like so:

```html
<aui-screen id="welcome">
    <header>
        <!-- ... -->
    </header>
    <aside>
        <button aui-page="#first" aui-selected>First page</button>
        <button aui-page="#second">Second page</button>
        <button aui-page="#third">Third page</button>
    </aside>
    <main>
        <!-- ... -->
    </main>
</aui-screen>
```

The `<aside>` element is the navigation menu. Each `<button>` in the menu is a menu option. The `aui-page` attribute will hook an event to each button to show and hide their respective `<main>` elements by their selectors. `aui-selected` will make the respective button visually appear selected.

Now add an ID to the `<main>` element so it says `<main id="first">`. Create two more `<main>` elements below that first element and add the attribute `hidden` to both, in addition to their respective IDs. Now check your code so that the following is true:

* The first `<main>` tag should say `<main id="first">`.
* The second `<main>` tag should say `<main hidden id="second">`.
* The third `<main>` tag should say `<main hidden id="third">`.

Ideally, we would use better ID names instead of `first`, `second` and `third` (for example, `feed` or `signIn`), but for the purposes of this tutorial, we'll stick to these basic names. Feel free to add some content to the new `<main>` elements (such as a paragraph) — ensure that both contain a `<section>` element each for proper layouting.

Now that you've created the extra pages, we don't even need to write any JavaScript to handle the page events since `aui-page` has already created the events at app startup! Try your new app to see if you can switch between pages.

There is only one more thing left to do to make our navigation menu fully functional, though. On mobile, you can't open the menu yet, so we'll need to add a button which allows mobile users to open the menu.

In the `<header>` element, just above the `<span>` element, insert this line:

```html
<button title="Open menu" aui-bind="aside" aria-label="Open menu"><img src="/path/to/icons/menu.svg" alt="" aui-icon="light"></button>
```

Ensure that the reference to `icons/menu.svg` is the correct path.

This newly-added button will:

* Open the navigation menu when pressed using the binding `aui-bind="aside"`.
* Announce "Open menu" to assistive technologies (such as screen readers) when the button is selected, using `aria-label="Open menu"`. Mouse users can also hover over the button to see what it does using the `title` attribute.
* Have an icon inside it which visually conveys that the button is a menu.
* Automatically hide on non-mobile devices (since it's not needed), again automatically via the `aui-bind="aside"` attribute.

Now that our navigation menu is fully complete, you can navigate between pages. Pages aren't quite screens, though; there's a difference:

* A screen is a distinct area of your app which is part of a progressive navigation flow. It is defined by `<aui-screen>`. Screens can have their own header titles and header buttons.
* A page is a subsection of a screen. A screen can contain one or more pages via the `<main>` element. Pages can't control the header, and can only mainly be selected through a navigation menu. It is designed for lateral navigation and not progressive navigation.

Screens can also be animated to transition back and fourth between different scenarios. For example, you may have a sign-in screen which then transitions to the main screen of the app. Pages don't have this navigative animatibility aside from being able to fade out and then fade in to show a different page, since they're not designed for conveying progessive navigation.

## Adding extra screens
As we have discussed, we have added pages to our `#main` screen, but we can also add screens to our app to add a progressive flow. Add another screen under the `<aui-screen id="main">` element:

```html
<aui-screen hidden id="about">
    <header>
        <button title="Back" aui-bind="back" aria-label="Back"><img src="../../icons/back.svg" alt="" aui-icon="light"></button>
        <span>About this app</span>
    </header>
    <main>
        <section>
            <h1>App information</h1>
            <p>I made this app</p>
        </section>
    </main>
</aui-screen>
```

This element adds another screen to our app, in a very similar way to what we did for the `#main` screen. This time, `aui-bind="back"` hooks an event to the back button which traverses back a screen when pressed.

Now, to go forwards a screen from the `#main` screen, attach an event to a button which runs the command `$g("#about").screenForward();`. In your HTML code:

```html
<section>
    <button id="openAboutButton">Open app information</button>
</section>
```

Now, write the event inside `$g.waitForLoad()`:

```javascript
$g.sel("#openAboutButton").on("click", function() {
    $g.sel("about").screenForward();
});
```

Now test the app. You should be able to navigate forwards by pressing the new button, and then navigate back again by pressing the back button in the header.

## Next steps
Congrats! You've got a basic app working. We have other guides for what you can do with Adapt UI, for which you can choose what you want to learn next.

* Learn how to localise your app: [Localising apps using the Adapt UI `l10n` module](localising-apps.md)