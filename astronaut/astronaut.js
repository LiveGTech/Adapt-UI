/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "../src/adaptui.js";
import * as markup from "../src/markup.js";

import * as componentsList from "./components.js";

export var components = {};
export var unpacked = false;
export var loaded = false;
export var styleSets = [];

export class StyleSet {
    constructor(styles, qualifiers = "*", childQualifiers = null, _shouldRender = true) {
        this.styles = styles;
        this.qualifiers = qualifiers;
        this.childQualifiers = childQualifiers;

        if (_shouldRender) {
            this._render();
        }
    }

    static stylesToCss(styles) {
        var cssParts = [];

        Object.keys(styles).forEach(function(property) {
            cssParts.push(property);
            cssParts.push(":");
            cssParts.push(styles[property]);
            cssParts.push(";");
        });

        return cssParts.join("");
    }

    _render() {
        this.elementClass = `astronaut_${$g.core.generateKey()}`;
        this.elementClasses = [this.elementClass];
        this.css = this.generateCss();
        this.styleElement = $g.create("style").setText(this.css);

        console.log("rendered", this.css);

        styleSets.push(this);
    }

    generateCss() {
        return (
            `.${this.elementClass}` +
            (this.qualifiers != "*" ? `:is(${this.qualifiers})` : "") +
            (this.childQualifiers != null ? ` ${this.childQualifiers}` : "") +
            `{${this.constructor.stylesToCss(this.styles)}}`
        );
    }
}

export class MediaQueryStyleSet extends StyleSet {
    constructor(mediaQuery, styles, qualifiers = undefined, childQualifiers = undefined, _shouldRender = true) {
        super(styles, qualifiers, childQualifiers, false);

        this.mediaQuery = mediaQuery;

        if (_shouldRender) {
            this._render();
        }
    }

    generateCss() {
        return (
            `@media(${this.mediaQuery}){` +
            super.generateCss() +
            `}`
        );
    }
}

export class StyleGroup {
    constructor(styleSets) {
        this.styleSets = styleSets;
        this.styleElement = null;
    }

    get elementClasses() {
        return this.styleSets.map((styleSet) => styleSet.elementClasses).flat();
    }
}

export function unpack() {
    Object.keys(components).forEach(function(name) {
        globalThis[name] = components[name];
    });

    unpacked = true;
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
        var inter = {};
        var children = [];
        var isSplittingChildren = true;

        function create() {
            var createdComponent = init(props, children, inter);

            (props.classes || []).forEach(function(className) {
                createdComponent.addClass(className);
            });

            (props.styleSets || []).forEach(function(styleSet) {
                console.log(styleSet);
                styleSet.elementClasses.forEach(function(className) {
                    createdComponent.addClass(className);
                });
            });

            if (props.id) {
                createdComponent.setAttribute("id", props.id);
            }

            createdComponent.inter = inter;

            return createdComponent;
        }

        if (args.length > 0) {
            if (Array.isArray(args[0])) {
                isSplittingChildren = false;
            } else if (typeof(args[0]) == "object") {
                if (args[0]._aui) {
                    children = [];

                    [...args].forEach(function(arg) {
                        if (Array.isArray(arg)) {
                            children.push(...arg);
    
                            return;
                        }
    
                        children.push(arg);
                    });

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
        } else {
            props = _options.default || {};
        }

        if (isSplittingChildren) {
            return function() {
                children = [];

                [...arguments].forEach(function(arg) {
                    if (Array.isArray(arg)) {
                        children.push(...arg);

                        return;
                    }

                    children.push(arg);
                });

                for (var i = 0; i < children.length; i++) {
                    if (typeof(children[i]) != "object") {
                        children[i] = components.Text(children[i]);
                    }
                }

                return create();
            };
        }

        return create();
    };

    if (!_options.isPrivate) {
        components[_options.name] = newComponent;

        if (unpacked) {
            globalThis[_options.name] = newComponent;
        }
    }

    return newComponent;
}

export function render(component, toRoot = null) {
    (loaded ? Promise.resolve() : $g.waitForLoad()).then(function() {
        loaded = true;

        if (toRoot == null) {
            toRoot = $g.sel("body");
        }

        toRoot.clear().add(
            component,
            ...styleSets.map((styleSet) => styleSet.styleElement).filter((element) => element != null)
        );
    });
}

export function repeat(count, ...components) {
    var repeatedComponents = [];

    for (var i = 0; i < count; i++) {
        repeatedComponents.push(...components.map((component) => component.copy()));
    }

    return repeatedComponents;
}

components.ElementNode = function(name, options = {}) {
    var _options;

    if (typeof(name) == "string") {
        _options = options;
        _options.name = name;
    } else {
        _options = name;
    }

    var element = $g.create(_options.name || "div");

    (_options.classes || []).forEach(function(className) {
        element.addClass(className);
    });

    if (_options.id) {
        element.setAttribute("id", _options.id);
    }

    var attributes = _options.attributes || {};

    Object.keys(attributes).forEach(function(attribute) {
        element.setAttribute(attribute, attributes[attribute]);
    });

    var styles = _options.styles || {};

    Object.keys(styles).forEach(function(style) {
        element.setStyle(style, styles[style]);
    });

    return function() {
        if (Array.isArray(arguments[0])) {
            element.add(...arguments[0]);
        } else {
            element.add(...arguments);
        }

        markup.apply(element.get());

        return element;
    };
};

components.Text = function(text = "") {
    return $g.create("span").setText(text);
};

component("Container", function(props, children) {
    return components.ElementNode("div", props) (children);
});

componentsList.init({components, component});

$g.waitForLoad().then(function() {
    loaded = true;
});