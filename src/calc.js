/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function getRemSize(rem = 1) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}