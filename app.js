require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const movieRoutes = require('./routes/movieRoute')
const userRoutes = require('./routes/userRoute')
// const likeRoutes = require('./routes/like')

const app = express()

app.use(cors())
app.use(helmet())

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/movie', movieRoutes)
// app.use('/api/posts', likeRoutes)

module.exports = app