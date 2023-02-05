/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function parameter(parameter, url = new URL(window.location)) {
    if (!(url instanceof URL)) {
        url = new URL(url);
    }

    var searchParams = new URLSearchParams(url.search).get(parameter);

    return typeof(searchParams) === "string" ? decodeURIComponent(searchParams) : searchParams;
}

export function generateKey(length = 16, digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_") {
    var key = "";

    for (var i = 0; i < length; i++) {
        key += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return key;
}
