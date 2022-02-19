/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

// Domain:  t >= 0 && t <= 1
// Range:   f(t) >= 0 && f(t) <= 1
export const easingFunctions = {
    LINEAR: (t) => t,
    EASE: (t) => t < 0.5 ? 2 * Math.pow(t, 2) : -1 + ((4 - (2 * t)) * t),
    EASE_IN: (t) => Math.pow(t, 2),
    EASE_OUT: (t) => t * (2 - t)
};

export function getStyleNumericalValue(element, property) {
    return parseFloat(getComputedStyle(element)[property]) || 0;
}

export function getStyleUnit(element, property) {
    return /[-]?[0-9.]*(.*)/.exec(getComputedStyle(element)[property])[1];
}

export function easeStyleTransition(element, property, targetValue, duration = 500, easingFunction = easingFunctions.EASE) {
    var startTime = new Date().getTime();
    var initialValue = getStyleNumericalValue(element, property);
    var styleUnit = getStyleUnit(element, property);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.style[property] = String(targetValue) + styleUnit;

        return Promise.resolve();
    }

    return new Promise(function(resolve, reject) {
        requestAnimationFrame(function renderFrame() {
            var currentDuration = new Date().getTime() - startTime;
            var currentEasePosition = easingFunction(Math.min(currentDuration / duration, 1));
    
            element.style[property] = String(initialValue + (currentEasePosition * (targetValue - initialValue))) + styleUnit;
    
            if (currentEasePosition < 1) {
                requestAnimationFrame(renderFrame);
            } else {
                resolve();
            }
        });
    });
}

export function fadeIn(element, duration = 500, easingFunction = easingFunctions.LINEAR) {
    element.hidden = false;

    return easeStyleTransition(element, "opacity", 1, duration, easingFunction);
}

export function fadeOut(element, duration = 500, easingFunction = easingFunctions.LINEAR) {
    return easeStyleTransition(element, "opacity", 0, duration, easingFunction).then(function() {
        element.hidden = true;

        return Promise.resolve();
    });
}

export function switchFrom(element, oldElement, duration = 500) {
    element.style.opacity = "0";

    return fadeOut(oldElement, duration / 2).then(function() {
        return fadeIn(element, duration / 2);
    });
}

export function collapse(element, vertically = true, duration = 500, easingFunction = easingFunctions.EASE) {
    if (vertically) {
        element.style.width = `${element.clientWidth}px`;
    } else {
        element.style.height = `${element.clientHeight}px`;
    }

    element.style.overflow = "hidden";

    easeStyleTransition(element, vertically ? "padding-top" : "padding-inline-start", 0, duration, easingFunction);
    easeStyleTransition(element, vertically ? "padding-bottom" : "padding-inline-end", 0, duration, easingFunction);
    easeStyleTransition(element, vertically ? "margin-top" : "margin-inline-start", 0, duration, easingFunction);
    easeStyleTransition(element, vertically ? "margin-bottom" : "margin-inline-end", 0, duration, easingFunction);

    return easeStyleTransition(element, vertically ? "height" : "width", 0, duration, easingFunction);
}