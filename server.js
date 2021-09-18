const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
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

//route
app.get('/', (req,res)=>{
    res.json({
        data:"HELLO TO NODE JS"
    });
});
const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));
