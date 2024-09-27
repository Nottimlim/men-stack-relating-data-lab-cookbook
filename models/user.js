const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true,
   },
   calories: {
     type: Number,
     required: true,
   },
   protein: {
    type: Number,
    required: true,
   },
   carbs: {
    type: Number,
    required: true,
   },
   fat: {
    type: Number,
    required: true,
   },
   });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: {
    type: [foodSchema],
}});

const User = mongoose.model('User', userSchema);

module.exports = User;
