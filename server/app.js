const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { default: rateLimit } = require('express-rate-limit')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

const app = express()

/**
 * Limit concurrent request to all server routes
 * to 10 per minute
 */
let limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
})

app.use(limiter)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/api', apiRouter)

module.exports = app
