/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "./adaptui.js";
import * as calc from "./calc.js";
import * as aside from "./aside.js";
import * as menus from "./menus.js";
import * as screens from "./screens.js";
import * as dialogs from "./dialogs.js";
import * as dismiss from "./dismiss.js";
import * as screenScroll from "./screenscroll.js";

export function applyBackdrop(root = document) {
    root.querySelectorAll("aside, aui-menu").forEach(function(element) {
        if (!element.parentElement || !!element._aui_appliedBackdrop) {
            return;
        }

        element._aui_appliedBackdrop = true;

        var backdrop = document.createElement("aui-backdrop");
    
        backdrop.hidden = true;

        backdrop.setAttribute("aui-for", {
            "ASIDE": "aside",
            "AUI-MENU": "menu"
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
        if (!!element._aui_appliedAsides) {
            return;
        }

        element._aui_appliedAsides = true;

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
        if (!!element._aui_appliedDialogs) {
            return;
        }

        element._aui_appliedDialogs = true;

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
        if (!!element._aui_appliedCards) {
            return;
        }

        element._aui_appliedCards = true;

        var linkElements = [...element.querySelectorAll("a[aui-mode~='cardLink']"), ...element.querySelectorAll("a:not([aui-mode~='notCardLink'])")];

        if (linkElements.length > 0 && !(element.getAttribute("aui-mode") || "").split(" ").includes("keepUnlinked")) {
            element.setAttribute("aui-linked", "");

            element.addEventListener("click", function() {
                linkElements[0].click();
            });
        }
    });
}

export function applyMenus(root = document) {
    root.querySelectorAll("aui-menu").forEach(function(element) {
        if (!!element._aui_appliedMenus) {
            return;
        }

        element._aui_appliedMenus = true;

        element.addEventListener("keydown", function(event) {
            if (event.key == "Escape") {
                event.preventDefault();

                menus.close(element);
            }
        });

        element.addEventListener("click", function(event) {
            if (event.target.matches("button") || event.target.closest("button") != null) {
                return;
            }

            element.querySelectorAll("button[aui-submenu]").forEach(function(buttonElement) {
                var submenu = document.querySelector(buttonElement.getAttribute("aui-submenu"));
        
                menus.close(submenu, false);
            });
        });
    });

    root.querySelectorAll("aui-menu button").forEach(function(element) {
        if (!!element._aui_appliedMenus) {
            return;
        }

        if (element.hasAttribute("aui-bind") == "noClose") {
            return;
        }

        if (element.matches("aui-pagination button")) {
            return;
        }

        element._aui_appliedMenus = true;

        var modeOptions = (element.getAttribute("aui-mode") || "").split(" ");
        var hoverEnterTimeout = null;

        function performSubmenuSelection(allowOpen = true, isHover = false) {
            element.closest("aui-menu").querySelectorAll("button[aui-submenu]").forEach(function(buttonElement) {
                if (buttonElement == element) {
                    return;
                }

                var submenu = document.querySelector(buttonElement.getAttribute("aui-submenu"));
        
                if (
                    submenu != null &&
                    (
                        !isHover ||
                        !(submenu.getAttribute("aui-mode") || "").split(" ").includes("persistHover")
                    )
                ) {
                    menus.close(submenu, false);
                }
            });

            if (allowOpen && element.hasAttribute("aui-submenu")) {
                var submenu = document.querySelector(element.getAttribute("aui-submenu"));

                if (submenu != null) {
                    menus.open(submenu, element, element.closest("aui-menu"));

                    return true; // Prevent close
                }
            }

            return false;
        }

        element.addEventListener("click", function() {
            if (performSubmenuSelection()) {
                return;
            }

            if (modeOptions.includes("persist")) {
                return;
            }

            menus.close(element.closest("aui-menu"));
        });

        element.addEventListener("mouseenter", function() {
            hoverEnterTimeout = setTimeout(function() {
                if (hoverEnterTimeout != null) {
                    performSubmenuSelection(!modeOptions.includes("pressToShowSubmenu"), true);
                }
            }, 500);
        });

        element.addEventListener("mouseleave", function() {
            clearTimeout(hoverEnterTimeout);

            hoverEnterTimeout = null;
        });
    });
}

export function applyDismissables(root = document) {
    root.querySelectorAll("[aui-dismissables]").forEach(function(element) {
        if (!!element._aui_appliedDismissables) {
            return;
        }

        element._aui_appliedDismissables = true;

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

export function applyScrollableScreens(root = document) {
    root.querySelectorAll("aui-screenscroll").forEach(function(element) {
        if (!!element._aui_appliedScrollableScreens) {
            return;
        }

        element._aui_appliedScrollableScreens = true;

        var scrollable = new screenScroll.ScrollableScreen($g.sel(element));

        if (element.getAttribute("aui-mode") == "paginated") {
            var paginator = document.createElement("aui-pagination");

            paginator.setAttribute("aria-role", "group");

            scrollable.applyPagination($g.sel(paginator));

            element.parentElement.insertBefore(paginator, element.nextSibling);
        }
    });
}

export function applyTables(root = document) {
    root.querySelectorAll("table").forEach(function(element) {
        if (!!element._aui_appliedTables) {
            return;
        }

        element._aui_appliedTables = true;

        var headerRow = element.querySelector("tr:has(th)");
        var closestColumn = null;
        var currentColumn = null;
        var initialWidth = null;
        var nextInitialWidth = null;
        var initialX = null;

        if (headerRow) {
            function checkPointerPosition(event) {
                if (currentColumn != null) {
                    return;
                }

                closestColumn = null;

                headerRow.querySelectorAll("th").forEach(function(column) {
                    if (!(column.getAttribute("aui-mode") || "").split(" ").includes("resize") || column == headerRow.lastChild) {
                        return;
                    }

                    var rect = column.getBoundingClientRect();
                    var edge = element.matches("[dir='rtl'] *") ? rect.left : rect.right;

                    if (event.clientX >= edge - calc.getRemSize(0.55) && event.clientX < edge + calc.getRemSize(0.25)) {
                        closestColumn = column;
                        initialWidth = rect.width;
                        nextInitialWidth = column.nextSibling ? column.nextSibling.getBoundingClientRect().width : null;
                        initialX = event.clientX;
                    }
                });

                if (closestColumn) {
                    element.setAttribute("aui-resizehover", true);
                } else {
                    element.removeAttribute("aui-resizehover");
                }

                event.preventDefault();
            }

            headerRow.addEventListener("pointerdown", function(event) {
                checkPointerPosition(event);

                currentColumn = closestColumn;
            });

            document.body.addEventListener("pointermove", function(event) {
                if (currentColumn == null) {
                    return;
                }

                if (!element.hasAttribute("aui-resized")) {
                    headerRow.querySelectorAll("th").forEach(function(column) {
                        var rect = column.getBoundingClientRect();

                        column.style.width = `${rect.width}px`;
                    });

                    element.setAttribute("aui-resized", true);
                }

                var delta = element.matches("[dir='rtl'] *") ? initialX - event.clientX : event.clientX - initialX;

                currentColumn.style.width = `${initialWidth + delta}px`;

                if (currentColumn.nextSibling) {
                    currentColumn.nextSibling.style.width = `${nextInitialWidth - delta}px`;
                }
            });

            headerRow.addEventListener("pointermove", checkPointerPosition);

            document.body.addEventListener("pointerup", function() {
                currentColumn = null;
                closestColumn = null;
            });

            document.body.addEventListener("pointerleave", function() {
                currentColumn = null;
                closestColumn = null;
            });

            headerRow.addEventListener("pointerleave", function() {
                element.removeAttribute("aui-resizehover");
            });

            document.body.addEventListener("touchend", function() {
                element.removeAttribute("aui-resizehover");
            });
        }
    });
}

export function applyBindings(root = document) {
    root.querySelectorAll("[aui-bind]").forEach(function(element) {
        if (!!element._aui_appliedBindings) {
            return;
        }

        element._aui_appliedBindings = true;

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
                break;
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
    applyScrollableScreens(root);
    applyTables(root);
    applyBindings(root);
}