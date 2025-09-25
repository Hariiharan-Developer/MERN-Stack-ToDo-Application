const express =require('express')
const router = require('./route/todo.router')
const connectDB = require('./config/cofig')
const app = express()
const dotenv  =require('dotenv').config()
const cors =require('cors')


app.use(cors())
app.use(express.json())
connectDB()
app.use('/api/todo',router)
app.listen(process.env.PORT,()=>{
    console.log(`server listening on the port:http://localhost:${process.env.PORT}`)
})