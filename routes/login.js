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

        let userFound = await User.findOne({
            where: {
                username: user,
                password: enPass
            }
        })
            .catch(error => console.log(error))
            if(userFound!= null){
                req.session.user = userFound;
                res.send({success: "User Logged in!"})
            }else {
                res.send({error: "error"})


    }

});

module.exports = router;
