# Localising apps using the Adapt UI `l10n` module
Internationalisation (i18n) and localisation (l10n) are key to ensuring that your apps work worldwide and can be used by people whose primary language is different from yours. I18n is the process of ensuring that your app is adaptive to different cultures and locales (such as ensuring that apps work in a right-to-left (RTL) text direction), and l10n is the process of translating apps into different languages.

This guide assumes that you have got a basic app working so that you can then apply the l10n features to it. If you haven't got a basic app working yet, follow the [Getting started with Adapt UI](getting-started.md) guide.

## Creating locale resource files
The first thing to do is create a locale resource for English which we can use a basis for translating our app into other locales. Create a folder called `l10n` in the root folder of your app and then create a new file called `en_GB.json` inside of that:

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