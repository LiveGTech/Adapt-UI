/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as aside from "./aside.js";
import * as screens from "./screens.js";
import * as dialogs from "./dialogs.js";

export function applyBackdrop() {
    document.querySelectorAll("aside").forEach(function(element) {
        var backdrop = document.createElement("aui-backdrop");
    
        backdrop.hidden = true;

        backdrop.setAttribute("aui-for", "aside");

        backdrop.addEventListener("click", function() {
            aside.close(element.closest("aui-screen").querySelector("aside"));
        });

        element.parentElement.insertBefore(backdrop, element);
    });
}

export function applyAsides() {
    document.querySelectorAll("aside").forEach(function(element) {
        aside.addPages(element);
    });
}

export function applyDialogs() {
    document.querySelectorAll("dialog").forEach(function(element) {
        dialogPolyfill.registerDialog(element);

        element.setAttribute("aui-mode", "hidden");

        element.addEventListener("keydown", function(event) {
            if (event.key == "Escape") {
                event.preventDefault();

                dialogs.close(element);
            }
        });
    });
}

export function applyCards() {
    document.querySelectorAll("aui-card").forEach(function(element) {
        var linkElements = element.querySelectorAll("a");

        if (linkElements.length > 0) {
            element.setAttribute("aui-linked", "");

            element.addEventListener("click", function() {
                linkElements[0].click();
            });
        }
    });
}

export function applyBindings() {
    document.querySelectorAll("[aui-bind]").forEach(function(element) {
        var binding = element.getAttribute("aui-bind").toLowerCase();
        var action = function() {};

        switch (binding) {
            case "aside":
                action = () => element.closest("aui-screen").querySelectorAll("aside").forEach(aside.toggle);
                break;

            case "back":
                action = () => screens.navigateBack();
                break;

            case "close":
                action = () => dialogs.close(element.closest("dialog"));
        }

        element.addEventListener("click", function() {
            action();
        });
    });
}

export function apply() {
    applyBackdrop();
    applyAsides();
    applyDialogs();
    applyCards();
    applyBindings();
}