const express = require('express')
const router = require('./route/todo.router')
const connectDB = require('./config/cofig')
const path = require('path')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect MongoDB
connectDB()

// API routes
app.use('/api/todo', router)

// Serve React frontend
// 1. Set static folder
app.use(express.static(path.join(__dirname, '../frontend/build')))

// 2. Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
