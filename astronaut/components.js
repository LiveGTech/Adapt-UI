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

            Object.keys(propAttributes).forEach(function(prop) {
                if (props[prop]) {
                    props.attributes[propAttributes[prop]] = props[prop];
                }
            });

            return components.ElementNode(element, {...elementProps, ...props}) (children);
        });
    }

    elementToComponent("Paragraph", "p");

    component({name: "Heading", default: {level: 1}, positionals: ["level"]}, function(props, children) {
        if (![1, 2, 3, 4, 5, 6].includes(props.level)) {
            throw TypeError("The heading level must be an integer between 1 and 6");
        }

        return components.ElementNode(`h${props.level}`, props) (children);
    });

    elementToComponent("UnorderedList", "ul");
    elementToComponent("OrderedList", "ol");
    elementToComponent("ListItem", "li");

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

    elementToComponent("PageMenu", "aside");

    component({name: "PageMenuButton"}, function(props, children) {
        if (props.page?.hasAttribute("id")) {
            props.attributes ||= {};
            props.attributes["aui-page"] = `#${props.page.getAttribute("id")}`;

            if (!props.page.hasAttribute("hidden")) {
                props.attributes["aui-selected"] = true;
            }
        }

        return components.Button(props) (...children);
    });

    elementToComponent("Section", "section");

    component({name: "Accordion", positionals: ["open"]}, function(props, children) {
        if (props.open) {
            props.attributes ||= {};
            props.attributes["open"] = true;
        }

        return components.ElementNode("details", props) (
            components.ElementNode("section") (children[0]),
            ...children.slice(1)
        );
    });

    component({name: "SkeletonLoader", positionals: ["alt"]}, function(props, children) {
        props.attributes ||= {};
        props.attributes["aui-skeleton"] = true;
        props.attributes["aria-label"] = props.alt || "";

        var container = components.Container(props) (
            ...children
        );

        container.find("button, input")
            .setAttribute("disabled", true)
            .setAttribute("aria-hidden", true)
        ;

        return container;
    });

    elementToComponent("Separator", "hr");
    elementToComponent("LineBreak", "br");

    elementToComponent("Button", "button", {}, {"mode": "aui-mode"});
    elementToComponent("NavigationalButton", "button", {attributes: {"aui-mode": "navigational"}});

    component({name: "IconButton", positionals: ["icon", "alt"]}, function(props, children) {
        if (props.alt) {
            props.attributes ||= {};
            props.attributes["title"] = props.alt;
            props.attributes["aria-label"] = props.alt;
        }

        return components.Button(props) (
            Icon(props.icon, "light") (),
            ...children
        );
    });

    component("Label", function(props, children) {
        var id = props.id || `astronaut_${core.generateKey()}`;

        children[1]?.setAttribute("id", id);

        return components.Container() (
            components.ElementNode("label", {attributes: {for: id}, ...props}) (children[0]),
            ...children.slice(1)
        );
    });

    elementToComponent("Input", "input", {}, {
        type: "type",
        placeholder: "placeholder",
        mode: "aui-mode",
        value: "value"
    });

    elementToComponent("NumericalInput", "input", {"type": "number"}, {
        placeholder: "placeholder",
        mode: "aui-mode",
        min: "min",
        max: "max",
        step: "step",
        value: "value"
    });

    elementToComponent("RangeSliderInput", "input", {"type": "range"}, {
        min: "min",
        max: "max",
        step: "step",
        value: "value"
    });

    component({name: "Image", positionals: ["source"]}, function(props, children) {
            props.attributes ||= {};
            props.attributes["src"] = props.source;
            props.attributes["alt"] = props.alt || "";

        return components.ElementNode("img", props) (children);
    });

    component({name: "Icon", positionals: ["icon", "type"]}, function(props, children) {
        props.attributes = {
            "aui-icon": props.type || "dark",
            "aria-hidden": true
        };

        return components.Image({...props, source: `${parentPath}/../icons/${props.icon}.svg`}) (...children);
    });
}