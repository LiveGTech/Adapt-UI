/*
    LiveG App Runtime

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as basic from "./basic.js";
import * as animations from "./animations.js";
import * as aside from "./aside.js";
import * as screens from "./screens.js";
import * as markup from "./markup.js";

const AVAILABLE_OPERATIONS = {
    get: basic.get,
    show: basic.show,
    hide: basic.hide,
    getText: basic.getText,
    setText: basic.setText,
    getHTML: basic.getHTML,
    setHTML: basic.setHTML,
    on: basic.on,
    getValue: basic.getValue,
    setValue: basic.setValue,
    easeStyleTransition: animations.easeStyleTransition,
    fadeIn: animations.fadeIn,
    fadeOut: animations.fadeOut,
    asideOpen: aside.open,
    asideClose: aside.close,
    screenBack: screens.back,
    screenForward: screens.forward
};

const RESIZE_LISTENERS = [
    aside.update
];

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

        return returns[0];
    };
}

export function sel(selector, multiReturn = false) {
    var elements;
    var appliedOperations = {};

    if (selector instanceof Element) {
        elements = [selector];
    } else {
        elements = document.querySelectorAll(selector);
    }

    for (var operation in AVAILABLE_OPERATIONS) {
        appliedOperations[operation] = apply(AVAILABLE_OPERATIONS[operation], elements, multiReturn);
    }

    return appliedOperations;
}

export function waitForLoad() {
    return new Promise(function(resolve, reject) {
        window.addEventListener("load", resolve);
    });
}

window.addEventListener("load", function() {
    markup.apply(); 
});

window.addEventListener("resize", function() {
    RESIZE_LISTENERS.forEach((listener) => listener());
});