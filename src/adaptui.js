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
    show: basic.show,
    hide: basic.hide,
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

function apply(operation, elements) {
    return function() {
        var operationArguments = arguments;

        elements.forEach(function(element) {
            operation(element, ...operationArguments);
        });
    };
}

export function sel(selector) {
    var elements;
    var appliedOperations = {};

    if (selector instanceof Element) {
        elements = [selector];
    } else {
        elements = document.querySelectorAll(selector);
    }

    for (var operation in AVAILABLE_OPERATIONS) {
        appliedOperations[operation] = apply(AVAILABLE_OPERATIONS[operation], elements);
    }

    return appliedOperations;
}

window.addEventListener("load", function() {
    markup.apply(); 
});

window.addEventListener("resize", function() {
    RESIZE_LISTENERS.forEach((listener) => listener());
});