/*
    LiveG App Runtime

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function get(element) {
    return element;
}

export function show(element) {
    element.hidden = false;
}

export function hide(element) {
    element.hidden = true;
}

export function getText(element) {
    return element.textContent;
}

export function setText(element, value) {
    element.textContent = value;
}

export function getHTML(element) {
    return element.innerHTML;
}

export function setHTML(element, value) {
    element.innerHTML = value;
}

export function getValue(element) {
    if (element.tagName == "INPUT" && ["checkbox", "radio"].includes(element.getAttribute("type"))) {
        return element.checked;
    }

    return element.value;
}

export function setValue(element, value) {
    if (element.tagName == "INPUT" && ["checkbox", "radio"].includes(element.getAttribute("type"))) {
        if (value == "indeterminate" && element.getAttribute("type") == "checkbox") {
            element.checked = true;
            element.indeterminate = true;
        } else if (value) {
            element.checked = true;
            element.indeterminate = false;
        } else {
            element.checked = false;
            element.indeterminate = false;
        }

        return;
    }

    element.value = value;
}

export function on(element, event, callback) {
    element.addEventListener(event, callback);
}