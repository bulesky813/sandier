var child        = require('child_process');
var mysql        = require('mysql');
var validator    = require('validator');
var FastDownload = require('fast-download');

function Sprider() {
    this.avNodes = [];
    this.connection = null;

    if(typeof Sprider._initialized == "undefined") {
        Sprider.prototype.getYunfilesLink = function() {
            var self = this;
            var value = self.avNodes.pop();
            if(value != undefined) {
                if (!validator.isEmpty(value.links)) {
                    var links = value.links.split(",");
                    self.downYunfiles(links);
                } else {
                    self.getYunfilesLink();
                }
            } else {
                self.connection.end();
            }
        };
        Sprider.prototype.downYunfiles = function(links) {
            var self = this;
            var url = links.pop();
            if(url != undefined) {
                child.exec("casperjs yunfiles.js " + url, function (err, stdout, stderr) {
                    if (err) {
                        console.log(err.message);
                        self.downYunfiles(links);
                    } else {
                        var objDown = JSON.parse(stdout.trim());
                        console.log(stdout.trim());
                        if(objDown.fastLink != null && !validator.isEmpty(objDown.fastLink)) {
                           /*var dl = new FastDownload(objDown.fastLink, {
                                headers: {
                                    Referer: url
                                }
                            });
                            dl.on('error', function(error){
                                console.log(error.message);
                            });
                            dl.on('start', function(dl){
                                console.log(objDown.fileName + ' started !');
                            });
                            dl.on('end', function(){
                                console.log(objDown.fileName + ' ended !');
                            });
                            dl.pipe(fs.createWriteStream('downloads/' + objDown.fileName));*/
                            /*console.log("axel " + objDown.fastLink + " -H 'Referer: " + url + "' -o '/mnt/share/" + objDown.fileName.toLowerCase() + "'");
                            child.exec("axel '" + objDown.fastLink + "' -H 'Referer: " + url + "' -o '/mnt/share/" + objDown.fileName.toLowerCase() + "'", function (err, stdout, stderr){
                                if (err) {
                                    console.log(err.message);
                                }
                                downYunfiles(links);
                            });*/
                            self.downYunfiles(links);
                        }
                        else {
                            self.downYunfiles(links);
                        }
                    }
                });
            } else {
                self.getYunfilesLink();
            }
        };
        Sprider.prototype.start = function() {
            var self = this;
            self.connection = mysql.createConnection({
                host     : '10.211.55.4',
                user     : 'root',
                password : '123456',
                database : 'sanjiery'
            });
            self.connection.query("select * from av_arc", function(error, results, fields){
                if(error) {
                    console.log(error.message);
                    return;
                }
                self.avNodes = results;
                self.getYunfilesLink();
            });
        };
        Sprider._initialized = true;
    }
};

var sp  = new Sprider();
sp.start();