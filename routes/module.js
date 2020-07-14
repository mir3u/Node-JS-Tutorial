const express = require('express');
const router = express.Router();
const con = require('../Models/mysqlCon');
const MD5 = require('md5');
const { User, Module,Exercise,Theory,QuestionUser, Test } = require('../Models/sequelize')


router.get('/list/exercises/:id', async function(req, res, next) {
    let id = req.params.id;
    let exercisesSolved = await Exercise.findAll({
        where: {moduleId: id},
        include:[{model:User, where:{id: req.session.user.id}}]})
    let exercises = await Exercise.findAll({
        where: {moduleId: id}});
    let module = await Module.findOne({
        where: {id: id},
    })
    let percent = (exercisesSolved.length/exercises.length) * 100;

    let exercisesSolvedId = exercisesSolved.map( function(key,exercise){
        return key.id});

    // console.log(exercises);
    res.render('listExercises', { exercises: exercises, module:module, exercisesSolved: exercisesSolved, percent: percent, exercisesSolvedId: exercisesSolvedId});
});
router.get('/list/theory/:id', async function(req, res, next) {
    let id = req.params.id;
    // let exercisesSolved = await Exercise.findAll({
    //     where: {moduleId: id},
    //     include:[{model:User, where:{id: req.session.user.id}}]})
    // console.log(exercisesSolved)
    let theories = await Theory.findAll({
        where: {moduleId: id}});
    let module = await Module.findOne({
        where: {id: id},
    })
    // console.log(exercises);
    res.render('listTheory', { theories: theories, module:module});
});

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
router.get('/add/test/:id',async function(req, res, next) {
    let id = req.params.id;
    let module = await Module.findOne({where: {id:id}})
    let questionAll = await Exercise.findAll({where: {moduleId: module.id}});
    let countQuestion = questionAll ? questionAll.length : 0;
    res.render('addTest', {module:module, noOfQuestions: countQuestion, });
})
router.get('/add/theory/:id',async function(req, res, next) {
    let id = req.params.id;
    let module = await Module.findOne({where: {id:id}})
    res.render('addTheory', {module:module});
})
router.post('/add/theory/', async function(req, res, next) {
    let {title,question,example,difficulty,id} = req.body;
    await Theory.create({title:title,question:question,example:example, difficulty:difficulty, moduleId: id})
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
router.post('/add/test/', async  function (req, res) {
    let {noQs, id} = req.body;
    let moduleName = await Module.findOne({where: {id: id}})
    await Module.update({hasTest:1}, {where: {id:id}})
    await Test.create({noOfQuestions: noQs, module: moduleName.name, moduleId:id})
    res.redirect('/');
})
router.get('/take/test/:id', async  function (req, res) {
    let id = req.params.id;
    let exercises = await Exercise.findAll({where:{
        moduleId: id
        }})
    let exercisesIds = exercises.map( function(key,exercise){
       if(key.matchAnswer==true){ return key.id} });

    let length = exercises.length;
    let test = await Test.findOne({where: {moduleId: id}});
    let testLength = test.noOfQuestions;
    let exIds = [];
    for(let i=0; i<testLength; i++){
        populateArray(exercisesIds,exIds);
    }
    req.session.testOverall = [];
    req.session.testOverall[0] = test.id;
    req.session.exTest = exIds;

    res.redirect('/sandbox/test/next');
})
function populateArray(exercisesIds,exIds){
    let length = exercisesIds.length;
    let min = Math.ceil(exercisesIds[0]);
    let max = Math.floor(exercisesIds[length-1]);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(random,exercisesIds, min,max)
    if(!exIds.includes(random) && exercisesIds.includes(random)){
        exIds.push(random);
        return exIds;
    }else{
        populateArray(exercisesIds,exIds);
    }
}
router.post('/add/exercise/', async function(req, res, next) {
    let {question,example,answer,codeExample,difficulty,id,matchAnswer} = req.body;
    await Exercise.create({question:question,example:example,answer:answer,codeExample:codeExample, difficulty:difficulty, matchAnswer: matchAnswer, moduleId: id})
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

});

module.exports = router;
