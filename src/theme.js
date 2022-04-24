/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function getProperty(property) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).trim();
}

export function setProperty(property, value) {
    document.documentElement.style.setProperty(`--${property}`, value.trim());
}