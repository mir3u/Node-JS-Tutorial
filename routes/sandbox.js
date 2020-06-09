var express = require('express');
var router = express.Router();
var sandboxService = require('../servicies/sandbox');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('sandbox', { title: 'Question' });
});
router.post('/testCode', function(req, res, next) {
    let userCode = req.body.code;
    let result = sandboxService.runJsFunction(userCode,'');
    console.log(result,"auhdiksu");

    if(result){
        res.send({success: "the code ran", result: result})
    }else{
        res.send({error: "error"})
    }
    // console.log(result,"hadiuhasid");
    // res.render('sandbox', { title: 'Question' });
});

module.exports = router;
