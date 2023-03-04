const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path:"./config.env"});
const port =  process.env.PORT || 5000;

//mongodb connection
const conn = require("./db/conn");
// conn.then(db=>{
//     if(!db)return process.exit(1)
    

//     app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
//     //error in mongodb connection

// }).catch(error=>{
//     console.log( `Connection Failed....! ${error}`)
// });

//use middleware
app.use(cors());
app.use(express.json());

//using routes
app.use(require('./routes/route'))






app.listen(port ,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
    })






