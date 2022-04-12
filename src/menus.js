/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as calc from "./calc.js";
import * as a11y from "./a11y.js";
import * as animations from "./animations.js";

export function open(element, openerElement = document.activeElement) {
    if (element.tagName != "AUI-MENU") {
        throw new TypeError(`Expected menu element to open to have a \`aui-menu\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    var openerTop = openerElement.getBoundingClientRect().top;
    var openerLeft = openerElement.getBoundingClientRect().left;

    element.style.display = "block";

    element.style.top = `${Math.min(
        openerTop + openerElement.clientHeight + calc.getRemSize(0.5),
        document.body.clientHeight - element.clientHeight - calc.getRemSize(0.5)
    )}px`;

    element.style.left = `${Math.min(openerLeft, document.body.clientWidth - element.clientWidth - calc.getRemSize(0.5))}px`;

    a11y.focusStack.push(document.activeElement);
    element.querySelector(a11y.FOCUSABLES)?.focus();
    a11y.setFocusTrap(element, true);

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        element.previousSibling.hidden = false;
    }

    return animations.fadeIn(element);
}

export function close(element) {
    if (element.tagName != "AUI-MENU") {
        throw new TypeError(`Expected menu element to open to have a \`aui-menu\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    a11y.clearFocusTrap();
    a11y.focusStack.pop()?.focus();

    if (element.previousSibling?.tagName == "AUI-BACKDROP") {
        element.previousSibling.hidden = true;
    }

    return animations.fadeOut(element).then(function() {
        element.style.display = "none";
        element.style.left = "0";

        return Promise.resolve();
    });
}