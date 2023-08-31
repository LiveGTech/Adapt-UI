/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import "../lib/dialog-polyfill.js";

import * as basic from "./basic.js";
import * as a11y from "./a11y.js";
import * as device from "./device.js";
import * as animations from "./animations.js";
import * as markup from "./markup.js";
import * as aside from "./aside.js";
import * as screens from "./screens.js";
import * as dialogs from "./dialogs.js";
import * as menus from "./menus.js";
import * as dismiss from "./dismiss.js";

export * as core from "./core.js";
export * as requests from "./requests.js";
export * as l10n from "./l10n.js";
export * as templates from "./templates.js";
export * as theme from "./theme.js";

export const VERSION = "0.1.0";
export const VERNUM = 0;

const AVAILABLE_OPERATIONS = {
    get: basic.get,
    is: basic.is,
    show: basic.show,
    hide: basic.hide,
    clear: basic.clear,
    getText: basic.getText,
    setText: basic.setText,
    getHTML: basic.getHTML,
    setHTML: basic.setHTML,
    getValue: basic.getValue,
    setValue: basic.setValue,
    hasAttribute: basic.hasAttribute,
    getAttribute: basic.getAttribute,
    setAttribute: basic.setAttribute,
    addAttribute: basic.addAttribute,
    removeAttribute: basic.removeAttribute,
    hasClass: basic.hasClass,
    addClass: basic.addClass,
    removeClass: basic.removeClass,
    toggleClass: basic.toggleClass,
    getId: basic.getId,
    setId: basic.setId,
    getStyle: basic.getStyle,
    setStyle: basic.setStyle,
    applyStyle: basic.applyStyle,
    on: basic.on,
    emit: basic.emit,
    focus: basic.focus,
    blur: basic.blur,
    easeStyleTransition: animations.easeStyleTransition,
    fadeIn: animations.fadeIn,
    fadeOut: animations.fadeOut,
    switchFrom: animations.switchFrom,
    collapse: animations.collapse,
    asideOpen: aside.open,
    asideClose: aside.close,
    screenBack: screens.back,
    screenForward: screens.forward,
    screenJump: screens.jump,
    screenFade: screens.fade,
    dialogOpen: dialogs.open,
    dialogClose: dialogs.close,
    menuOpen: menus.open,
    menuClose: menus.close,
    swipeToDismiss: dismiss.swipeToDismiss
};

const RESIZE_LISTENERS = [
    aside.update
];

var loaded = false;

function apply(operation, elements, multiReturn) {
    return function() {
        var operationArguments = arguments;
        var returns = [];

        elements.forEach(function(element) {
            returns.push(operation(element, ...operationArguments));
        });

        if (multiReturn) {
            return returns;
        }

        return returns[0] == undefined ? sel(elements) : returns[0];
    };
}

