'use strict'

const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.babel')
const HtmlWebpackPlugin = require('html-webpack-plugin')


// process.env 需要自行定義
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)



const devWebpackConfig = merge( baseWebpackConfig, { 

  devServer: {
    contentBase: config.dev.contentBase,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
  },
})

module.exports = devWebpackConfig