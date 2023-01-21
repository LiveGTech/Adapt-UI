# Getting started with Astronaut and Adapt UI
Astronaut is a component-based interface-building toolkit that is designed to allow you to build Adapt UI apps with only JavaScript code. Its simple syntax is friendly to beginners, but is also powerful enough for advanced developers to use, too. This guide will show you how to build your first app using Adapt UI and Astronaut.

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
        <script type="module" src="script.js"></script>
    </head>
    <body></body>
</html>
```

Then create a script called `script.js`:

```javascript
import * as astronaut from "/path/to/astronaut/astronaut.js";

astronaut.unpack();
```

Ensure that the references to `/path/to/src/adaptui.css` and `astronaut/astronaut.js` are the correct path.

Everything that we're going to do in this guide will be within `script.js`, all in JavaScript. The HTML file is a page that does simple setup tasks such as loading the script and Adapt UI styling.

`astronaut.unpack();` is the only other line in the script template code aside from the `import` line. Its purpose is to unpack components into the global space — this saves you from having to write, for example, `astronaut.components.Paragraph` instead of just `Paragraph`.

## Saying hello
Below `astronaut.unpack();`, add the following lines:

```javascript
astronaut.render(
    Screen(true) (
        Page(true) (
            Section (
                Heading() ("Hello, world!"),
                Paragraph() ("Welcome to my first app using Astronaut and Adapt UI.")
            )
        )
    )
);
```

The syntax in the code you just added should be pretty straightforward to follow. Let's break down what each part does:

* `astronaut.render` renders the components inside it to the viewport.
* `Screen` is a screen of our app. You can have many `Screen` components to represent each screen in our app. This screen has the default property `shown` set to `true` — this marks the component as the one that appears as default (other screens in our app should not have this set to `true`).
* `Page` contains the main contents of the screen you're building. When it comes to adding the header navigation bar, the `Page` component will automatically be resized to accomodate it.
* `Section` defines a section of unique content in our app. It can contain a variety of information, from user-generated content to a group of inputs.

You can also choose a heading level for the `Heading` component — for a level 2 heading, use `Heading(2)`. There are six levels to choose from, and the default heading level if no number is specified is level 1.

## Adding a navigation bar
To add a navigation bar to our app, insert a `Header` component above the `Page` component like this:

```javascript
astronaut.render(
    Screen(true) (
        Header (
            Text("My First App")
        ),
        Page(true) (
            Section (
                Heading() ("Hello, world!"),
                Paragraph() ("Welcome to my first app using Astronaut and Adapt UI.")
            )
        )
    )
);
```

You can then add buttons later on for opening a menu or going back a screen.

## Adding a UI
Let's add a UI which asks for the user's name and performs a certain action with it. Add some variables before `astronaut.render`:

```javascript
var nameInput = Input() ();
var saveButton = Button() ("Save");
var clearButton = Button({mode: "secondary"}) ("Clear");
var helloHeading = Heading() ("Hello, world!");
```

Here, `Input` refers to a text input, and `Button` refers to a pressable button. The property `mode` being set to `"secondary"` will make the button be coloured in the secondary colour (to signify that the button isn't the primary action).

> **Note:** Using the value `"dangerous"` for the `mode` property will colour the button in red. This is useful for marking buttons that delete things as potentially dangerous to the user.

Now add a section below our current `Section` in our app, like so:

```javascript
astronaut.render(
    Screen(true) (
        Header (
            Text("My First App")
        ),
        Page(true) (
            Section (
                helloHeading,
                Paragraph() ("Welcome to my first app using Astronaut and Adapt UI.")
            ),
            Section (
                Container (
                    Label (
                        Text("What's your name?"),
                        nameInput
                    )
                ),
                LineBreak() (),
                ButtonRow (
                    saveButton,
                    clearButton
                )
            )
        )
    )
);
```

Note how we've replaced the original header with `helloHeading` in the first `Section`.

Of course our code doesn't actually do anything yet — we'll need to add the functionality to set the `helloHeading` header when a name is entered before `astronaut.render`:

```javascript
saveButton.on("click", function() {
    helloHeading.setText(`Hello, ${nameInput.getValue()}!`);
});

