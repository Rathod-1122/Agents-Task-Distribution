

const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const users = require('../models/UserRegisterSchema');

router.post('/register',async(req,res)=>{

  console.log('inside the register request')
  let token = jwt.sign({email:req.body.email,password:req.body.password},'key')

  let user1 = new users({
    userEmailAndPasswordToken:token
  })

  users.insertMany([user1,])

  console.log('user created successfully')
  res.json({status:'success',message:'user created successfully'})
})

module.exports = router;