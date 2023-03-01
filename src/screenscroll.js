/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "./adaptui.js";

export const SELECT_MOTION_TOLERANCE = 20;

export class ScrollableScreen {
    constructor(element) {
        var thisScope = this;

        this.element = element;

        this.paginator = null;
        this.initialTouchX = 0;
        this.initialTouchY = 0;
        this.lastTouchX = 0;
        this.lastTouchY = 0;
        this.initialScrollX = 0;
        this.lastScrollX = 0;
        this.targetScrollX = 0;
        this.screenIndex = 0;
        this.targetInstantaneous = false;
        this.touchIsDown = false;
        this.scrolling = false;
        this.screenSelected = false;
        this.cancelScrollDecel = false;

        this.element.on("mousedown", (event) => this._touchStartEvent(event.pageX, event.pageY));
        this.element.on("touchstart", (event) => this._touchStartEvent(event.touches[0].pageX, event.touches[0].pageY));

        $g.sel("body").on("mousemove", (event) => this._touchMoveEvent(event.pageX, event.pageY));
        $g.sel("body").on("touchmove", (event) => this._touchMoveEvent(event.touches[0].pageX, event.touches[0].pageY));

        $g.sel("body").on("mouseup", (event) => this._touchEndEvent(event.target));
        $g.sel("body").on("touchend", (event) => this._touchEndEvent(event.target));

        new ResizeObserver(function() {
            thisScope.targetScrollX = thisScope.element.find(":scope > *").getAll()[thisScope.screenIndex].offsetLeft;
            thisScope.targetInstantaneous = true;
        }).observe(this.element.get());

        setTimeout(function update() {
            requestAnimationFrame(function() {
                thisScope._targetScroll();

                setTimeout(function() {
                    update();
                }, 10);
            });
        }, 10);
    }

    get screenWidth() {
        return this.element.find(":scope > *").get().clientWidth;
    }

    get closestScreen() {
        var thisScope = this;

        return this.element.find(":scope > *").getAll().map(function(screenElement) {
            if (Math.abs(screenElement.offsetLeft - thisScope.element.get().scrollLeft) < thisScope.screenWidth / 2) {
                return $g.sel(screenElement);
            }
    
            return null;
        }).filter((element) => element != null)[0] || null;
    }

    selectScreen(screenElement) {
        // Don't implement toggling variable; default behaviour is non-selectable screens
    }

    deselectScreen() {
        this.screenSelected = false;
    }

    applyPagination(paginator) {
        var thisScope = this;

        this.paginator = paginator;

        paginator.clear().add(
            ...this.element.find(":scope > *").getAll().map(function(screenElement) {
                var button = $g.create("button");

                button.on("click", function() {
                    thisScope.targetScrollX = screenElement.offsetLeft;
                });

                return button;
            })
        );
    }

    updatePaginator() {
        if (this.paginator == null) {
            return;
        }

        this.paginator.find("button").removeAttribute("aui-selected");
        this.paginator.find("button").getAll()[this.screenIndex]?.setAttribute("aui-selected", true);
    }

    _touchStartEvent(touchX, touchY) {
        if (this.screenSelected) {
            return;
        }

        if (this.scrolling) {
            this.cancelScrollDecel = true;
        }
    
        this.initialTouchX = touchX;
        this.initialTouchY = touchY;
        this.lastTouchX = touchX;
        this.lastTouchY = touchY;
        this.initialScrollX = this.element.get().scrollLeft;
        this.touchIsDown = true;
        this.scrolling = true;
    }

    _touchMoveEvent(touchX, touchY) {
        if (!this.touchIsDown) {
            return;
        }

        this.lastTouchX = touchX;
        this.lastTouchY = touchY;
        this.lastScrollX = this.element.get().scrollLeft;
        this.element.get().scrollLeft = this.initialScrollX - (touchX - this.initialTouchX);
    }

    _touchEndEvent(target) {
        var thisScope = this;

        if (!this.touchIsDown) {
            return;
        }

        var rate = this.element.get().scrollLeft - this.lastScrollX;
        var multiplier = 1;
        var lastFrame = Date.now();

        this.touchIsDown = false;

        if (this.screenSelected) {
            this.screenSelected = false;

            return;
        }

        if (
            Math.abs(this.initialTouchX - this.lastTouchX) <= SELECT_MOTION_TOLERANCE &&
            Math.abs(this.initialTouchY - this.lastTouchY) <= SELECT_MOTION_TOLERANCE
        ) {
            this.scrolling = false;

            if (this.element.get().contains(target)) {
                setTimeout(function() {
                    thisScope.selectScreen($g.sel(target));                    
                });
            }

            return;
        }

        requestAnimationFrame(function continueScrolling() {
            if (thisScope.cancelScrollDecel) {
                thisScope.cancelScrollDecel = false;

                return;
            }

            thisScope.element.get().scrollLeft += rate * multiplier;
            multiplier *= 0.9 ** ((Date.now() - lastFrame) / 20);

            lastFrame = Date.now();

            if (multiplier > 0.1) {
                requestAnimationFrame(continueScrolling);

                return;
            }

            var closestScreen = thisScope.closestScreen;

            if (closestScreen != null) {
                thisScope.targetScrollX = closestScreen.get().offsetLeft;
            }

            thisScope.scrolling = false;
        });
    }

    _resizeEvent() {
        if (this.screenSelected) {
            return;
        }

        this.targetScrollX = this.closestScreen.offsetLeft;
        this.targetInstantaneous = true;
    }

    _targetScroll() {
        if (!this.scrolling) {
            var change = (this.targetScrollX - this.element.get().scrollLeft) * 0.2;

            if (this.targetInstantaneous || Math.abs(change) < 2) {
                this.element.get().scrollLeft = this.targetScrollX;
                this.targetInstantaneous = false;
            } else {
                this.element.get().scrollLeft += change;
            }

            var i = this.element.find(":scope > *").getAll().findIndex((screen) => screen == this.closestScreen?.get());

            if (i >= 0) {
                this.screenIndex = i;
            }

            this.updatePaginator();
        }
    }
}