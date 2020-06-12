

var express = require('express');
const MD5 = require('md5');
var router = express.Router();
const con = require('../Models/mysqlCon');
const validator = require('express-validator');
const toastr = require('express-toastr');
const { User } = require('../Models/sequelize')


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('register', { title: 'Register' });
});


router.post('/', async function(req, res, next) {
    let error = '';
    if (!req.body.email || !req.body.password) {
        res.status(401).json({message:'Parameters are missing'})
    } else {
        try {
            let username = req.body.username;
            let email = req.body.email;
            let name = req.body.name;
            let password = req.body.password;
            let isAdmin = req.body.isAdmin;
            let encryptedPassword = MD5(password);
            let user = new User(username,name,email, encryptedPassword);

            await User.findOrCreate({ where: {  username:username}, defaults: { email: email, name:name, email: email, isAdmin: isAdmin, password:encryptedPassword  }})
                // .spread(user => user ? res.send({error: "User already exists"}) : res.send({success: "User created!"}))
                .catch(console.log("sequelize error"))
    //         try{
    //             con.checkTableExists("user",function (result) {
    //                 if(result == 0){
    //                     con.createTable({tableName:"user", args: [
    //                             {col:"id", typeVar: "INT AUTO_INCREMENT PRIMARY KEY"},
    //                             {col:"username", typeVar: "VARCHAR(255)"},
    //                             {col: "email", typeVar: "VARCHAR(255)"},
    //                             {col: "name", typeVar: "VARCHAR(255)"},
    //                             {col: "password", typeVar: "VARCHAR(255)"}
    //                         ]})
    //                 }
    //             })
    //             con.checkRecordExists({
    //                 table:"user", args: [{col: "email", value: email}, {col:"user", value: username}]
    //             },(result)=>{
    //                 console.log("me", result);
    //                 if(!result){
    //                     con.insertIntoTable({tableName:"user", args: [
    //                             {col:"username", value: username},
    //                             {col: "email", value: email},
    //                             {col: "name", value: name},
    //                             {col: "password", value: encryptedPassword}
    //                         ]})
    //                 }else{
    //                     error = "User already Exists";
    //                 }
    //             })
    //
    //         }catch (e) {
    //             console.log(e);
    //         }
        } catch (error) {
        res.status(401).json({message:'Something went wrong',error:error});
    }
    }

    res.redirect('/');
});

module.exports = router;
