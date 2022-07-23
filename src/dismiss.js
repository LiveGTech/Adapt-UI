/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export const DEFAULT_MINIMUM_DISTANCE = 20;
export const ACTIVATION_DISTANCE_PERCENTAGE = 0.4;

export const directions = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    START: 5, // Left for LTR locales, right for RTL locales
    END: 6, // Right for LTR locales, left for RTL locales
    VERTICAL: 7, // Both up and down
    HORIZONTAL: 8 // Both left and right
};

export const effects = {
    NONE: 0,
    OPACITY: 1
};

export function isHorizontal(direction) {
    return [directions.LEFT, directions.RIGHT, directions.START, directions.END, directions.HORIZONTAL].includes(direction);
}

export function isWithinConstraints(position, direction = directions.HORIZONTAL, textDirection = document.querySelector("html").getAttribute("dir") || "ltr") {
    switch (direction) {
        case directions.UP:
        case directions.LEFT:
            return position <= 0;

        case directions.DOWN:
        case directions.RIGHT:
            return position >= 0;

        case directions.START:
            if (textDirection == "rtl") {
                return position >= 0;
            }

            return position <= 0;

        case directions.END:
            if (textDirection == "rtl") {
                return position <= 0;
            }

            return position >= 0;

        case directions.VERTICAL:
        case directions.HORIZONTAL:
            return true;
    }
}

export function swipeToDismiss(element, direction = directions.HORIZONTAL, minimumDistance = DEFAULT_MINIMUM_DISTANCE, effect = effects.OPACITY, textDirection = undefined) {
    var initialTouch = 0;
    var touchIsDown = false;
    var position = 0;
    var returnInterval = null;
    var reachedThreshold = false;
    var hasActivated = false;

    function getDisplacementPercentage() {
        return Math.abs(position) / (isHorizontal(direction) ? element.clientWidth : element.clientHeight);
    }

    function touchStartEvent(touch) {
        var event = new Event("dismissintent", {cancelable: true});

        if (!element.dispatchEvent(event)) {
            return;
        }

        element.style.position = "relative";

        clearInterval(returnInterval);

        initialTouch = touch;
        touchIsDown = true;
    }

    function touchMoveEvent(touch) {
        if (!touchIsDown) {
            return;
        }

        var deltaTouch = touch - initialTouch;

        if (isWithinConstraints(deltaTouch, direction, textDirection) && Math.abs(deltaTouch) >= minimumDistance) {
            position = deltaTouch;
        } else {
            position = 0;
        }

        if (isHorizontal(direction)) {
            element.style.left = `${position}px`;
        } else {
            element.style.top = `${position}px`;
        }

        if (effect == effects.OPACITY) {
            element.style.opacity = Math.max(1 - (getDisplacementPercentage() / ACTIVATION_DISTANCE_PERCENTAGE), 0);
        }

        reachedThreshold = getDisplacementPercentage() >= ACTIVATION_DISTANCE_PERCENTAGE;
    }

    function touchEndEvent() {
        if (!touchIsDown) {
            return;
        }

        touchIsDown = false;

        if (reachedThreshold) {
            var event = new Event("dismiss", {cancelable: true});

            hasActivated = element.dispatchEvent(event);
        }

        clearInterval(returnInterval);

        var event = new Event("dismissreturn", {cancelable: true});
        var hasEndedReturn = false;

        if (!element.dispatchEvent(event)) {
            return;
        }

        returnInterval = setInterval(function() {
            var target = hasActivated ? (isHorizontal(direction) ? element.clientWidth : element.clientHeight) : 0;

            if (position < 0) {
                target *= -1;
            }

            var change = (target - position) * 0.2;

            if (Math.abs(change) < 2) {
                position = target;
                hasEndedReturn = true;

                clearInterval(returnInterval);
            } else {
                position += change;
            }

            if (isHorizontal(direction)) {
                element.style.left = `${position}px`;
            } else {
                element.style.top = `${position}px`;
            }

            if (effect == effects.OPACITY) {
                element.style.opacity = Math.max(1 - (getDisplacementPercentage() / ACTIVATION_DISTANCE_PERCENTAGE), 0);
            }

            if (hasEndedReturn) {
                element.dispatchEvent(new Event("dismissreturnend"));
            }
        }, 10);
    }

    element.addEventListener("mousedown", (event) => touchStartEvent(isHorizontal(direction) ? event.pageX : event.pageY));
    element.addEventListener("touchstart", (event) => touchStartEvent(isHorizontal(direction) ? event.touches[0].pageX : event.touches[0].pageY));

    window.addEventListener("mousemove", (event) => touchMoveEvent(isHorizontal(direction) ? event.pageX : event.pageY));
    window.addEventListener("touchmove", (event) => touchMoveEvent(isHorizontal(direction) ? event.touches[0].pageX : event.touches[0].pageY));

    window.addEventListener("mouseup", () => touchEndEvent());
    window.addEventListener("touchend", () => touchEndEvent());
}