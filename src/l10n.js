/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as requests from "./requests.js";

export class TranslationError extends error {
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
        this.textDirection = metadata;
    }

    static fromResource(url, fallbackLocale = null) {
        return requests.json(url).then(function(data) {
            return Promise.resolve(new this(data.localeCode, data.source, fallbackLocale, data.metadata));
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

    translate(string, args = {}, applyFormatting = true) {
        if (applyFormatting) {
            Object.keys(args).map((i) => args[i] = this.format(args[i]));
        }

        if (this.source[string] == undefined) {
            if (this.fallbackLocale != null) {
                return this.fallbackLocale.translate(string, args, applyFormatting);
            }

            throw new TranslationError(`Could not find translation for string \`${string}\``);
        }

        var translation = this.source[string];

        // Rule-based translation (dealing with, for example, plural forms)
        if (translation instanceof Object) {
            for (var rule in translation) {
                var replacedRule = rule;

                for (var key in args) {
                    replacedRule = String(replacedRule).split("{" + key + "}").join(args[key]);
                }

                try {
                    if (eval(replacedRule)) {
                        translation = translation[rule];

                        break;
                    }
                } catch (e) {}
            }

            if (translation instanceof Object) {
                var lastRule = Object.keys(translation)[Object.keys(translation) - 1];

                translation = translation[lastRule];
            }
        }

        for (var key in args) {
            translation = String(translation).split("{" + key + "}").join(args[key]); // Replace arguments globally without RegEx
        }
    }
}