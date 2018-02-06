var cookies = [
    {
        "domain": ".dfpan.com",
        "expirationDate": 1525629425.192594,
        "hostOnly": false,
        "httpOnly": false,
        "name": "jforumAutoLogin",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "1",
        "id": 1
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1525629425.192624,
        "hostOnly": false,
        "httpOnly": false,
        "name": "jforumUserHash",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "199c0792706d106cd942883b415ac2c3",
        "id": 2
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1525629425.192611,
        "hostOnly": false,
        "httpOnly": false,
        "name": "jforumUserId",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "bulesky813",
        "id": 3
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1523637196.069373,
        "hostOnly": false,
        "httpOnly": false,
        "name": "language",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "zh_cn",
        "id": 4
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1548985843.679581,
        "hostOnly": false,
        "httpOnly": false,
        "name": "membership",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "2",
        "id": 5
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517968243.679615,
        "hostOnly": false,
        "httpOnly": false,
        "name": "premium",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "1",
        "id": 6
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517968243.679639,
        "hostOnly": false,
        "httpOnly": false,
        "name": "referer",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "http%3A%2F%2Fpage1.dfpan.com%2Ffs%2Fdsxedd707cc72%2F%3Ferror%3DIncorrectUsernameOrPassword",
        "id": 7
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1518026225.192642,
        "hostOnly": false,
        "httpOnly": false,
        "name": "ssoId",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "3491B823017C082C44AB88DC7CE11E77",
        "id": 8
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517911819.624315,
        "hostOnly": false,
        "httpOnly": false,
        "name": "tempTg",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "1",
        "id": 9
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517968243.679627,
        "hostOnly": false,
        "httpOnly": false,
        "name": "validCodeUrl",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "\"dfpan.com:8880\"",
        "id": 10
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517885443,
        "hostOnly": false,
        "httpOnly": false,
        "name": "vid1",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "e0660980b7ac5463",
        "id": 11
    },
    {
        "domain": "page1.dfpan.com",
        "hostOnly": true,
        "httpOnly": true,
        "name": "JSESSIONID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": true,
        "storeId": "0",
        "value": "1F057B78D704C8CDC57ACAF4FCD1520F",
        "id": 12
    }
];

cookies.forEach(function (value) {
    phantom.addCookie(value);
})

var system = require('system');
var url = system.args[4];

var casper = require('casper').create({
    clientScripts: [
        'jquery.min.js'
    ],
    pageSettings: {
        loadImages: false
    }
});

casper.start().thenOpen(url, function(){
    casper.wait(1000, function(){
        var objYf = this.evaluate(function() {
            return {fastLink: $("a[onclick^='setCookie']:first-child").attr("href"), fileName: $("#file_show_filename").text().trim().toLowerCase()};
        });
        casper.echo(JSON.stringify(objYf));
    });
});

casper.run();