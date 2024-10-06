/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as animations from "./animations.js";

export function jump(destinationElement) {
    var screenElement = destinationElement.closest("aui-screen");

    screenElement.querySelectorAll("main").forEach(function(mainElement) {
        if (!mainElement.isSameNode(destinationElement)) {
            mainElement.style.opacity = "0";
            mainElement.hidden = true;
        }
    });

    screenElement.querySelectorAll("aside button[aui-page]").forEach(function(buttonElement) {
        if (screenElement.querySelector(buttonElement.getAttribute("aui-page")).isSameNode(destinationElement)) {
            buttonElement.setAttribute("aui-selected", true);
        } else {
            buttonElement.removeAttribute("aui-selected");
        }
    });

    destinationElement.style.opacity = "1";
    destinationElement.hidden = false;

    return Promise.resolve();
}

export function fade(destinationElement) {
    var screenElement = destinationElement.closest("aui-screen");

    screenElement.querySelectorAll("main").forEach(function(mainElement) {
        if (!mainElement.isSameNode(destinationElement)) {
            animations.fadeOut(mainElement, 250, animations.easingFunctions.EASE_OUT);
        }
    });

    screenElement.querySelectorAll("aside button[aui-page]").forEach(function(buttonElement) {
        if (screenElement.querySelector(buttonElement.getAttribute("aui-page")).isSameNode(destinationElement)) {
            buttonElement.setAttribute("aui-selected", true);
        } else {
            buttonElement.removeAttribute("aui-selected");
        }
    });

    if (destinationElement.hidden == false) {
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        destinationElement.style.opacity = "1";
        destinationElement.hidden = false;

        return;
    }

    destinationElement.style.opacity = "0";

    return new Promise(function(resolve, rejcet) {
        setTimeout(function() {
            animations.fadeIn(destinationElement, 250, animations.easingFunctions.EASE_IN).then(resolve);
        }, 250);
    });
}