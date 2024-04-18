const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require("./routes");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config()


const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())
app.use(cookieParser())


 routes(app);

 mongoose.connect('mongodb+srv://phtuyen2002:OKdcF5hiZGcc2iFt@cluster0.cuahved.mongodb.net/')
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})