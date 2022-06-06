/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as a11y from "./a11y.js";
import * as animations from "./animations.js";

const dummySourceElement = document.createElement("aui-screen");

export var navigationStack = [];
export var navigating = false;

export function back(destinationElement) {
    var backdrop = document.createElement("aui-backdrop");
    var sourceElement = document.querySelector("aui-screen:not([hidden])") || dummySourceElement;

    if (sourceElement == destinationElement) {
        return Promise.resolve();
    }

    if (navigating) {
        return Promise.resolve();
    }

    navigating = true;

    backdrop.setAttribute("aui-for", "main");

    if (sourceElement instanceof Element) {    
        sourceElement.parentElement.insertBefore(backdrop, sourceElement);
    }

    if (document.dir == "rtl") {
        sourceElement.style.right = `0`;
    } else {
        sourceElement.style.left = `0`;
    }

    sourceElement.style.zIndex = `1`;
    sourceElement.hidden = false;

    backdrop.style.zIndex = `1`;
    destinationElement.style.zIndex = `0`;
    destinationElement.hidden = false;

    animations.fadeOut(backdrop, 500);

    if (navigationStack.length > 0) {
        navigationStack.pop();
    }

    a11y.focusStack.pop()?.focus();

    return animations.easeStyleTransition(
        sourceElement,
        document.dir == "rtl" ? "right" : "left",
        parseFloat(getComputedStyle(sourceElement).width),
        500,
        animations.easingFunctions.EASE_IN
    ).then(function() {
        sourceElement.hidden = true;
        navigating = false;

        backdrop.remove();

        return Promise.resolve();
    });
}

export function forward(destinationElement) {
    var backdrop = document.createElement("aui-backdrop");
    var sourceElement = document.querySelector("aui-screen:not([hidden])") || dummySourceElement;
    
    if (sourceElement == destinationElement) {
        return Promise.resolve();
    }

    if (navigating) {
        return Promise.resolve();
    }

    navigating = true;

    backdrop.setAttribute("aui-for", "main");

    if (sourceElement instanceof Element) {    
        sourceElement.parentElement.insertBefore(backdrop, sourceElement);
    }

    if (document.dir == "rtl") {
        destinationElement.style.right = getComputedStyle(destinationElement).width;
    } else {
        destinationElement.style.left = getComputedStyle(destinationElement).width;
    }

    destinationElement.style.zIndex = `1`;
    destinationElement.hidden = false;

    backdrop.style.opacity = `0`;
    backdrop.style.zIndex = `1`;
    sourceElement.style.zIndex = `0`;
    sourceElement.hidden = false;

    animations.fadeIn(backdrop, 500);

    a11y.focusStack.push(document.activeElement);
    navigationStack.push(sourceElement);

    return animations.easeStyleTransition(
        destinationElement,
        document.dir == "rtl" ? "right" : "left",
        0,
        500,
        animations.easingFunctions.EASE_OUT
    ).then(function() {
        sourceElement.hidden = true;
        navigating = false;

        backdrop.remove();

        return Promise.resolve();
    });
}

export function jump(destinationElement) {
    var sourceElement = document.querySelector("aui-screen:not([hidden])") || dummySourceElement;

    if (sourceElement == destinationElement) {
        return Promise.resolve();
    }

    if (navigating) {
        return Promise.resolve();
    }

    navigating = true;

    sourceElement.hidden = true;
    destinationElement.hidden = false;
    navigating = false;

    return Promise.resolve();
}

export function fade(destinationElement) {
    var sourceElement = document.querySelector("aui-screen:not([hidden])") || dummySourceElement;

    if (sourceElement == destinationElement) {
        return Promise.resolve();
    }

    if (navigating) {
        return Promise.resolve();
    }

    navigating = true;

    destinationElement.style.zIndex = `1`;
    destinationElement.style.opacity = `0`;
    destinationElement.hidden = false;

    sourceElement.style.zIndex = `0`;
    sourceElement.hidden = false;

    return animations.fadeIn(destinationElement, 500).then(function() {
        sourceElement.hidden = true;
        navigating = false;

        return Promise.resolve();
    });
}

export function navigateBack() {
    if (navigationStack.length > 0) {
        return back(navigationStack[navigationStack.length - 1]);
    }

    return Promise.resolve();
}