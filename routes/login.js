const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    /* TO DO
        Create the login form in twig
     */
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    let {username, password} = req.body;
    /*
        TO DO
        1. Verify the user exists in the database;
        2. Check the password matches (The password must be encrypted)
        3. Save the user in the session.
     */
    res.render('login', { title: 'Login' });
});

module.exports = router;
