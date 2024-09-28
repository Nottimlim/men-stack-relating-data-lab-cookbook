const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Route to render the form for adding a new item
router.get('/new', (req, res) => {
    res.render('foods/new.ejs', { userId: req.params.userId });
});

// Create route to add a new item
router.post('/', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        user.pantry.push(req.body);
        user.save((err) => {
            if (err) {
                console.error(err);
            return res.redirect('/');
            }
            res.redirect(`/users/${req.params.userId}/foods`);
        });
    });
});

// Route to display all items in the pantry
router.get('/', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.render('foods/index.ejs', { pantry: user.pantry, userId: req.params.userId });
    });
});

// Delete route to remove an item
router.delete('/:itemId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        user.pantry.id(req.params.itemId).remove();
        user.save((err) => {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }
            res.redirect(`/users/${req.params.userId}/foods`);
        });
    });
});

// Edit route to render the form for editing an item
router.get('/:itemId/edit', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        const foodItem = user.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', { foodItem, userId: req.params.userId });
    });
});

// Update route to edit an item
router.put('/users/:userId/foods/:itemId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        const foodItem = user.pantry.id(req.params.itemId);
        foodItem.set(req.body);
        user.save((err) => {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }
            res.redirect(`/users/${req.params.userId}/foods`);
        });
    });
});

module.exports = router;