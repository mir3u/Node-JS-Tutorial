var express = require('express');
var router = express.Router();
var sandboxService = require('../servicies/sandbox');
const { User, Module,Exercise,Theory,QuestionUser, TestUser, Test } = require('../Models/sequelize')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('sandbox', { title: 'Question' });
});
router.get('/test/next', async function(req, res, next) {
    let exs =  req.session.exTest;
    let ex = exs.pop();
    req.session.exTest = exs;
    let exercise = await Exercise.findOne({
        where: {id: ex}});
    // console.log(exercise);
    let module = await Module.findOne({
        where: {id: exercise.moduleId},
    })
    // console.log(exercise);
    // console.log(exercises);
    res.render('sandboxTest', { exercise: exercise, module:module});
});
router.post('/test/submit', async function(req, res, next) {
    let userCode = req.body.editor;
    let id = req.body.id;
    let result = sandboxService.runJsFunction(userCode,'');
    let exercise = await Exercise.findOne({
        where: {id: id}});

    if(result) {
        if (exercise.answer != null) {
            if (exercise.answer == result)
            {
                req.session.testOverall.push(1);
            }
        }
    }
    if(req.session.exTest.length == 0){

        let idTest = req.session.testOverall[0];
        console.log(req.session.testOverall)
        let sum = req.session.testOverall.length -1;
        let test = await Test.findOne({where: {id:idTest}});
        let percentange = Math.round(sum/test.noOfQuestions * 100);
        await TestUser.create({userId: req.session.user.id, precentageObtained: percentange,moduleName: test.module, testId: test.id })

        res.redirect('/');
    }
    res.redirect('/sandbox/test/next');
    // console.log(result,"hadiuhasid");
    // res.render('sandbox', { title: 'Question' });
});

router.post('/testCode/', async function(req, res, next) {
    let userCode = req.body.code;
    let id = req.body.id;
    console.log(id)
    let result = sandboxService.runJsFunction(userCode,'');
    let exercise = await Exercise.findOne({
        where: {id: id}});

    if(result){
        if(exercise.answer != null){
            if(exercise.answer == result){
                await QuestionUser.create({userId: req.session.user.id, exerciseId: id})
                res.send({success: "the code ran", result: result})
            }
        }else{
            res.send({success: "results no match", result: result})
        }
    }else{
        res.send({error: "error"})
    }
    // console.log(result,"hadiuhasid");
    // res.render('sandbox', { title: 'Question' });
});

module.exports = router;
