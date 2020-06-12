const express = require('express');
const router = express.Router();
const con = require('../Models/mysqlCon');
const MD5 = require('md5');
const { User } = require('../Models/sequelize')


router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', async function(req, res, next) {
    let {user, password}  = req.body;
    let enPass = MD5(password);
    // try {
        let userFound = await User.findOne({
            where: {
                username: user,
                password: enPass
            }
        })
            .catch(error => console.log(error))
    // }catch (e) {
    //     console.log(e);
    // }
        // .spread((found) =>{
        // console.log(userFound)
            if(userFound.length != 0){
                req.session.user = userFound;
                res.send({success: "User Logged in!"})
            }else {
                res.send({error: "error"})
         // }})

    }
    // con.checkRecordExists( {table: "users", args: [{col: "username", value: user}, {col:"password", value: enPass}]},
    //     function (result) {
    //     console.log(result);
    //     if(result){
    //         req.session.user = user;
    //         res.send({success: "User Logged in!"})
    //     }else{
    //         res.send({error: "error"})
    //     }
    // })
    // res.render('login', { title: 'Login' });
});

module.exports = router;
