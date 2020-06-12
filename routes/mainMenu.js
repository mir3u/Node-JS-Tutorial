const express = require('express');
const router = express.Router();
const con = require('../Models/mysqlCon');
const MD5 = require('md5');
const { User, Module } = require('../Models/sequelize')


router.get('/', async function(req, res, next) {
    let modules = await Module.findAll();

    res.render('mainMenu', { title: 'Main Menu', modules: modules});
});

router.post('/', function(req, res, next) {
    // let {user, password}  = req.body;
    // let enPass = MD5(password);
    // try {
    //     User.findAll({
    //         where: {
    //             username: user,
    //             password: enPass
    //         }
    //     })
    //         .spread((found) =>{
    //             console.log("mir");
    //             if(found){
    //                 req.session.user = user;
    //                 res.send({success: "User Logged in!"})
    //             }else {
    //                 res.send({error: "error"})
    //             }})
    //         .catch(error => console.log(error))
    // }catch (e) {
    //     console.log(e);
    // }

});

module.exports = router;
