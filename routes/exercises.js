const express = require('express');
const router = express.Router();
const { User, Module,Exercise,QuestionUser } = require('../Models/sequelize')

router.get('/solve/:id', async function(req, res, next) {
    let id = req.params.id;

    let exercise = await Exercise.findOne({
        where: {id: id}});
    let module = await Module.findOne({
        where: {id: exercise.moduleId},
    })
    console.log(exercise);
    // console.log(exercises);
    res.render('sandbox', { exercise: exercise, module:module});
});

router.get('/next/solve', async function(req, res, next) {
    let exercises = await Exercise.findAll();
    for(let i in exercises){
        let isSolved = await QuestionUser.findOne({where: {exerciseId: exercises[i].id}});
        if(isSolved == null){
            let exercise = exercises[i];
            let module = await Module.findOne({
                where: {id: exercise.moduleId},
            })
            res.render('sandbox', { exercise: exercise, module:module});
            break;
        }
    }
    res.redirect('/');

});
router.get('/delete/:id/:moduleId', async function(req, res, next) {
    let {id, moduleId} = req.params;

    let exercise = await Exercise.destroy({
        where: {id: id}});

    // console.log(exercises);
    res.redirect('/module/list/exercises/'+moduleId);
});
module.exports = router;