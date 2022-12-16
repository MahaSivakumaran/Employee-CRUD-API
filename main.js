const express = require('express');
const mongoose = require('mongoose');
const app = express();
require ('dotenv').config();
const router = require('./router/router');


const {PORT,DB_URL} = process.env

app.use(express.json());
app.use('/api',router);

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message =err.message || "Internal server error";
    return res.status(status).json({
        status,message
    })
})

mongoose.connect(DB_URL)
.then(()=>{
    app.listen(PORT || 5000,()=>{
        console.log(`server connected on ${PORT || 5000}`)
    })
}).catch((err)=>{
    console.log(err.message)
});



