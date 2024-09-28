const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Route to render the form for adding a new item
router.get('/new', (req, res) => {
    res.render('foods/new.ejs', { userId: req.params.userId });
});

// Create route to add a new item
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.error('User not found');
            return res.redirect('/');
        }
        user.pantry.push(req.body);
        await user.save();
        console.log('Food item added successfully');
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/');
    }
});

// Route to display all items in the pantry
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.error('User not found');
            return res.redirect('/');
        }
        res.render('foods/index.ejs', { pantry: user.pantry, userId: req.params.userId });
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/');
    }
});

// Delete route to remove an item
router.delete('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.error('User not found');
            return res.redirect('/');
        }
        user.pantry.id(req.params.itemId).remove();
        await user.save();
        console.log('Food item deleted successfully');
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/');
    }
});

// Edit route to render the form for editing an item
router.get('/:itemId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.error('User not found');
            return res.redirect('/');
        }
        const foodItem = user.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', { foodItem, userId: req.params.userId });
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/');
    }
});

// Update route to edit an item
router.put('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.error('User not found');
            return res.redirect('/');
        }
        const foodItem = user.pantry.id(req.params.itemId);
        foodItem.set(req.body);
        await user.save();
        console.log('Food item updated successfully');
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/');
    }
});

module.exports = router;
