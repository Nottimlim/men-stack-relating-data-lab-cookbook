const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Route to get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find({});
      res.render('users/index.ejs', { users });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  });

