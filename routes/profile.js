const express = require('express');
const router = express.Router();
const con = require('../Models/mysqlCon');
const MD5 = require('md5');
const { User, TestUser, Test } = require('../Models/sequelize')


router.get('/', async function(req, res, next) {
    let user = req.session.user;
    // TestUser.create({userId: 2,moduleName:'Miru',testId:2})
    let TestsTaken = await TestUser.findAll({where: {userId: user.id}});
    console.log(TestsTaken)
    res.render('profile',{testsTaken: TestsTaken});
});

router.get('/edit', async function(req, res, next) {
    let user = req.session.user;
    res.render('editProfile',{user: user});
});

router.post('/edit', async function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let isAdmin = req.body.isAdmin;
    let userSes = req.session.user;
    if(MD5(password) !== userSes.password){
        let encryptedPassword = MD5(password);
        await User.update( { name:name,username:username, email: email, isAdmin: isAdmin, password:encryptedPassword }, { where: {  id:userSes.id}})
    }else{
        await User.update( { name:name,username:username, email: email, isAdmin: isAdmin }, { where: {  id:userSes.id}})

    }
    res.redirect('/profile');

});

module.exports = router;
