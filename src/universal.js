import path from 'path'
import fs from 'fs'

import React from 'react'
import {renderToString} from 'react-dom/server'

//const {default: configureStore} = require('../src/store')
import App from './App'

export default function (req, res) {
  const filePath = path.resolve(__dirname, 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    //const store = configureStore()
    const markup = renderToString(
      <App/>
    )

    //if (context.url) {
    //  // Somewhere a `<Redirect>` was rendered
    //  redirect(301, context.url)
    //} else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('<div id="root"></div>', '<div id="root">' + markup + '</div>')
      res.send(RenderedApp)
    //}
  })
}

