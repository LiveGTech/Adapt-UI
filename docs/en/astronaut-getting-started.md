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
        Header() (
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
var helloHeader = Header() ("Hello, world!")
```

Here, `Input` refers to a text input, and `Button` refers to a pressable button. The property `mode` being set to `"secondary"` will make the button be coloured in the secondary colour (to signify that the button isn't the primary action).

> **Note:** Using the value `"dangerous"` for the `mode` property will colour the button in red. This is useful for marking buttons that delete things as potentially dangerous to the user.

Now add a section below our current `Section` in our app, like so:

```javascript
astronaut.render(
    Screen(true) (
        Header() (
            Text("My First App")
        ),
        Page(true) (
            Section (
                helloHeader,
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

Note how we've replaced the original header with `helloHeader` in the first `Section`.

Of course our code doesn't actually do anything yet — we'll need to add the functionality to set the `helloHeader` header when a name is entered before `astronaut.render`:

```javascript
saveButton.on("click", function() {
    helloHeader.setText(`Hello, ${nameInput.getValue()}!`);
});

clearButton.on("click", function() {
    nameInput.setValue("");
});
```

Now try entering your name and press the **Save** button. Your name should appear in the header!

> **Note:** If the syntax for adding events and setting text and input values feels familiar to you, that is because the methods under components are the same as those under `$g.sel()` and `$g.create()`.

<!-- TODO: Add rest of guide for Astronaut, following on from HTML version of getting started guide -->