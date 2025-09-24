const express =require('express')
const app = express()
const dotenv  =require('dotenv').config()


app.listen(process.env.PORT,()=>{
    console.log(`server listening on the port:${process.env.PORT}`)
})