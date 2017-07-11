import path from 'path'
import fs from 'fs'

import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {Helmet} from 'react-helmet'
import {SheetsRegistryProvider, SheetsRegistry} from 'react-jss'
import configureStore from './universalStore'

//import { flushChunkNames } from 'react-universal-component/server'
//import flushChunks from 'webpack-flush-chunks'

import App from './components/App'

export default ({clientStats}) => (req, res) => {
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')

    //const chunkNames = flushChunkNames()
    //const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
    //const { js } = flushChunks(clientStats, { chunkNames })

    fs.readFile(filePath, 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }

        const store = await configureStore(req, res);
        if (!store) return // no store means redirect was already served

        const sheets = new SheetsRegistry()

        const markup = renderToString(
            <Provider store={store}>
                <SheetsRegistryProvider registry={sheets}>
                    <App/>
                </SheetsRegistryProvider>
            </Provider>
        )

        const preloadedState = store.getState();
        const stateJS = JSON.stringify(preloadedState)
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Issue_with_plain_JSON.stringify_for_use_as_JavaScript
                .replace(/\u2028/g, '\\u2028')
                .replace(/\u2029/g, '\\u2029')
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                .replace(/</g, '\\u003c')
        const stateHtml = `<script>window.__PRELOADED_STATE__ = ${stateJS};</script>`
        const styles = `<style type="text/css" id="server-side-styles">${sheets.toString()}</style>`
        const helmet = Helmet.renderStatic()

        // TODO Handle redirects - res.redirect(301, context.url)
        // Need to turn the script and css injection off for the below to work
        // const RenderedApp = htmlData.replace('<div id="root"></div>', `${styles}<div id="root">${markup}</div>${js}${cssHash}`)
        htmlData = htmlData
            .replace(/(<title>)[^<]*(<\/title>)/, helmet.title.toString() + helmet.meta.toString() + helmet.link.toString() + styles )
            .replace(/(<div id=["']?root["']?>)[^<]*(<\/div>)/, function (match, opening, closing) {
                return `${opening}${markup}${closing}${stateHtml}`})
        res.send(htmlData)
    })
}

