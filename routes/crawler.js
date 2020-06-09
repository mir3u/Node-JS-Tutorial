var express = require('express');
var router = express.Router();
// let Crawler = require('../servicies/crawler');

var fs = require("fs");
let Crawler = require('simplecrawler')
const path = require('path');


router.get('/list', function(req, res, next) {
    res.render('crawlList', { title: 'Crawler' });
});

router.get('/add', function(req, res, next) {
    // const script = new vm.Script(data);
    // console.log(script);
    // const func = new Function('var a = 42; console.log(a);');
    // func();



    let crawl = "module.exports = \n" +
        "   (domain) => {\n" +
        "        const Crawler = require('simplecrawler')\n"+
        "        const crawler = new Crawler(domain);\n" +
        "        crawler.on(\"fetchcomplete\", function(queueItem, responseBuffer, response) {\n" +
        "            //console.log(response.headers['x-response-time'], response.headers.status);\n" +
        "            //console.log(\"I just received %s (%d bytes)\", queueItem.url, responseBuffer.length);\n" +
        "            //console.log(\"It was a resource of type %s\", response.headers['content-type']);" +
        "               console.log( response.headers['x-response-time'])\n" +
        "        });\n" +
        "        crawler.start();\n" +
        "}\n"
   let a = vm.run(crawl,__filename);

    let fun = "module.exports = function a(m){ let l = 1; for(let i =1; i<=m;i++){ l=l*m;} return l;}  "
    let b = vm.run(fun,__filename);
    let c = b(10);
    console.log(b(10)  === 10000000000);
    console.log(c)
    // assert.ok(vm.run(fun,__filename) === 1000000);
    // console.log(b.,"shda")

    // let functionInSandbox = vm.run(crawl);
    let m = a("https://twitter.com/");
    console.log(m);

    res.render('crawlerAdd', { title: 'Crawler' });
});
router.post('/add', function(req, res, next) {
    res.render('crawlAdd', { title: 'Crawler' });
});

module.exports = router;
