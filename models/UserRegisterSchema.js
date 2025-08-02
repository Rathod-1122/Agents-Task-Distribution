// models/UserRegisterSchema.js

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userEmailAndPasswordToken: String
})

module.exports = mongoose.model('users', userSchema);