

// const express = require('express');
// const router = express.Router();
// const DistributedTask = require('../models/UserRegisterSchema');
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userEmailAndPasswordToken:String
})

module.exports  =  mongoose.model('users',userSchema);