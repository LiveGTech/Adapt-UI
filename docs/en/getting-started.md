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
<main>
    <aui-screen id="welcome">
        <section>
            <h1>Hello, world!</h1>
            <p>Welcome to my first app using Adapt UI.</p>
        </section>
    </aui-screen>
</main>
```

As you can see, this HTML is easy to interpret and write. Let's break down what the `<aui-screen>`, `<main>` and `<section>` elements do:

* `<aui-screen>` contains elements that will be shown for one specific page in our app. When you want to add more pages, add extra `<aui-screen hidden id="example">` elements.
* `<main>` contains the main contents of our app. When it comes to adding the header navigation bar, the `<main>` element will automatically be resized to accomodate it.
* `<section>` defines a section of unique content in our app. It may contain a variety of information, from user-generated content to a group of inputs.