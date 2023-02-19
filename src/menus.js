/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as calc from "./calc.js";
import * as a11y from "./a11y.js";
import * as animations from "./animations.js";

export function open(element, openerElement = document.activeElement, parentMenu = null) {
    if (element.tagName != "AUI-MENU") {
        throw new TypeError(`Expected menu element to open to have a \`aui-menu\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    if (element._aui_open) {
        return;
    }

    var modeOptions = (element.getAttribute("aui-mode") || "").split(" ");
    var openerTop = openerElement.getBoundingClientRect().top;
    var openerLeft = openerElement.getBoundingClientRect().left;

    element._aui_open = true;
    element._aui_parentMenu = parentMenu;

    element.hidden = false;
    element.style.display = "block";

    if (!modeOptions.includes("centred")) {
        if (modeOptions.includes("openSide") || (openerElement.hasAttribute("aui-submenu") && !modeOptions.includes("openAligned"))) {
            element.style.top = `${Math.min(openerTop, document.body.clientHeight - element.clientHeight - calc.getRemSize(0.5))}px`;

            if (!element.matches("[dir='rtl'] *")) {
                element.style.left = `${Math.min(
                    openerLeft + openerElement.clientWidth + calc.getRemSize(0.5),
                    document.body.clientWidth - element.clientWidth - calc.getRemSize(0.5)
                )}px`;
            } else {
                element.style.left = `${Math.max(
                    openerLeft - element.clientWidth - calc.getRemSize(0.5),
                    calc.getRemSize(0.5)
                )}px`;
            }
        } else {
            element.style.top = `${Math.min(
                openerTop + openerElement.clientHeight + calc.getRemSize(0.5),
                document.body.clientHeight - element.clientHeight - calc.getRemSize(0.5)
            )}px`;
    
            element.style.left = `${Math.min(openerLeft, document.body.clientWidth - element.clientWidth - calc.getRemSize(0.5))}px`;
        }
    }

    a11y.focusStack.push(document.activeElement);
    element.querySelector(a11y.FOCUSABLES)?.focus();
    a11y.setFocusTrap(element, true);

    if (element.previousSibling?.tagName == "AUI-BACKDROP" && !openerElement.hasAttribute("aui-submenu")) {
        if (modeOptions.includes("blur")) {
            animations.fadeIn(element.previousSibling, 250, animations.easingFunctions.EASE_OUT);
        } else {
            element.previousSibling.style.opacity = 0;
            element.previousSibling.hidden = false;
        }
    }

    element.dispatchEvent(new CustomEvent("open"));

    return animations.fadeIn(element, 250, animations.easingFunctions.EASE_IN);
}

export function close(element, closeParentMenus = true) {
    if (element.tagName != "AUI-MENU") {
        throw new TypeError(`Expected menu element to open to have a \`aui-menu\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    if (!element._aui_open) {
        return;
    }

    element._aui_open = false;

    var modeOptions = (element.getAttribute("aui-mode") || "").split(" ");

    a11y.clearFocusTrap();
    a11y.focusStack.pop()?.focus();

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        if (modeOptions.includes("blur")) {
            animations.fadeOut(element.previousSibling, 250, animations.easingFunctions.EASE_IN);
        } else {
            element.previousSibling.style.opacity = 0;
            element.previousSibling.hidden = true;
        }
    }

    element.querySelectorAll("button[aui-submenu]").forEach(function(buttonElement) {
        var submenu = document.querySelector(buttonElement.getAttribute("aui-submenu"));

        if (submenu != null) {
            close(submenu, false);
        }
    });

    if (closeParentMenus && element._aui_parentMenu != null) {
        close(element._aui_parentMenu);
    }

    element.dispatchEvent(new CustomEvent("close"));

    return animations.fadeOut(element, 250, animations.easingFunctions.EASE_OUT).then(function() {
        element.style.display = "none";
        element.style.left = "0";

        return Promise.resolve();
    });
}