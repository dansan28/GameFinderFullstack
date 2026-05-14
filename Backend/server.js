require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')

const userRoutes = require('./routes/userRoutes')
const favoriteRoutes = require('./routes/favoriteRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/reviews', reviewRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'GameFinder API running' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
