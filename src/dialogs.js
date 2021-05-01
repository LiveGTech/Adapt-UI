/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function open(element) {
    if (element.tagName != "DIALOG") {
        throw new TypeError(`Expected dialog element to open to have a \`dialog\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    element.showModal();
    element.removeAttribute("aui-mode");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return Promise.resolve();
    }

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, 500);
    });
}

export function close(element) {
    if (element.tagName != "DIALOG") {
        throw new TypeError(`Expected dialog element to open to have a \`dialog\` tag, but got \`${element.tagName.toLowerCase()}\` instead`);
    }

    element.setAttribute("aui-mode", "hidden");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.close();

        return Promise.resolve();
    }

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            element.close();

            resolve();
        }, 500);
    });
}