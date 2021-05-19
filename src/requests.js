/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export function send(method, url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            resolve({
                status: xhr.status,
                data: xhr.response
            });
        };

        xhr.open(method, url);
        xhr.send();
    });
}

export function get(url) {
    return send("GET", url);
}

export function json(url) {
    return new Promise(function(resolve, reject) {
        return send("GET", url).then(function(response) {
            try {
                resolve(JSON.parse(response.data));
            } catch (e) {
                if (e instanceof SyntaxError) {
                    reject("Syntax error while parsing JSON");
                } else {
                    throw e;
                }
            }
        });
    });
}