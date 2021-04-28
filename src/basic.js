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
    return element.value;
}

export function setValue(element, value) {
    element.value = value;
}

export function on(element, event, callback) {
    element.addEventListener(event, callback);
}