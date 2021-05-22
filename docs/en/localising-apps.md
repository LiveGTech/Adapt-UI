# Localising apps using the Adapt UI `l10n` module
Internationalisation (i18n) and localisation (l10n) are key to ensuring that your apps work worldwide and can be used by people whose primary language is different from yours. I18n is the process of ensuring that your app is adaptive to different cultures and locales (such as ensuring that apps work in a right-to-left (RTL) text direction), and l10n is the process of translating apps into different languages.

This guide assumes that you have got a basic app working so that you can then apply the l10n features to it. If you haven't got a basic app working yet, follow the [Getting started with Adapt UI](getting-started.md) guide.

## Creating locale resource files
The first thing to do is create a locale resource for English which we can use a basis for translating our app into other locales. Create a folder called `locales` in the root folder of your app and then create a new file called `en_GB.json` inside of that:

```json
{
    "localeCode": "en_GB",
    "metadata": {
        "name": "English (United Kingdom)",
        "nameShort": "English",
        "textDirection": "ltr"
    },
    "source": {
        "helloWorld": "Hello, world!"
    }
}
```

> **Note:** You can choose any locale as the default (such as, for example, `en_US` or `en_AU`), but you will need to set the second parameter of `selectLocaleFromResources` when we need it in a bit, like so: `$g.l10n.selectLocaleFromResources(localeResources, "en_US")`

As you can see, we already have a source string called `helloWorld` which is translated to "Hello, world!" in English. Other parts of the locale resource file are:

* **`localeCode`:** Defines what locale code the locale resource is for.
* **`metadata`:** Defines the properties of the given locale.
* **`metadata.name`:** The full name of the locale (usually including the locale's country or region variant, if any).
* **`metadata.nameShort`**: the short name of the locale (usually excluding the locale's country or region variant, if any).
* **`metadata.textDirection`**: The direction that the translated text should be displayed in, such as left-to-right (`ltr`) for most languages, and right-to-left (`rtl`) for some Middle-Eastern langauges.

## Using the `l10n` module to enable l10n
So, we've created a locale resource file, but we need to tell the `l10n` module to retrieve the resource for use in l10n.

In your app's script, add the following:

```javascript
import * as $g from "/path/to/src/adaptui.js";

$g.waitForLoad().then(function() {
    return $g.l10n.selectLocaleFromResources({
        "en_GB": "locales/en_GB.json"
    });
}).then(function(locale) {
    window._ = function() {
        return locale.translate(...arguments);
    };

    $g.l10n.translateApp(locale);
});
```

Ensure that the reference to `src/adaptui.js` and the new locale resource file is the correct path.

This code will retrieve the appropriate locale resource for the system (in this case, it'll only be the `en_GB` locale) when the app has finished loading and rendering, and once the locale file has been retrieved, the app will be translated from the returned locale instance (the variable `locale`). We also asign a global alias to be `_` which can be used for easily translating strings elsewhere in our app.

> **Note:** Using `.then` will handle a `Promise` from `$g.waitForLoad` and `$g.l10n.selectLocaleFromResources`. Promises allow for asynchronous task management in JavaScript, which is needed here so that locale resources can be downloaded when needed. If you are not familliar with _promise chaining_ (as shown above), we suggest reading the [MDN Web Docs entry for promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining).

## Using `l10n` in HTML
The `l10n` module is designed to easily interact with your HTML code when the `translateApp` function is called. To use l10n strings in your HTML code, write the following:

```html
<p translate>helloWorld</p>
```

This will create a paragraph which will translate the string `helloWorld`, which in English will say "Hello, world!". The `translate` attribute must be added to elements to translate so that the `l10n` module won't translate untranslatable elements.

We suggest aiming to translate every possible textual element in your app so that your app's experience can be enjoyed by people who may speak a different language to your own.

### Translating attributes
All elements which should be translated in some way should make use of the `translate` attribute. However, using `translate` won't translate element attributes right away. Consider this input element:

```html
<input placeholder="Enter your name">
```

When we apply the `translate` attribute, we also need to tell the `l10n` module to translate the placeholder too, like this:

```html
<input translate tl:placeholder="enterName">
```

The `enterName` string can then be added to the locale resources in the same way as other translations are added. The `tl:` prefix to any attribute will translate that attribute's value and apply it to the element. However, all elements with at least one `tl:` prefix present must have a `translate` attribute, too.

> **Note:** If you want to translate the attributes only (and not the textual contents of the element), set the `translate` attribute to be `translate="attributesOnly"`. This is particularly useful if the element has child elements which would otherwise be replaced, or in cases where user-generated content is loaded into an element which you only want to translate the attributes of.

## Using `l10n` in JavaScript
As we mentioned earlier, the global alias function `_` can be used to translate strings programmatically. For example, the following `console.log` command can be localised:

```javascript
console.log("Hello, world!"); // Unlocalised
console.log(_("helloWorld")); // Localised
```

Another example is where you need to set the text contents of an element:

```javascript
$g.sel("#element").setText("Hello, world!"); // Unlocalised
$g.sel("#element").setText(_("helloWorld")); // Localised
```

Because `_` is simply a function, its returned translated value can be used as an argument for any other function, and the value can also be stored in a variable.

Ensure that you only use `_` when it has been initialised, such as after `$g.l10n.translateApp` has been called in your code. Otherwise, using `_` won't work.

## Adding arguments to resource strings
There may be cases where your app needs to translate a string which contains an arbitrary value. For example, your app may personalise greeting messages ─ such as if the user is called Charlie, then your app will show "Hello, Charlie!". The same may go for displaying numbers, too.

To allow arbitrary values to be used in translations, add arguments to strings like so:

```javascript
{
    // ...
    "source": {
        "helloWorld": "Hello, world!",
        "helloName": "Hello, {name}!"
    }
}
```

Here, we can then translate strings and substitute the arguments for values in JavaScript:

```javascript
var name = "Charlie"; // This may be any arbitrary value, such as one read from user input

$g.sel("#greeting").setText(_("helloName", {name: enteredName})); // -> "Hello, Charlie!"
```

> **Note:** Resource string arguments cannot be used in HTML when using the `translate` attribute, so if you need to translate an argument-based string in HTML, you will either need to set the element's text programmatically in JavaScript when your app loads, or add a 'default' string to your locale resources file which is used by your HTML code at startup.

### Conditional strings, such as plurals
In some cases (especially when dealing with plurals), the translation of a string will differ. For example, if you are creating an ecommerce app, then you may have a message that says "You have 5 items in your basket". We can customise the translation to also say "You have 1 item in your basket" depending on the number of items in the user's basket.

The following code achieves this for English:

```javascript
{
    // ...
    "source": {
        "itemsInBasket": {
            "{items} == 0": "You have no items in your basket",
            "{items} == 1": "You have {items} item in your basket",
            "{items} > 1": "You have {items} items in your basket"
        }
    }
}
```

This can then be customised for different locales which have different requirements and rules for pluralisation, such as Polish, Russian and Serbian. The [Localization Guide website](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html) has a comprehensive list of plural forms for most languages.

> **Note:** Conditional string rules (the keys of the objects in the `"source"` part of locale resources) are directly substituted and then evaluated by JavaScript. Whilst this provides a powerful tool for rule determination, ensure that your use of conditional string rules is only restricted to formatted data such as numbers, since maliciously-crafted strings could potentially execute untrusted code.