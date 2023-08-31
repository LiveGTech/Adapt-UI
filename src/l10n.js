/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as requests from "./requests.js";

export class TranslationError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
    }
}

export class Locale {
    constructor(localeCode, source, fallbackLocale = null, metadata = {}) {
        this.localeCode = localeCode;
        this.source = source;
        this.fallbackLocale = fallbackLocale;
        this.metadata = metadata;
    }

    get name() {
        return this.metadata.name;
    }

    get nameShort() {
        return this.metadata.nameShort || this.metadata.name;
    }

    get textDirection() {
        return this.metadata.textDirection || "ltr";
    }

    static fromResource(url, fallbackLocale = null) {
        var thisScope = this;

        return requests.json(url).then(function(data) {
            return Promise.resolve(new thisScope(data.localeCode, data.source, fallbackLocale, data.metadata));
        });
    }

    format(data, options) {
        if (typeof(data) == "number") {
            return Number(data).toLocaleString(this.localeCode.replace(/_/g, "-"), options);
        } else if (data instanceof Date) {
            return data.toLocaleString(this.localeCode.replace(/_/g, "-"), options);
        } else {
            return data;
        }
    }

    createCollator(options = {}) {
        return new Intl.Collator(this.localeCode.split("_")[0], options);
    }

    translationErrorHandler(string) {
        console.warn(`Could not find translation for string \`${string}\``);

        return `?{${string}}`;
    }

    translate(string, args = {}, applyFormatting = true) {
        var unformattedArgs = args;

        if (applyFormatting) {
            Object.keys(args).map((i) => args[i] = this.format(args[i]));
        }

        if (this.source[string] == undefined) {
            if (this.fallbackLocale != null) {
                return this.fallbackLocale.translate(string, args, applyFormatting);
            }

            return this.translationErrorHandler(string);
        }

        var translation = this.source[string];

        // Rule-based translation (dealing with, for example, plural forms)
        if (translation instanceof Object) {
            for (var rule in translation) {
                var replacedRule = rule;

                for (var key in args) {
                    replacedRule = String(replacedRule).split("{" + key + "}").join(unformattedArgs[key]);
                }

                try {
                    if (eval(replacedRule)) {
                        translation = translation[rule];

                        break;
                    }
                } catch (e) {}
            }

            if (translation instanceof Object) {
                var lastRule = Object.keys(translation)[Object.keys(translation).length - 1];

                translation = translation[lastRule];
            }
        }

        for (var key in args) {
            translation = String(translation).split("{" + key + "}").join(args[key]); // Replace arguments globally without RegEx
        }

        return translation;
    }
}

export function getSystemLocaleCode() {
    var rawLocaleCode = navigator.language;

    if (navigator.languages != undefined) {
        rawLocaleCode = navigator.languages[0];
    }

    if (rawLocaleCode.split("-").length == 1) {
        return rawLocaleCode;
    }

    return rawLocaleCode.split("-")[0] + "_" + rawLocaleCode.split("-")[1];
}

export function selectLocaleFromResources(localeResources, fallbackLocaleCode = "en_GB", fallbacks = {}, localeCode = getSystemLocaleCode()) {
    if (typeof(localeResources) != "object") {
        throw new TypeError("Locale source URL list must be an object");
    }

    if (typeof(fallbacks) != "object") {
        throw new TypeError("Locale fallbacks list must be an object");
    }

    if (!localeResources.hasOwnProperty(localeCode)) {
        if (localeResources.hasOwnProperty(fallbackLocaleCode)) {
            localeCode = fallbackLocaleCode;
        } else {
            throw new ReferenceError(`No locale resource found for locale \`${localeCode}\`, and default locale failed`);
        }
    }

    if (localeResources[fallbacks[localeCode]] != undefined) {
        return selectLocaleFromResources(localeResources, fallbackLocaleCode, fallbacks, fallbacks[localeCode]).then(function(fallbackLocale) {
            return Locale.fromResource(localeResources[localeCode], fallbackLocale);         
        });
    }

    return Locale.fromResource(localeResources[localeCode]);
}

export function translateApp(locale, root = document.body, useDocumentElementForLang = true) {
    if (useDocumentElementForLang) {
        document.documentElement.lang = locale.localeCode.split("_")[0];
        document.documentElement.dir = locale.textDirection;
    } else {
        root.lang = locale.localeCode.split("_")[0];
        root.dir = locale.textDirection;
    }

    root.querySelectorAll("[translate]").forEach(function(element) {
        var stringToUse = null;

        // If the string has already been translated, get the `aui-l10nstring` source string
        if (element.hasAttribute("aui-l10nstring")) {
            stringToUse = element.getAttribute("aui-l10nstring");
        } else {
            stringToUse = element.textContent.trim();

            element.setAttribute("aui-l10nstring", stringToUse);
        }

        // Translate the contents of the element
        if (stringToUse != "" && element.getAttribute("translate") != "attributesOnly") {
            element.textContent = locale.translate(stringToUse);
        }

        // Translate the attributes of the element
        for (var i = 0; i < element.attributes.length; i++) {
            if (element.attributes[i].name.startsWith("tl:")) {
                element.setAttribute(element.attributes[i].name.split(":")[1], locale.translate(element.attributes[i].value));
            }
        }
    });
}