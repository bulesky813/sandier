var cookies = [
    {
        "domain": ".dfpan.com",
        "expirationDate": 1525573283.349854,
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
        "expirationDate": 1525573283.350831,
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
        "expirationDate": 1525573283.350502,
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
        "expirationDate": 1525601671.741029,
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
        "expirationDate": 1548929703.148758,
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
        "expirationDate": 1517912103.149939,
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
        "expirationDate": 1517912103.150344,
        "hostOnly": false,
        "httpOnly": false,
        "name": "referer",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "http%3A%2F%2Fpage1.dfpan.com%2Ffs%2F0sx5ed2ab7de7%2F",
        "id": 7
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517970083.351452,
        "hostOnly": false,
        "httpOnly": false,
        "name": "ssoId",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "1A0F113ABCDEBCB01C0E178E9FFFC357",
        "id": 8
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517912103.150321,
        "hostOnly": false,
        "httpOnly": false,
        "name": "validCodeUrl",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "\"dfpan.com:8880\"",
        "id": 9
    },
    {
        "domain": ".dfpan.com",
        "expirationDate": 1517829303,
        "hostOnly": false,
        "httpOnly": false,
        "name": "vid1",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "7765d0014c591336",
        "id": 10
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
        "value": "0A6FEF6C8200204A3EC5D0E4AEEA8991",
        "id": 11
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
            return {fastLink: $("a[onclick^='setCookie']:first-child").attr("href"), fileName: $("#file_show_filename").text()};
        });
        casper.echo(JSON.stringify(objYf));
    });
});

casper.run();



