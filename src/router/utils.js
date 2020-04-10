const request = require('request');

function post(url, requestData) {
    return new Promise(function (reslove, reject) {
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
                
            },
            body: requestData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                reslove(body);
            } else {
                reject('失败');
            }
        }, function () {
            reject('失败');
        });
    })
}

function get(url, requestData) {
    return new Promise(function (reslove, reject) {
        request({
                url: url,
                method: "GET",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: requestData
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(body) // Show the HTML for the baidu homepage.
                    reslove(response);
                } else {
                    reject('失败');
                }
            },
            function () {
                reject('失败');
            })
    })
}

module.exports = {
    get,
    post
}