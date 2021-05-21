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

## Using `l10n` in HTML
The `l10n` module is designed to easily interact with your HTML code when the `translateApp` function is called. To use l10n strings in your HTML code, write the following:

```html
<p translate>helloWorld</p>
```

This will create a paragraph which will translate the string `helloWorld`, which in English will say "Hello, world!". The `translate` attribute must be added to elements to translate so that the `l10n` module won't translate untranslatable elements.