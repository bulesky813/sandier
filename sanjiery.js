var system = require('system');
var url = system.args[4];
//phantom.outputEncoding = 'gbk';

function nextPage(url) {
    casper.thenOpen(url, function(){
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
                    if($(this).attr("href").indexOf(".com/fs/") > -1 && $(this).text().indexOf(".com/fs/") > -1) {
                        av.links.push($(this).attr("href"));
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
        casper.wait(1000, function(){
            console.log(JSON.stringify(avNodes));
            nextPage(nLink);
        })
    });
}

var casper = require('casper').create({
    clientScripts: [
        'jquery.min.js'
    ],
    pageSettings: {
        loadImages: false
    }
});

casper.start().then(function() {
    nextPage(url);
});

casper.run();
