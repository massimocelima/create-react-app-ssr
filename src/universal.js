import path from 'path'
import fs from 'fs'

import React from 'react'
import {renderToString} from 'react-dom/server'
//import { flushChunkNames } from 'react-universal-component/server'
//import flushChunks from 'webpack-flush-chunks'

// TODO Setup the redux store
// TODO Setup redux-first-router
// TODO Setup jss ssr

//const {default: configureStore} = require('../src/store')
import App from './App'

export default ({ clientStats }) => (req, res) => {
  const filePath = path.resolve(__dirname, 'index.html')

  //const chunkNames = flushChunkNames()
  //const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
  //const { js } = flushChunks(clientStats, { chunkNames })

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    //const store = configureStore()
    const markup = renderToString(
      <App/>
    )

    // TODO Handle redirects - redirect(301, context.url)
      // Need to turn the script and css injection off for the below to work
    //const RenderedApp = htmlData.replace('<div id="root"></div>', `${styles}<div id="root">${markup}</div>${js}${cssHash}`)
      const RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      res.send(RenderedApp)
  })
}

