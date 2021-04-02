/*
    LiveG App Runtime

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as animations from "./animations.js";

const ASIDE_HIDDEN_SCREEN_WIDTH = 800;

export function open(element) {
    if (element.tagName != "ASIDE") {
        throw new TypeError(`Expected aside element to open to have an \`aside\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    if (window.innerWidth > ASIDE_HIDDEN_SCREEN_WIDTH) {
        return Promise.resolve();
    }

    element.style.left = `-${getComputedStyle(element).width}`;
    element.style.display = "block";

    return animations.easeStyleTransition(element, "left", 0, 500, animations.easingFunctions.EASE_OUT);
}

export function close(element) {
    if (element.tagName != "ASIDE") {
        throw new TypeError(`Expected aside element to open to have an \`aside\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    if (window.innerWidth > ASIDE_HIDDEN_SCREEN_WIDTH) {
        return Promise.resolve();
    }

    console.log(`-${getComputedStyle(element).width}`);

    return animations.easeStyleTransition(element, "left", -parseFloat(getComputedStyle(element).width), 500, animations.easingFunctions.EASE_IN).then(function() {
        element.style.display = "none";
        element.style.left = "0px";

        return Promise.resolve();
    });
}