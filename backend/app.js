const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const errorMiddleware = require('./middlewares/errors')

// import routes
const task = require('./routes/task');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json({ limit: '450mb' }))
app.use(express.static(path.join(__dirname, 'public' )))

app.use('/api', task);

// Middleware to handle errors
app.use(errorMiddleware)


module.exports = app