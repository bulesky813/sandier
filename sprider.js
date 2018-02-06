var child        = require('child_process');
var mysql        = require('mysql');
var validator    = require('validator');
var FastDownload = require('fast-download');
var fs           = require('fs');

function Sprider() {
    this.avNodes = [];
    this.connection = null;
    this.path = 'F:\\Share\\';

    if(typeof Sprider._initialized == "undefined") {
        Sprider.prototype.getYunfilesLink = function() {
            var self = this;
            var avNode = self.avNodes.pop();
            if(avNode != undefined) {
                if (!validator.isEmpty(avNode.link)) {
                    self.downYunfiles(avNode.link.trim(), avNode.aid);
                } else {
                    self.getYunfilesLink();
                }
            } else {
                self.connection.end();
            }
        };
        Sprider.prototype.downYunfiles = function(link, aid) {
            var self = this;
            var url = 'http://page1.dfpan.com' + link.substr(link.indexOf("/fs"));
            child.exec("casperjs yunfiles.js " + url, function (err, stdout, stderr) {
                if (err) {
                    console.log(err.message);
                    self.getYunfilesLink();
                } else {
                    var objDown = JSON.parse(stdout.trim());
                    if(objDown.fastLink != null && !validator.isEmpty(objDown.fastLink)) {
                        var fileDir = self.path + aid + "\\";
                        var filePath = fileDir + objDown.fileName;
                        // 创建目录
                        if(!fs.existsSync(fileDir)) {fs.mkdirSync(fileDir);};
                        // 开启多线程下载
                        var dl = new FastDownload(objDown.fastLink, {
                            chunksAtOnce: 8,
                            headers: {
                                Referer: link
                            }
                        });
                        dl.on('error', function(error){
                            console.log(error.message);
                            self.getYunfilesLink();
                        });
                        dl.on('start', function(dl){
                            console.log(filePath + ' started !');
                        });
                        dl.on('end', function(){
                            console.log(filePath + ' ended !');
                            self.connection.query("UPDATE av_link SET status = 1 WHERE aid = ? AND link = ?", [aid, link], function (error, results, fields) {
                                if(error) {
                                    console.log(error.message);
                                    return;
                                }
                            });
                            if(objDown.fileName.indexOf(".zip") > -1 || objDown.fileName.indexOf(".rar") > -1) {
                                child.exec("Rar x -psjry " + filePath + " " + fileDir, function(err, stdout, stderr) {
                                    if(err) {
                                        console.log(err.message);
                                        return;
                                    }
                                });
                            }
                            self.getYunfilesLink();
                        });
                        dl.pipe(fs.createWriteStream(filePath));
                    }
                    else {
                        self.getYunfilesLink();
                    }
                }
            });
        };
        Sprider.prototype.start = function() {
            var self = this;
            self.connection = mysql.createConnection({
                host     : '192.168.2.8',
                user     : 'root',
                password : '123456',
                database : 'sanjiery'
            });
            self.connection.query("select * from av_link where status = 0  order by aid desc", function(error, results, fields){
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