'use strict'

const webpack           = require('webpack')
const config            = require('../config')
const merge             = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.babel')


// process.env 需要自行定義
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)



const devWebpackConfig = merge( baseWebpackConfig, { 

  devServer: {
    openPage: config.dev.openPage,
    contentBase: config.dev.contentBase,
    historyApiFallback: true,
    // hot: true, // 暫時有問題先不使用
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    stats: { 
      children: false,
      chunks: false 
    },
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),  // 配合 hot reload 
    // new webpack.HotModuleReplacementPlugin(), // 配合 hot reload 
  ]

})

module.exports = devWebpackConfig