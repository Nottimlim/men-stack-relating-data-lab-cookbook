const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// ROUTER LOGIC

router.get('/', (req, res) => {
    res.render('foods/index.ejs')
});

router.get('/users/:userId/foods/new', (req, res) => {
    res.render('foods/new.ejs', { userId: req.params.userId });
});


module.exports = router;