const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Route to get all users
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.render('users/index.ejs', { users });
    });
});

