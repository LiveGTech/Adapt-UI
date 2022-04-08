/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "../src/adaptui.js";

window.$g = $g;

export var components = {};

export function unpack() {
    Object.keys(components).forEach(function(name) {
        globalThis[name] = components[name];
    });
}

export function state() {
    return new class {
        constructor(value, onUpdate) {
            this._value = value;
            this._updateCallback = onUpdate || function() {};
        }

        get value() {
            return this._value;
        }

        set value(value) {
            this._value = value;

            this._updateCallback(this._value);
        }

        onUpdate(callback) {
            this._updateCallback = callback;
        }
    };
}

export function component(options, init) {
    var _options = options;

    if (typeof(options) == "string") {
        _options = {name: options};
    }

    var newComponent = function() {
        var args = [...arguments];
        var props = {};
        var children = [];
        var isSplittingChildren = true;

        function create() {
            var createdComponent = init(props, children);

            (props.classes || []).forEach(function(className) {
                createdComponent.addClass(className);
            });

            if (props.id) {
                createdComponent.setAttribute("id", props.id);
            }

            return createdComponent;
        }

        if (args.length > 0) {
            if (typeof(args[0]) == "object") {
                if (args?._aui) {
                    children = args;
                    isSplittingChildren = false;
                } else {
                    props = args[0];
                }
            } else {
                props.args = args;

                args.forEach(function(arg, i) {
                    props[_options.positionals?.[i]] = arg;
                });
            }
        }

        if (isSplittingChildren) {
            return function() {
                children = [...arguments];

                return create();
            };
        }

        return create();
    };

    if (!_options.isPrivate) {
        components[_options.name] = newComponent;
    }

    return newComponent;
}

export function render(component, toRoot = null) {
    $g.waitForLoad().then(function() {
        if (toRoot == null) {
            toRoot = $g.sel("body");
        }

        toRoot.clear().add(component);
    });
}

components.BaseElement = function(name, options) {
    var _options;

    if (typeof(name) == "string") {
        _options = options;
        _options.name = name;
    } else {
        _options = name;
    }

    var element = $g.create(_options.name || "div");

    var attributes = _options.attributes || {};

    Object.keys(attributes).forEach(function(attribute) {
        element.setAttribute(attribute, attributes[attribute]);
    });

    return function() {
        element.add(...arguments[0]);

        return element;
    };
}

components.Text = function(text) {
    return $g.create("span").setText(text);
}

component("Container", function(props, children) {
    return components.BaseElement("div", props) (children);
});