const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json())


app.listen(4444, () => {
  console.log('server is running on the port :4444')
})


// -------------- Data Base Part --------------------

let connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MDBConnectionString);
    console.log('server has connected to Data Base')
  } catch (err) {
    console.log('server unable to connect to the Data Base')
  }
}
connectToDB();
// Api cals on the server side
app.use('/', require('./routes/registerAPI'));
app.use('/', require('./routes/loginAPI'));
app.use('/', require('./routes/savingDistributedDataAPI'));
app.use('/', require('./routes/fetchDistributedDataAPI'));

