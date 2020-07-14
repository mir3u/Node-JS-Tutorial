const express = require('express');
const router = express.Router();
const { User, Module,Theory } = require('../Models/sequelize')

router.get('/show/:id', async function(req, res, next) {
    let id = req.params.id;

    let theory = await Theory.findOne({
        where: {id: id}});
    let module = await Module.findOne({
        where: {id: theory.moduleId},
    })
    // console.log(exercises);
    res.render('theoryView', { theory: theory, module:module});
});
module.exports = router;