clearButton.on("click", function() {
    nameInput.setValue("");
});
```

Now try entering your name and press the **Save** button. Your name should appear in the header!

> **Note:** If the syntax for adding events and setting text and input values feels familiar to you, that is because the methods under components are the same as those under `$g.sel()` and `$g.create()`.

## Creating a dialog box
Dialog boxes are useful for creating a new context in our app where the user can either view a message or enter some information. In this case, we'll make a dialog box which appears when the user doesn't enter anything into the input.

Firstly, create a variable that stores a confirmation button and another that stores our dialog box:

```javascript
var nameErrorConfirmButton = Button() ("OK");

var nameErrorDialog = Dialog (
    Heading() ("No name entered"),
    DialogContent (
        Paragraph() ("Please enter your name into the input.")
    ),
    ButtonRow("end") (
        nameErrorConfirmButton
    )
);
```

We then need to make the confirmation button close the dialog when it is pressed:

```javascript
nameErrorConfirmButton.on("click", function() {
    nameErrorDialog.dialogClose();
});
```

Our next step is to refactor the event code of the save button to conditionally show the dialog if the name input is empty:

```javascript
saveButton.on("click", function() {
    var name = nameInput.getValue();

    if (name.trim() != "") {
        helloHeading.setText(`Hello, ${name}!`);
    } else {
        nameErrorDialog.dialogOpen();
    }
});
```

Our final step is to include the dialog box in our app's root element so that it can be shown due to be included in the element tree. We can do this by refractoring the call to `astronaut.render`:

```javascript
astronaut.render(
    Container (
        Screen(true) (
            // ...
        ),
        nameErrorDialog
    )
);
```

> **Note:** A `Container` element (an HTML `div` element) has been used to allow both the `Screen` and `Dialog` elements to coexist in the same tree. This is necessary when using multiple screens in an app since `astronaut.render` will only take one element to be used for the root in its function call (in this case, the `Container` element).

## Adding a navigation menu
Let's now add a navigation menu which will appear at the side of the app (will be hidden by default on mobile). Since we'll be referencing our current `Page` element, it is best to refactor our code to instead store it in a variable:

```javascript
var firstPage = Page(true) (
    Section (
        helloHeading,
        Paragraph() ("Welcome to my first app using Astronaut and Adapt UI.")
    ),
    Section (
        Container (
            Label (
                Text("What's your name?"),
                nameInput
            )
        ),
        LineBreak() (),
        ButtonRow (
            saveButton,
            clearButton
        )
    )
);
```

We can then modify our call to `astronaut.render` to use our `firstPage` variable:

```javascript
astronaut.render(
    Container (
        Screen(true) (
            Header (
                Text("My First App")
            ),
            firstPage
        ),
        nameErrorDialog
    )
);
```

Now create two more pages by defining the variables `secondPage` and `thirdPage` and assigning `Page` elements to them. Make sure that you add the references to those two pages in our `Screen` element, underneath `firstPage`. Additionally, the two other `Page` elements will not need to be `Page(true)` since they aren't going to be shown by default on load:

```javascript
var firstPage = Page(true) (
    // ...
);

var secondPage = Page (
    // ...
);

