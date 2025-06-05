const express = require('express')
const rateLimit = require('express-rate-limit')
const path = require('path')
const fileRoutes = require('./routes/files')

const app = express()
const PORT = 3000

const limiter = rateLimit({  // to limit DDoS attacks
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
})
app.use(limiter)

app.use('/files', express.static(path.join(__dirname, 'uploads')))

app.use('/', fileRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
