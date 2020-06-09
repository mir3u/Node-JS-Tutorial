const express = require('express');
const router = express.Router();
const con = require('../Models/mysqlCon');
const MD5 = require('md5');


router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    let {user, password}  = req.body;
    console.log(req.body);
    let enPass = MD5(password);
    console.log(enPass, user);
    con.checkRecordExists( {table: "user", args: [{col: "username", value: user}, {col:"password", value: enPass}]},
        function (result) {
        console.log(result);
        if(result){
            req.session.user = user;
            res.send({success: "User Logged in!"})
        }else{
            res.send({error: "error"})
        }
    })
    // res.render('login', { title: 'Login' });
});

module.exports = router;