var thirdPage = Page (
    // ...
);
```

Ideally, we would use better variable names instead of `firstPage`, `secondPage` and `thirdPage` (for example, `feedPage` and `signInPage`), but for the purposes of this tutorial, we'll stick to these basic names. Feel free to add some content to the new `Page` elements (such as a paragraph) — ensure that both contain a `Section` element for proper layouting.

Now create a `PageMenu` element just below the `Header` like so:

```javascript
astronaut.render(
    Container (
        Screen(true) (
            Header (
                // ...
            ),
            PageMenu (
                PageMenuButton({page: firstPage}) ("First page"),
                PageMenuButton({page: secondPage}) ("Second page"),
                PageMenuButton({page: thirdPage}) ("Third page")
            )
            firstPage,
            secondPage,
            thirdPage
        ),
        nameErrorDialog
    )
);
```

Now that you've created the extra pages and referenced them in the `PageMenuButton` elements, you can try switching between pages when testing out your app.

There is only one thing to do to make our navigation menu fully functional. On mobile, you can't open the menu yet, so we'll need to add a button which allows mobile users to open the menu.

In the `Header` element, just above the `Text` element, insert this line:

```javascript
HeaderPageMenuButton({alt: "Open menu"}) ()
```

This newly-added button will:

* Open the navigation menu when pressed.
* Announce "Open menu" to assistive technologies (such as screen readers) when the button is selected, using the `alt` property. Mouse users can also hover over the button to see what it does as a tooltip will appear.
* Have an icon inside it that visually conveys that the button is a menu.
* Automatically hide on non-mobile devices (since it's not needed).

Now that our navigation menu is fully complete, you can navigate between pages. Pages aren't quite screens, though; there's a difference:

* A screen is a distinct area of your app which is part of a progressive navigation flow. It is defined by `Screen`. Screens can have their own header titles and header buttons.
* A page is a subsection of a screen. A screen can contain one or more pages via the `Page` element. Pages can't control the header, and can only mainly be selected through a navigation menu. It is designed for lateral navigation and not progressive navigation.

Screens can also be animated to transition back and fourth between different scenarios. For example, you may have a sign-in screen which then transitions to the main screen of the app. Pages don't have this navigative animatibility aside from being able to fade out and then fade in to show a different page, since they're not designed for conveying progessive navigation.

## Adding extra screens
As we have discussed, we have added pages to our main screen, but we can also add screens to our app to add a progressive flow. First refactor the code to store our current screen in a variable:

```javascript
var mainScreen = Screen(true) (
    Header (
        // ...
    ),
    PageMenu (
        // ...
    )
    firstPage,
    secondPage,
    thirdPage
);

astronaut.render(
    Container (
        mainScreen,
        nameErrorDialog
    )
);
```

Now add another screen:

```javascript
var aboutScreen = Screen (
    Header (
        IconButton({
            icon: "back",
            alt: "Back",
            attributes: {
                "aui-bind": "back"
            }
        }) (),
        Text("About this app")
    ),
    Page(true) (
        Section (
            Heading() ("App information"),
            Paragraph() ("I made this app")
        )
    )
);
```

> **Note:** Just like with `Page` elements, only one `Screen` element should be `Screen(true)` the other elements won't be shown by default on load.

Here, the back button is given the attribute `aui-bind="back"`. This automatically hooks an event to the back button which traverses back a screen when pressed. Now modify the call to `astronaut.render` to reference this screen:

```javascript
astronaut.render(
    Container (
        mainScreen,
        aboutScreen,
        nameErrorDialog
    )
);
```

Now, to go forwards a screen from `mainScreen`, attach an event to a button which runs the command `aboutScreen.screenForward();` by modifying the code for `firstPage`:

```javascript
var aboutButton = Button("navigational") ("Open app information");

var firstPage = Page(true) (
    Section (
        // ...
    ),
    Section (
        // ...
    ),
    Section (
        aboutButton
    )
);

aboutButton.on("click", function() {
    aboutScreen.screenForward();
});
```

Now test the app. You should be able to navigate forwards by pressing the new button, and then navigate back again by pressing the back button in the header.

## Next steps
Congrats! You've got a basic app working. We have other guides for what you can do with Adapt UI, for which you can choose what you want to learn next.

* Learn how to localise your app: [Localising apps using the Adapt UI `l10n` module](localising-apps.md)

There are also a few other things you can do with your app's code:

* You could use the ECMAScript 6 module system to make the screens in your app more modular by defining a screen in each JavaScript file.
* You could use the `astronaut.component` function to further encapsulate screens and other components into their own new combined components that can be reused in multiple places in your app.