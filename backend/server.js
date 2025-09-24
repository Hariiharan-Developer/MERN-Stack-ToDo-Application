const express =require('express')
const router = require('./route/todo.router')
const app = express()
const dotenv  =require('dotenv').config()



app.use('/api/todo',router)
app.listen(process.env.PORT,()=>{
    console.log(`server listening on the port:http://localhost:${process.env.PORT}`)
})