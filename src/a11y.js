/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export const FOCUSABLES = "button, input, select, textarea, [href], [tabindex]:not([tabindex=\"-1\"])";

export var focusStack = [];
export var focusTrap = null;

export function startTrappingFocus() {
    window.addEventListener("keyup", function(event) {
        if (focusTrap == null) {
            return;
        }

        var focusableChildren = focusTrap.querySelectorAll(FOCUSABLES);

        if (event.key == "Tab" && !event.shiftKey) {
            if (focusTrap.contains(document.activeElement)) {
                return;
            }

            event.preventDefault();

            focusableChildren[0].focus();
        } else if (event.key == "Tab" && event.shiftKey) {
            if (focusTrap.contains(document.activeElement)) {
                return;
            }

            event.preventDefault();

            focusableChildren[focusableChildren.length - 1].focus();
        }
    });
}

export function setFocusTrap(element) {
    focusTrap = element;
}

export function clearFocusTrap() {
    focusTrap = null;
}