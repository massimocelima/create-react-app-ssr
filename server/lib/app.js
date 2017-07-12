const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

// routes
const api = require('./routes/api')
const universalLoader = require('../build/server').default
const router = express.Router()
const clientStats = require('../../build/stats.json')

router.get('/', universalLoader({ clientStats } ) )

const app = express()

// Support Gzip
app.use(compression())

// Suport post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup logger
app.use(morgan('combined'))

app.use('/', router)

//No you cannot download me, i am private
app.use('/server.js', (req, res) => { res.status(400); res.send(""); } )

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', "..", 'build')))

app.use('/api', api)
app.use('/api/*', api)

// Always return the main index.html, so react-router render the route in the client
app.use('*', universalLoader({ clientStats } ))

module.exports = app
