/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as aside from "./aside.js";
import * as menus from "./menus.js";
import * as screens from "./screens.js";
import * as dialogs from "./dialogs.js";
import * as dismiss from "./dismiss.js";

export function applyBackdrop(root = document) {
    root.querySelectorAll("aside, aui-menu").forEach(function(element) {
        var backdrop = document.createElement("aui-backdrop");
    
        backdrop.hidden = true;

        backdrop.setAttribute("aui-for", {
            "ASIDE": "aside", "AUI-MENU": "menu"
        }[element.tagName] || "");

        backdrop.addEventListener("click", function() {
            ({
                "ASIDE": aside.close,
                "AUI-MENU": menus.close
            }[element.tagName] || function() {})(element);
        });

        element.parentElement.insertBefore(backdrop, element);
    });
}

export function applyAsides(root = document) {
    root.querySelectorAll("aside").forEach(function(element) {
        element.addEventListener("keydown", function(event) {
            if (event.key == "Escape") {
                aside.close(element);
            }
        });

        aside.addPages(element);
    });
}

export function applyDialogs(root = document) {
    root.querySelectorAll("dialog").forEach(function(element) {
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

export function applyCards(root = document) {
    root.querySelectorAll("aui-card").forEach(function(element) {
        var linkElements = element.querySelectorAll("a");

        if (linkElements.length > 0) {
            element.setAttribute("aui-linked", "");

            element.addEventListener("click", function() {
                linkElements[0].click();
            });
        }
    });
}

export function applyMenus(root = document) {
    root.querySelectorAll("aui-menu").forEach(function(element) {
        element.addEventListener("keydown", function(event) {
            if (event.key == "Escape") {
                event.preventDefault();

                menus.close(element);
            }
        });
    });

    root.querySelectorAll("aui-menu button").forEach(function(element) {
        element.addEventListener("click", function() {
            menus.close(element.closest("aui-menu"));
        });
    });
}

export function applyDismissables(root = document) {
    root.querySelectorAll("[aui-dismissables]").forEach(function(element) {
        element.querySelectorAll(":scope > *").forEach(function(childElement) {
            dismiss.swipeToDismiss(childElement, {
                "up": dismiss.directions.UP,
                "down": dismiss.directions.DOWN,
                "left": dismiss.directions.LEFT,
                "right": dismiss.directions.RIGHT,
                "start": dismiss.directions.START,
                "end": dismiss.directions.END,
                "vertical": dismiss.directions.VERTICAL,
                "horizontal": dismiss.directions.HORIZONTAL,
            }[element.getAttribute("aui-dismissdir")] || undefined);
        });
    });
}

export function applyBindings(root = document) {
    root.querySelectorAll("[aui-bind]").forEach(function(element) {
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

export function apply(root = document) {
    applyBackdrop(root);
    applyAsides(root);
    applyDialogs(root);
    applyCards(root);
    applyMenus(root);
    applyDismissables(root);
    applyBindings(root);
}