var child      = require('child_process');
var mysql      = require('mysql');
var fs         = require('fs');


var connection = mysql.createConnection({
    host     : '192.168.2.8',
    user     : 'root',
    password : '123456',
    database : 'sanjiery'
});
connection.connect();

var casperjs = child.spawn('C:\\Users\\bulesky813\\AppData\\Roaming\\npm\\casperjs.cmd', [
        'sanjiery.js', 
        'http://sanjiery.blogspot.com/search/label/%E7%BD%91%E7%BB%9C%E7%BA%A2%E4%BA%BA'
    ]
);

casperjs.stdout.on('data', function (data) {
    var buff = new Buffer(data, 'utf-8');
    try {
        var avNodes = JSON.parse(buff.toString());
        avNodes.forEach(function (arc) {
            connection.query("INSERT INTO av_arc SET ?",
                {
                    title: arc.title.trim(),
                    labels: arc.labels.join(","),
                    imgs: arc.imgs.join(","),
                    links: arc.links.join(","),
                    arclink: arc.arclink
                },
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    var aid = results.insertId;
                    arc.links.forEach(function (link) {
                        connection.query("INSERT INTO av_link SET ?", {
                            "aid": aid,
                            "link": link
                        }, function(err, results, fields){
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                        });
                    });
                }
            );
        })
    }
    catch(error) {
        console.log(error.message);
    }
});
casperjs.stderr.on('data', function (data) {
    //console.log(data);
});
casperjs.on('exit', function (code) {
    if(code == 1) {
        console.log("completed~!");
    }
});