/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as core from "../src/core.js";

export function init({components, component}) {
    function elementToComponent(name, element, elementProps = {}, propAttributes = {}) {
        component({name, positionals: Object.keys(propAttributes)}, function(props, children) {
            props.attributes = {};

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
            props.attributes = {"hidden": true};
        }

        return components.ElementNode("aui-screen", props) (children);
    });

    elementToComponent("Section", "section");

    elementToComponent("Button", "button", {}, {"mode": "aui-mode"});
    elementToComponent("NavigationalButton", "button", {attributes: {"aui-mode": "navigational"}});

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
}