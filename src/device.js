/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

var touchListeners = [];
var touchLock = false;

export var isTouch = null;

export function listenForTouchChange(callback) {
    touchListeners.push(callback);
}

export function startChecking() {
    document.getElementsByTagName("html")[0].setAttribute("aui-istouch", "false");

    window.addEventListener("touchstart", function() {
        if (isTouch !== true) {
            touchListeners.forEach((listener) => listener(true));
        }

        isTouch = true;
        touchLock = true;
    });

    window.addEventListener("mousedown", function() {
        if (touchLock) {
            touchLock = false;

            return;
        }

        if (isTouch !== false) {
            touchListeners.forEach((listener) => listener(false));
        }

        isTouch = false;
    });
}

listenForTouchChange(function(isTouch) {
    document.getElementsByTagName("html")[0].setAttribute("aui-istouch", isTouch);
});