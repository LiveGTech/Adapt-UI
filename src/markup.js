/*
    LiveG App Runtime

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function applyBackdrop() {
    document.querySelectorAll("aside").forEach(function(element) {
        var backdrop = document.createElement("aui-backdrop");

        

        element.parentElement.insertBefore(backdrop, element);
    });
}

export function apply() {}