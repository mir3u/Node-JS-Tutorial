const Crawler = require("simplecrawler");

const crawlerModule = module.exports = {
    crawlWebsites: (domain) => {

        //try 1
        const crawler = new Crawler(domain);
        // console.log("me");
        //     crawler.interval = 1000; // Ten seconds
        crawler.maxConcurrency = 6;
        // crawler.maxDepth = 2;
        // crawler.filterByDomain = true;
        crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
            console.log(response.headers['x-response-time'], response.headers.status);
            console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
            console.log("It was a resource of type %s", response.headers['content-type']);
        });

        crawler.start();


        //try2
        crawler.interval = 10000; // Ten seconds
        // crawler.maxConcurrency = 6;
        crawler.maxDepth = 2;
        crawler.filterByDomain = true;
        crawler.scanSubdomains = true;
        crawler.on('discoverycomplete', function (queueitem, resources) {
            // console.log(resources)
            for (let resource in resources) {
                // const linkStatus = checkLink(resources[resource], domain);
                try {
                    console.log(resources[resource])
                    // const error = crawlerDB.addLinkToDb(resources[resource], domainObject, jobId);
                    //add to db
                } catch (e) {
                    error = true;
                    console.log("unable to check link");
                }
            }
        });

        crawler.start();
    },

    checkLink: (url, domain) =>{
        try {
            /*
                Complete the function such that it filters the domain based on the request
             */
        } catch (e) {
            console.log("not an url or url null", e);
        }
    },

    getDomain: (url) => {
        let urlParts = url.replace('http://', '').replace("www.", '').replace('https://', '').split(/[/?#]/);
        let domain = urlParts[0];
        return domain;
    }

}



// crawlerModule.crawlWebsites("https://twitter.com/");
