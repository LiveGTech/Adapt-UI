/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function getURLParameter(parameter) {
    return decodeURIComponent((new RegExp("[?|&]" + parameter + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

export function generateKey(length = 16, digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_") {
    var key = "";

    for (var i = 0; i < length; i++) {
        key += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return key;
}