export function sel(selector, multiReturn = false) {
    var elements;
    var appliedOperations = {};

    if (selector instanceof Element) {
        elements = [selector];
    } else if (selector instanceof Object) {
        elements = selector;
    } else {
        elements = [...document.querySelectorAll(selector)];
    }

    appliedOperations["getAll"] = function() {
        return elements;
    };

    appliedOperations["items"] = function() {
        return elements.map((element) => sel(element));
    };

    appliedOperations["find"] = function(selector) {
        return sel(elements.map((element) => [...element.querySelectorAll(selector)]).flat());
    };

    appliedOperations["where"] = function(selector) {
        return sel(elements.filter((element) => element.matches(selector)));
    };

    appliedOperations["filter"] = function(filterFunction) {
        return sel(elements.filter((element) => filterFunction(sel(element))));
    };

    appliedOperations["map"] = function(mapFunction) {
        return elements.map((element, i) => mapFunction(sel(element), i));
    };

    appliedOperations["forEach"] = function(iterationFunction) {
        elements.forEach((element, i) => iterationFunction(sel(element), i));

        return sel(elements);
    };

    appliedOperations["ancestor"] = function(selector) {
        return sel([...new Set(
            elements
                .map((element) => element.closest(selector))
                .filter((element) => element != null)
        )]);
    };

    appliedOperations["first"] = function() {
        return sel(elements[0]);
    };

    appliedOperations["last"] = function() {
        return sel(elements[elements.length - 1]);
    };

    appliedOperations["prev"] = function(selector, condition = (element) => true) {
        return sel(elements.map(function(element) {
            while (true) {
                element = element.previousSibling;
    
                if (!element) {
                    return null;
                }
        
                if (element.nodeType != Node.ELEMENT_NODE) {
                    continue;
                }
        
                if (!condition(element)) {
                    continue;
                }
        
                if (element.matches(selector)) {
                    return element;
                }
            }
        }).filter((element) => element != null));
    };

    appliedOperations["next"] = function(selector, condition = (element) => true) {
        return sel(elements.map(function(element) {
            while (true) {
                element = element.nextSibling;
    
                if (!element) {
                    return null;
                }
        
                if (element.nodeType != Node.ELEMENT_NODE) {
                    continue;
                }
        
                if (!condition(element)) {
                    continue;
                }
        
                if (element.matches(selector)) {
                    return element;
                }
            }
        }).filter((element) => element != null));
    };

    appliedOperations["add"] = function() {
        var addArgs = [...arguments];

        elements.forEach(function(element) {
            element.append(...addArgs.map(function(elementToAdd) {
                if (elementToAdd instanceof Object) {
                    return elementToAdd.getAll();
                }

                return [elementToAdd];
            }).flat());
        });

        return sel(elements);
    };

    appliedOperations["remove"] = function() {
        elements.forEach((element) => element.remove());

        // Don't allow currying since there are no elements selected
    };

    appliedOperations["condition"] = function(condition, ifTrue, ifFalse = (selection) => selection) {
        if (condition) {
            return ifTrue(sel(elements));
        }

        return ifFalse(sel(elements));
    };

    appliedOperations["choose"] = function() {
        var args = [...arguments];
        var testValue = args.shift();

        while (args.length > 0) {
            if (args.length >= 2) {
                var targetValue = args.shift();
                var ifEqual = args.shift();

                if (targetValue == testValue) {
                    return ifEqual(sel(elements));
                }
            } else {
                return args.shift()(sel(elements));
            }
        }

        return sel(elements);
    };

    appliedOperations["copy"] = function() {
        return sel(elements.map((element) => element.cloneNode(true)));
    };

    for (var operation in AVAILABLE_OPERATIONS) {
        appliedOperations[operation] = apply(AVAILABLE_OPERATIONS[operation], elements, multiReturn);
    }

    appliedOperations._aui = true;

    return appliedOperations;
}

export function prev(element, selector, condition = (element) => true) {
    if (!(element instanceof Element)) {
        element = element.get();
    }

    while (true) {
        element = element.previousSibling;

        if (!element) {
            return {};
        }

        if (element.nodeType != Node.ELEMENT_NODE) {
            continue;
        }

        if (!condition(element)) {
            continue;
        }

        if (element.matches(selector)) {
            return sel(element);
        }
    }
}

export function next(element, selector, condition = (element) => true) {
    if (!(element instanceof Element)) {
        element = element.get();
    }

    while (true) {
        element = element.nextSibling;

        if (!element) {
            return {};
        }

        if (element.nodeType != Node.ELEMENT_NODE) {
            continue;
        }

        if (!condition(element)) {
            continue;
        }

        if (element.matches(selector)) {
            return sel(element);
        }
    }
}

export function create(tagName) {
    return sel(document.createElement(tagName));
}

export function waitForLoad() {
    return new Promise(function(resolve, reject) {
        if (loaded) {
            resolve();

            return;
        }

        window.addEventListener("load", resolve);
    });
}

if (document.readyState == "complete") {
    loaded = true;
} else {
    window.addEventListener("load", function() {
        loaded = true;
    });
}

waitForLoad().then(function() {
    a11y.startTrappingFocus();
    device.startChecking();

    markup.apply();

    console.log(`%c ◔%c LiveG Adapt UI \n%cV${VERSION} · https://github.com/LiveGTech/Adapt-UI · Ready!`, `
        background-color: rgb(80, 145, 247);
        color: yellow;
        font-size: 20px;
        font-family: "URW Gothic L Book", sans-serif;
    `,`
        background-color: rgb(80, 145, 247);
        color: white;
        font-size: 20px;
        font-family: "URW Gothic L Book", sans-serif;
    `, `
        margin-top: 6px;
        font-size: 12px;
        font-family: "URW Gothic L Book", sans-serif;
    `);
});

window.addEventListener("resize", function() {
    RESIZE_LISTENERS.forEach((listener) => listener());
});