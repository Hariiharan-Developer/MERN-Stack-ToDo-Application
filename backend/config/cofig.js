const mongoose = require('mongoose')

const connectDB = async()=>{
   
    try {
       await  mongoose.connect(process.env.MONGO_URI)
         console.log('Database conected successfully')
    } catch (error) {
        console.log('Database connection Error',error.message)
    }
}
module.exports = connectDB