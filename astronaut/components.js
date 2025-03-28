/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as core from "../src/core.js";

export function init({components, component}) {
    var parentPath = import.meta.url.split("/").slice(0, -1).join("/");

    function elementToComponent(name, element, elementProps = {}, propAttributes = {}) {
        component({name, positionals: Object.keys(propAttributes)}, function(props, children) {
            props.attributes ||= {};

            props.attributes = {
                ...(elementProps.attributes || {}),
                ...props.attributes
            };

            Object.keys(propAttributes).forEach(function(prop) {
                if (props[prop] || props[prop] === 0 || props[prop] === "") {
                    props.attributes[propAttributes[prop]] = props[prop];
                }
            });

            return components.ElementNode(element, {...elementProps, ...props}) (children);
        });
    }

    elementToComponent("Paragraph", "p");
    elementToComponent("TextFragment", "span");
    elementToComponent("BoldTextFragment", "strong");
    elementToComponent("EmphasisTextFragment", "em");

    component({name: "Badge", positionals: ["alt"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aria-label"] = props.alt || `(${children.map((child) => child.getText()).join(" ")})`;

        return components.ElementNode("aui-badge", props) (children);
    });

    elementToComponent("CodeBlock", "pre");
    elementToComponent("CodeSnippet", "code");

    component({name: "Heading", default: {level: 1}, positionals: ["level"]}, function(props, children) {
        if (![1, 2, 3, 4, 5, 6].includes(props.level)) {
            throw TypeError("The heading level must be an integer between 1 and 6");
        }

        return components.ElementNode(`h${props.level}`, props) (children);
    });

    elementToComponent("UnorderedList", "ul");
    elementToComponent("OrderedList", "ol");
    elementToComponent("ListItem", "li");

    component({name: "Link", positionals: ["source", "openExternal"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["href"] = props.source || "javascript:void(0);";
        props.attributes["aui-mode"] = props.mode || "";

        if (props.openExternal) {
            props.attributes["target"] = "_blank";
        }

        if (props.download) {
            props.attributes["download"] = props.download;
        }

        return components.ElementNode("a", props) (children);
    });

    component({name: "Screen", positionals: ["showing"]}, function(props, children) {
        if (!props.showing) {
            props.attributes ||= {};
            props.attributes["hidden"] = true;
        }

        return components.ElementNode("aui-screen", props) (children);
    });

    component({name: "Page", positionals: ["showing"]}, function(props, children) {
        var id = props.id || `astronaut_${core.generateKey()}`;

        props.attributes ||= {};
        props.attributes["id"] = id;

        if (!props.showing) {
            props.attributes["hidden"] = true;
        }

        return components.ElementNode("main", props) (children);
    });

    elementToComponent("Header", "header");

    component({name: "HeaderPageMenuButton"}, function(props, children) {
        props.icon = "menu";

        props.attributes ||= {};
        props.attributes["aui-bind"] = "aside";

        return components.IconButton(props) (...children);
    });

    component({name: "HeaderActionButton", positionals: ["icon", "alt"]}, function(props, children) {
        props.mode = "action";

        return components.IconButton(props) (...children);
    });

    elementToComponent("NavigationBar", "nav");
    elementToComponent("Footer", "footer", {}, {"mode": "aui-mode"});

    elementToComponent("Menu", "aui-menu", {}, {"mode": "aui-mode"});

    component({name: "MenuButton"}, function(props, children) {
        if (props.submenu?.hasAttribute("id")) {
            props.attributes ||= {};
            props.attributes["aui-submenu"] = `#${props.submenu.getAttribute("id")}`;
        }

        if (props.mode) {
            props.attributes ||= {};
            props.attributes["aui-mode"] = props.mode;
        }

        if (props.isCheckable || props.isChecked) {
            props.attributes ||= {};
            props.attributes["aria-role"] = "checkbox";

            if (props.isChecked) {
                props.attributes["aria-checked"] = true;
            }
        }

        return components.Button(props) (...children);
    });

    component({name: "IconMenuButton", positionals: ["icon"]}, function(props, children) {
        props.attributes ||= {};

        props.attributes["aui-mode"] = "icon";

        if (!props.icon) {
            return components.MenuButton(props) (...children);
        }

        return components.MenuButton(props) (
            components.Icon(props.icon, "dark embedded"),
            ...children
        );
    });

    elementToComponent("PageMenu", "aside");

    component({name: "PageMenuButton"}, function(props, children) {
        if (props.page?.hasAttribute("id")) {
            props.attributes ||= {};
            props.attributes["aui-page"] = `#${props.page.getAttribute("id")}`;

            if (!props.page.hasAttribute("hidden")) {
                props.attributes["aui-selected"] = true;
            }
        }

        if (props.selected) {
            props.attributes ||= {};
            props.attributes["aui-selected"] = true;
        }

        return components.Button(props) (...children);
    });

    elementToComponent("Section", "section", {}, {"mode": "aui-mode"});
    elementToComponent("ButtonRow", "aui-buttons", {}, {"mode": "aui-mode"});
    elementToComponent("Message", "aui-message");
    elementToComponent("Dependency", "aui-dependency");
    elementToComponent("Note", "blockquote", {}, {"mode": "aui-mode"});

    component("Figure", function(props, children) {
        return components.ElementNode("figure", props) (
            ...children.slice(1),
            components.ElementNode("figcaption") (children[0])
        );
    });

    component({name: "Accordion", positionals: ["open"]}, function(props, children) {
        if (props.open) {
            props.attributes ||= {};
            props.attributes["open"] = true;
        }

        if (props.mode) {
            props.attributes ||= {};
            props.attributes["aui-mode"] = props.mode;
        }

        return components.ElementNode("details", props) (
            components.ElementNode("summary") (children[0]),
            ...children.slice(1)
        );
    });

    component({name: "SkeletonLoader", positionals: ["alt"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aui-skeleton"] = true;
        props.attributes["aria-label"] = props.alt || "";

        var container = components.Container(props) (...children);

        container.find("button, input")
            .setAttribute("disabled", true)
            .setAttribute("aria-hidden", true)
        ;

        return container;
    });

    elementToComponent("Separator", "hr");
    elementToComponent("LineBreak", "br");

    elementToComponent("PropertyList", "dl");
    elementToComponent("PropertyName", "dt");
    elementToComponent("PropertyValue", "dd");

    component("Property", function(props, children) {
        return components.Container(props) (
            components.PropertyName() (children[0]),
            components.PropertyValue() (...children.slice(1))
        );
    });

    elementToComponent("Button", "button", {}, {"mode": "aui-mode", "bind": "aui-bind"});
    elementToComponent("NavigationalButton", "button", {attributes: {"aui-mode": "navigational"}});

    component({name: "IconButton", positionals: ["icon", "alt"]}, function(props, children) {
        if (props.alt) {
            props.attributes ||= {};
            props.attributes["title"] = props.alt;
            props.attributes["aria-label"] = props.alt;
        }

        return components.Button(props) (
            Icon(props.icon, props.iconType || "light") (),
            ...children
        );
    });

    elementToComponent("ListButton", "button", {attributes: {"aui-listitem": true}});
    elementToComponent("IconListButton", "button", {attributes: {"aui-listitem": "icon"}});

    component("Label", function(props, children) {
        var id = props.id || `astronaut_${core.generateKey()}`;

        if (children[0]?.is("input")) { // Such as checkboxes and radio buttons
            children[0].setAttribute("id", id);

            return components.Container() (
                children[0],
                components.ElementNode("label", {attributes: {
                    "for": id,
                    "aui-mode": children[0].is("[role='switch']") ? "switch" : null
                }, ...props}) (children[1] || undefined),
                ...children.slice(2)
            )
        }

        children[1]?.setAttribute("id", id);

        return components.Container() (
            components.ElementNode("label", {attributes: {
                "for": id,
                "aui-mode": children[1]?.is("input[role='switch']") ? "switch" : null
            }, ...props}) (children[0] || undefined),
            ...children.slice(1)
        );
    });

    elementToComponent("Input", "input", {}, {
        type: "type",
        placeholder: "placeholder",
        mode: "aui-mode",
        value: "value"
    });

    elementToComponent("NumericalInput", "input", {attributes: {"type": "number"}}, {
        placeholder: "placeholder",
        mode: "aui-mode",
        min: "min",
        max: "max",
        step: "step",
        value: "value"
    });

    elementToComponent("RangeSliderInput", "input", {attributes: {"type": "range"}}, {
        min: "min",
        max: "max",
        step: "step",
        value: "value"
    });

    elementToComponent("CheckboxInput", "input", {attributes: {"type": "checkbox"}}, {
        type: "type",
        mode: "aui-mode",
        value: "checked"
    });

    elementToComponent("RadioButtonInput", "input", {attributes: {"type": "radio"}}, {
        type: "type",
        mode: "aui-mode",
        group: "name",
        value: "checked"
    });

    elementToComponent("SwitchInput", "input", {attributes: {"type": "checkbox", "role": "switch"}}, {
        type: "type",
        mode: "aui-mode",
        value: "checked"
    });

    component("TextInputArea", function(props, children) {
        props.attributes ||= {};
        props.attributes["placeholder"] = props.placeholder || "";
        props.attributes["aui-mode"] = props.mode || "";

        var element = components.ElementNode("textarea", props) ();

        if (props.value) {
            element.setValue(props.value);
        }

        return element;
    });

    component({name: "SelectionInput", positionals: ["mode", "value"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aui-mode"] = props.mode || "";

        var element = components.ElementNode("select", props) (...children);

        if (props.value) {
            element.setValue(props.value);
        }

        return element;
    });

    elementToComponent("SelectionInputOption", "option", {}, {
        value: "value"
    });

    elementToComponent("ProgressIndicator", "progress", {}, {
        mode: "aui-mode",
        max: "max",
        value: "value"
    });

    component({name: "Image", positionals: ["source", "alt"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["src"] = props.source;
        props.attributes["alt"] = props.alt || "";

        return components.ElementNode("img", props) (...children);
    });

    component({name: "Icon", positionals: ["icon", "type"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aui-icon"] = props.type || "dark";
        props.attributes["aria-hidden"] = true;

        return components.Image({...props, source: `${parentPath}/../icons/${props.icon}.svg`}) (...children);
    });

    elementToComponent("Cards", "aui-cards", {}, {mode: "aui-mode"});
    elementToComponent("Card", "aui-card", {}, {mode: "aui-mode"});

    component({name: "CardBackgroundImage", positionals: ["source", "alt"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aui-mode"] = "background";

        return components.Image(props) (...children);
    });

    elementToComponent("Table", "table", {}, {
        mode: "aui-mode"
    });

    elementToComponent("TableHeader", "thead");
    elementToComponent("TableMain", "tbody");
    elementToComponent("TableRow", "tr");

    elementToComponent("TableHeaderCell", "th", {}, {
        mode: "aui-mode"
    });

    elementToComponent("TableCell", "td");

    elementToComponent("Dialog", "dialog", {attributes: {"aui-mode": "hidden"}});

    elementToComponent("DialogContent", "aui-dialogcontent");

    elementToComponent("ScrollableScreenContainer", "aui-screenscroll", {}, {mode: "aui-mode"});
    elementToComponent("Pagination", "aui-pagination");

    component({name: "BrandWordmark", positionals: ["alt", "logoSource", "mode"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aui-mode"] = props.mode || "";
        props.attributes["aria-label"] = props.alt || "";

        return components.ElementNode("aui-wordmark", props) (
            Image(props.logoSource || "https://liveg.tech/logo.png") (),
            ...children
        );
    });
}