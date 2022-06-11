/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export const FOCUSABLES = "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary:not(:disabled), [href]:not(:disabled), [tabindex]:not([tabindex=\"-1\"]):not(:disabled)";

export var focusStack = [];
export var focusTrap = null;
export var focusTrapAllowArrowKeys = false;

export function startTrappingFocus() {
    window.addEventListener("keydown", function(event) {
        if (focusTrap == null) {
            return;
        }

        var focusableChildren = [...focusTrap.querySelectorAll(FOCUSABLES)].filter(function(element) {
            if (element.matches("details:not([open]) *:not(summary)")) {
                return false;
            }

            return true;
        });

        var currentFocusedIndex = focusableChildren.findIndex((child) => child == document.activeElement);

        if ((event.key == "Tab" && event.shiftKey) || (focusTrapAllowArrowKeys && event.key == "ArrowUp")) {
            if (focusableChildren.length == 0) {
                return;
            }

            if (currentFocusedIndex == 0 || currentFocusedIndex == -1) {
                focusableChildren[focusableChildren.length - 1].focus();

                event.preventDefault();
            } else if (event.key == "ArrowUp") {
                focusableChildren[currentFocusedIndex - 1]?.focus();
            }
        } else if (event.key == "Tab" && !event.shiftKey || (focusTrapAllowArrowKeys && event.key == "ArrowDown")) {
            if (focusableChildren.length == 0) {
                return;
            }

            if (currentFocusedIndex == focusableChildren.length - 1 || currentFocusedIndex == -1) {
                focusableChildren[0].focus();

                event.preventDefault();
            } else if (event.key == "ArrowDown") {
                focusableChildren[currentFocusedIndex + 1]?.focus();
            }
        }
    });
}

export function setFocusTrap(element, allowArrowKeys = false) {
    focusTrap = element;
    focusTrapAllowArrowKeys = allowArrowKeys;
}

export function clearFocusTrap() {
    focusTrap = null;
    focusTrapAllowArrowKeys = false;
}

export function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}