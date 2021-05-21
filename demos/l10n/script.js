import * as $g from "../../src/adaptui.js";

function applyL10n(localeCode = $g.l10n.getSystemLocaleCode()) {
    return $g.l10n.selectLocaleFromResources({
        "en_GB": "locales/en_GB.json",
        "fr_FR": "locales/fr_FR.json",
        "ar_AE": "locales/ar_AE.json",
        "zh_CN": "locales/zh_CN.json",
        "ru_RU": "locales/ru_RU.json"
    }, "en_GB", {}, localeCode).then(function(locale) {
        window._ = function() {
            return locale.translate(...arguments);
        };
    
        $g.l10n.translateApp(locale);
    });
}

$g.waitForLoad().then(function() {
    return applyL10n();
}).then(function() {
    $g.sel("#selectLanguageButton").on("click", function() {
        $g.sel("#selectLanguage").dialogOpen();
    });

    $g.sel("#saveButton").on("click", function() {
        $g.sel("#helloHeader").setText(_("helloText", {name: $g.sel("#name").getValue()}));
    });

    $g.sel("#clearButton").on("click", function() {
        $g.sel("#name").setValue("");
    });

    $g.sel("#selectLanguageDone").on("click", function() {
        applyL10n($g.sel("#chosenLanguage").getValue());
    });
});