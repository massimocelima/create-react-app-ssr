'use strict';

const path = require('path')
const clientConfig = require('./webpack.config.prod');
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
        i === 0 || // CommonsChunkPlugin
        i === 1 || // InterpolateHtmlPlugin
        i === 2 || // HtmlWebpackPlugin
        // i === 4 || // UglifyJsPlugin
        i === 5 || // ExtractTextPlugin
        i === 6 || // ManifestPlugin
        i === 7 // SWPrecacheWebpackPlugin
    ), new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    })),
    node: {
        __dirname: false,
        __filename: false,
    }
});
