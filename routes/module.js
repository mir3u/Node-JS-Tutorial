const express = require('express');
const router = express.Router();
const con = require('../Models/mysqlCon');
const MD5 = require('md5');
const { User, Module,Exercise } = require('../Models/sequelize')


router.get('/add', async function(req, res, next) {
    // let modules = await Module.findAll();
    // console.log(modules);
    res.render('addModule', { title: 'Main Menu'});
});

router.get('/delete/:id', async function(req, res, next) {
    await Module.destroy({where: {id: req.params.id}})
        .catch(e=> console.log(e))
    let ex = Exercise.findAll({where: {moduleId: req.params.id}});
    if(ex.length != 0 ) {
        await Exercise.destroy({where: {moduleId: req.params.id}})
            .catch(e => console.log(e))
    }
    res.redirect('/');
})
router.get('/add/theory/:id',async function(req, res, next) {
    let id = req.params.id;
    let module = await Module.findOne({where: {id:id}})
    res.render('addTheory', {module:module});
})
router.post('/add/theory/', async function(req, res, next) {
    let {title,question,example,difficulty,id} = req.body;
    await Exercise.create({title:title,question:question,example:example, difficulty:difficulty, moduleId: id})
    let module = await Module.findOne({ where: { id: id} })
    if (module) {
        let noOfQ = module.noOfQuestions + 1;
        Module.update({noOfQuestions: noOfQ}, {where: {id:id}})
            .catch(e => console.log(e))
    }
    res.render('addTheory', {module:module});
})
router.get('/add/exercise/:id', async function(req, res, next) {
    let id = req.params.id;
    let module = await Module.findOne({where: {id:id}})
    res.render('addExercise', {module:module});
})
router.post('/add/exercise/', async function(req, res, next) {
    let {question,example,answer,difficulty,id} = req.body;
    await Exercise.create({question:question,example:example,answer:answer, difficulty:difficulty, moduleId: id})
    let module = await Module.findOne({ where: { id: id} })
    if (module) {
        let noOfQ = module.noOfQuestions + 1;
        Module.update({noOfQuestions: noOfQ}, {where: {id:id}})
            .catch(e => console.log(e))
    }

    res.render('addExercise', {module:module});
})

router.post('/add', async function(req, res, next) {
     let {name, description, difficulty,type,author}  = req.body;
     let module = await Module.create({name:name, description: description, type: type, difficulty:difficulty, author:author})
         .catch(e => console.log(e));
     res.redirect('/');

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
