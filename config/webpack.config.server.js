'use strict';

const path = require('path')
const clientConfig = require('./webpack.config.client');
const paths = require('./paths')
const _ = require('lodash')
const webpack = require('webpack')

module.exports = Object.assign({}, clientConfig, {
    entry: paths.ssrIndexJs,
    output: Object.assign({}, clientConfig.output, {
        filename: 'server.js',
        chunkFilename: 'server.[chunkhash:8].chunk.js',
        library: 'server',
        libraryTarget: 'commonjs2',
    }),
    target: 'node',
    module: Object.assign({}, clientConfig.module, {
        rules: _.concat(_.reject(clientConfig.module.rules, rule => rule.test && rule.test.toString().indexOf('css') >= 0), [
            // Throw away the CSS
            {
                test: /\.css$/,
                loader: 'null-loader',
            },
        ])
    }),
    plugins: _.concat(_.reject(clientConfig.plugins, (plugin, i) =>
        i === 0 || // InterpolateHtmlPlugin
        i === 1 || // HtmlWebpackPlugin
        // i === 3 || // UglifyJsPlugin
        i === 4 || // ExtractTextPlugin
        i === 5 || // ManifestPlugin
        i === 6 // SWPrecacheWebpackPlugin
    )),
    node: {
        __dirname: false,
        __filename: false,
    }
});
