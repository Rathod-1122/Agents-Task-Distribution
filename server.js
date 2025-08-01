const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require ('cors')

const app = express();
app.use(cors());


app.listen(4444,()=>{
  console.log('server is running on the port :4444')
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


app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/saveThedistributedData'));
app.use('/', require('./routes/fetchDistributedData'));

