# Using ephemeral elements in your app
Adapt UI's ephemeral element manager makes it easy to build dynamic apps, which simplify use cases where [`Screen`s](reference/components/screen.md), [`Dialog`s](reference/components/dialog.md) and [`Menu`s](reference/components/menu.md) must be created on-the-fly. Adapt UI can help with managing these elements by marking them as _ephemeral_ — this means that when those elements are no longer needed (such as a `Dialog` being closed), they will be automatically removed from the DOM.

One such use case is creating a `Screen` that represents a user's profile. When a user's handle is pressed on in the main `Screen`, we want to load the user's details in that `Screen` before showing it. There are two ways of doing this:

* Keep a `Screen` in the root element and modify its contents to display the user's information
* Construct a new `Screen` containing the user's information on-the-fly and add it to the root element

There are pros and cons to both methods. The first option is easy to do in HTML by referencing elements to populate using their `id`, but is less flexible if you need to load another user's profile from the first one (such as a user tagging another user's handle in their bio). The last option (which uses ephemeral element management) allows this flexibility and more ergonomic when using Astronaut but is less straightforward when using HTML and does not allow jumping between `Screen`s (only going back and forward between them).

<!-- @gdocs forstack html -->

## Using ephemeral elements in HTML
Let's say we have a `Button` on our main screen:

```html
<button id="viewProfileButton">View profile</button>
```

In our JavaScript code, we can create a new `Screen` and open it ephemerally like this:

```javascript
var user = {}; // Contains loaded profile data

$g.sel("#viewProfileButton").on("click", function() {
    var screen = $g.create("aui-screen").setAttribute("hidden", true);

    screen.add(
        $g.create("header").add(
            $g.create("button")
                .setAttribute("title", "Back")
                .setAttribute("aui-bind", "back")
                .setAttribute("aria-label", "Back")
                .add(
                    $g.create("img")
                        .setAttribute("src", "path/to/icons/back.svg")
                        .setAttribute("alt", "")
                        .setAttribute("aui-icon", "light")
                )
            ,
            $g.create("span").setText(`${user.name}'s profile`)
        ),
        $g.create("main").add(
            $g.create("section").add(
                $g.create("h1").setText(user.name),
                $g.create("p").setText(user.bio)
            )
        )
    );

    screen.makeEphemeral();

    $g.sel("body").add(screen);

    screen.screenForward();
});
```

The `Screen` is closed and automatically removed from the DOM when the `Button` with `aui-bind` set to `"back"` is pressed. The same would happen if `screen.screenBack` were called.

<!-- @gdocs end -->

<!-- @gdocs forstack astronaut -->

## Using ephemeral elements in Astronaut
Let's say we have a `Button` on our main screen:

```js
var viewProfileButton = Button() ("View profile");
```

In our JavaScript code, we can create a new `Screen` and open it ephemerally like this:

```js
var user = {}; // Contains loaded profile data

viewProfileButton.on("click", function() {
    var screen = await astronaut.addEphemeral(Screen (
        Header (
            IconButton({icon: "back", alt: "Back", bind: "back"}) (),
            Text(`${user.name}'s bio`)
        ),
        Page(true) (
            Section (
                Heading() (user.name),
                Paragraph() (user.bio)
            )
        )
    ));
    
    screen.screenForward();
});
```

The `Screen` is closed and automatically removed from the DOM when the `Button` with `bind` set to `"back"` is pressed. The same would happen if `screen.screenBack` were called.

Notice how we wait for the `Promise` returned by `astronaut.addEphemeral` is resolved: it is important to do this as `astronaut.addEphemeral` will wait until the page has finished loading. The `Promise` resolves to the element that was just added to the root which makes it convenient to perform further actions (such as calling the `screenForward` method).

<!-- @gdocs end -->