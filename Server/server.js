const express  = require("express");
const app = express ();
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const user = require("./Routes/user")
const admin = require("./Routes/admin")
app.use('/user' , user)
app.use('/admin' , admin)

const PORT = 5100

app.listen (PORT , ()=>{
    console.log("Server Started on : " ,PORT);
})
