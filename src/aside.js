/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as a11y from "./a11y.js";
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

    a11y.focusStack.push(document.activeElement);
    element.querySelector(a11y.FOCUSABLES)?.focus();
    a11y.setFocusTrap(element, true);

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        animations.fadeIn(element.previousSibling, 500, animations.easingFunctions.EASE_OUT);
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

    a11y.clearFocusTrap();
    a11y.focusStack.pop()?.focus();

    if (window.innerWidth > ASIDE_HIDDEN_SCREEN_WIDTH) {
        return Promise.resolve();
    }

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        animations.fadeOut(element.previousSibling, 500, animations.easingFunctions.EASE_IN);
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

export function addPages(element) {
    element.querySelectorAll("button[aui-page]").forEach(function(buttonElement) {
        var pageSelector = buttonElement.getAttribute("aui-page");

        buttonElement.addEventListener("click", function() {
            element.parentNode.querySelectorAll("main").forEach(function(mainElement) {
                if (mainElement != element.parentNode.querySelector(pageSelector)) {
                    animations.fadeOut(mainElement, 250, animations.easingFunctions.EASE_OUT);
                }
            });

            element.querySelectorAll("button[aui-page]").forEach(function(otherButtonElement) {
                otherButtonElement.removeAttribute("aui-selected");
            });

            buttonElement.setAttribute("aui-selected", "");

            close(element);

            if (element.parentNode.querySelector(pageSelector).hidden == false) {
                return;
            }

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                element.parentNode.querySelector(pageSelector).style.opacity = "1";
                element.parentNode.querySelector(pageSelector).hidden = false;

                return;
            }

            element.parentNode.querySelector(pageSelector).style.opacity = "0";

            setTimeout(function() {
                animations.fadeIn(element.parentNode.querySelector(pageSelector), 250, animations.easingFunctions.EASE_IN);
            }, 250);
        });
    });
}