var system = require('system');
var url = system.args[4];

function Sanjiery() {

    this.casper = null;

    if(typeof Sanjiery._initialized == "undefined") {

        Sanjiery.prototype.start = function(url) {
            var self = this;
            self.casper = require('casper').create({
                clientScripts: [
                    'jquery.min.js'
                ],
                pageSettings: {
                    loadImages: false
                }
            });
            self.casper.start().then(function() {
                self.goNext(url);
            });
            self.casper.run();
        };

        Sanjiery.prototype.goNext = function(url) {
            var self = this;
            self.casper.thenOpen(url, function(){
                var avNodes = this.evaluate(function(){
                    var avNodes = [];
                    $("h3[itemprop='name']>a").each(function(index, element) {
                        var av = {
                            title: "",
                            imgs:[],
                            labels:[],
                            links:[],
                            arclink:""
                        };
                        av.title = $(this).text().trim();
                        av.arclink = $(this).attr("href");
                        $("div[itemprop='articleBody']").eq(index).find("img").each(function() {
                            av.imgs.push($(this).attr("src"))
                        });
                        $("div[itemprop='articleBody']").eq(index).find("a").each(function() {
                            if($(this).text().indexOf(".com/fs/") > -1) {
                                if($(this).attr("href").indexOf(".com/fs/") > -1)  {
                                    av.links.push($(this).attr("href"));
                                }
                                else if($(this).attr("_href").indexOf(".com/fs/") > -1) {
                                    av.links.push($(this).attr("_href"));
                                }
                            }
                        });
                        $("span.post-labels").eq(index).find("a").each(function(){
                            av.labels.push($(this).text().trim());
                        });
                        avNodes.push(av);
                    });
                    return avNodes;
                });
                var nLink = this.evaluate(function() {
                    return $("#Blog1_blog-pager-older-link").attr("href");
                });
                self.casper.wait(1000, function(){
                    self.casper.echo(JSON.stringify(avNodes));
                    self.goNext(nLink);
                })
            });
        }

        Sanjiery._initialized = true;
    }
}

var sjry = new Sanjiery();
sjry.start(url);
