const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(({

        title :
        {
            type:String,
            required:true    
        },
        description:
        {
            type:String,
            required:true
        }
},
{timestamp:true}))

const todo = mongoose.model = ('Todo',todoSchema)
module.exports =todo