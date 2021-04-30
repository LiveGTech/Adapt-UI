/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as animations from "./animations.js";

const ASIDE_HIDDEN_SCREEN_WIDTH = 800;

var asideWasHideable = null;

export function open(element) {
    if (element.tagName != "ASIDE") {
        throw new TypeError(`Expected aside element to open to have an \`aside\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    if (window.innerWidth > ASIDE_HIDDEN_SCREEN_WIDTH) {
        return Promise.resolve();
    }

    if (document.dir == "rtl") {
        element.style.left = null;
        element.style.right = `-${getComputedStyle(element).width}`;
    } else {
        element.style.left = `-${getComputedStyle(element).width}`;
        element.style.right = null;
    }

    element.style.display = "block";

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        animations.fadeIn(element.previousSibling, 500);
    }

    return animations.easeStyleTransition(
        element,
        document.dir == "rtl" ? "right" : "left",
        0,
        500,
        animations.easingFunctions.EASE_OUT
    );
}

export function close(element) {
    if (element.tagName != "ASIDE") {
        throw new TypeError(`Expected aside element to open to have an \`aside\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    if (window.innerWidth > ASIDE_HIDDEN_SCREEN_WIDTH) {
        return Promise.resolve();
    }

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        animations.fadeOut(element.previousSibling, 500);
    }

    return animations.easeStyleTransition(
        element,
        document.dir == "rtl" ? "right" : "left",
        -parseFloat(getComputedStyle(element).width),
        500,
        animations.easingFunctions.EASE_IN
    ).then(function() {
        element.style.display = "none";
        element.style.left = "0px";

        return Promise.resolve();
    });
}

export function toggle(element) {
    if (element.style.display != "block") {
        return open(element);
    } else {
        return close(element);
    }
}

export function update() {
    var asideIsHideable = window.innerWidth <= ASIDE_HIDDEN_SCREEN_WIDTH;

    if (asideIsHideable == asideWasHideable) {
        return;
    }

    asideWasHideable = asideIsHideable;

    if (asideIsHideable) {
        document.querySelectorAll("aside").forEach(function(element) {
            element.style.display = "none";
        });
    } else {
        document.querySelectorAll("aside").forEach(function(element) {
            element.style.display = "block";
        });

        document.querySelectorAll("aui-backdrop[aui-for='aside']").forEach(function(element) {
            element.hidden = true;
        });
    }
}