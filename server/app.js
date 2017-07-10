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
router.get('/', universalLoader)

const app = express()

// Support Gzip
app.use(compression())

// Suport post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup logger
app.use(morgan('combined'))

app.use('/', router)

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use('/api', api)

// Always return the main index.html, so react-router render the route in the client
app.use('*', function(req, res) {
    universalLoader(req, res);
})

module.exports = app
