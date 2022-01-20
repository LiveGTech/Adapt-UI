/*
    Adapt UI

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

export function hasAttribute(element, attributeName) {
    return element.hasAttribute(attributeName);
}

export function getAttribute(element, attributeName) {
    return element.getAttribute(attributeName);
}

export function setAttribute(element, attributeName, value) {
    element.setAttribute(attributeName, value);
}

export function addAttribute(element, attributeName) {
    element.setAttribute(attributeName, "");
}

export function removeAttribute(element, attributeName) {
    element.removeAttribute(attributeName);
}

export function hasClass(element, className) {
    return element.classList.contains(className);
}

export function addClass(element, className) {
    return element.classList.add(className);
}

export function removeClass(element, className) {
    return element.classList.remove(className);
}

export function toggleClass(element, className) {
    return element.classList.toggle(className);
}

export function getId(element) {
    return element.id;
}

export function setId(element, value) {
    element.id = value;
}

export function getStyle(element, property) {
    return element.style[property];
}

export function setStyle(element, property, value) {
    element.style[property] = value;
}

export function applyStyle(element, style) {
    Object.keys(style).forEach(function(property) {
        setStyle(element, property, style[property]);
    });
}

export function on(element, event, callback) {
    element.addEventListener(event, callback);
}