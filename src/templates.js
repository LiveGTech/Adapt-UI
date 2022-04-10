/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as markup from "./markup.js";

export function apply(root = document) {
    var requests = [];

    root.querySelectorAll("[aui-template]").forEach(function(element) {
        requests.push(fetch(element.getAttribute("aui-template")).then(function(response) {
            return response.text();
        }).then(function(data) {
            element.innerHTML = data;

            markup.apply(element);
        }));
    });

    return Promise.all(requests);
}