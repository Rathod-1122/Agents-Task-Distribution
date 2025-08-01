const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const cors = require ('cors')

const app = express();
app.use(cors());

const upload=multer({dest:'uploads'})

app.listen(4444,()=>{
  console.log('server is running on the port :4444')
})

app.get('/login/:email/:password',async(req,res)=>{

  console.log('inside the login request')
  let result = await users.find();
  // console.log(result)
  if(result.length>0){
    for(i=0;i<result.length;i++){
      decrypt=jwt.verify(result[i].userEmailAndPasswordToken,'key');
      console.log(decrypt)
      if(decrypt.email==req.params.email) {
        if(decrypt.password==req.params.password){
          return res.json({status:'success',message:'user loged in successfully'})
        }
        else{
          return res.json({status:'failed',message:'enter the valid password'})
        }
      } 
    }
    return res.json({status:'failed',message:'enter the valid email'})
  }
  else{
    return res.json({message:'There are no any users in the database,please register first'})
  }

})

app.post('/register',upload.none(),async(req,res)=>{

  console.log('inside the register request')
  let token = jwt.sign({email:req.body.email,password:req.body.password},'key')

  let user1 = new users({
    userEmailAndPasswordToken:token
  })

  users.insertMany([user1,])

  console.log('user created successfully')
  res.json({status:'success',message:'user created successfully'})
})


// -------------- Data Base Part --------------------

let connectToDB = async()=>{

  try{
    mongoose.connect('mongodb+srv://kethavathanil17:RUI6tuq81xVKymI6@cluster0.chmibck.mongodb.net/AdminsData?retryWrites=true&w=majority&appName=Cluster0');
    console.log('server has connected to Data Base')
  }catch(err){
    console.log('server unable to connect to the Data Base')
  }
}
connectToDB();

let userSchema = new mongoose.Schema({
  userEmailAndPasswordToken:String
})

let users = new mongoose.model('users',userSchema);



const distributeRoutes = require('./routes/distribute');
app.use('/api/distribute', distributeRoutes);
