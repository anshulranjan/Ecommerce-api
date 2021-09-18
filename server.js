const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
})
.then(()=> console.log('DB CONNECTED'))
.catch(err => console.log(`DB CONNECTION ERROR ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"1000mb"}));
app.use(cors());

//routes middleware
fs.readdirSync('./routes').map((r)=> app.use(require('./routes/' + r)))

//port
const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));
