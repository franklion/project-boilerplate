'use strict'

const path              = require('path')
const webpack           = require('webpack')
const config            = require('../config')
const merge             = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.babel')


const devWebpackConfig = merge( baseWebpackConfig, { 

  devServer: {
    openPage: config.dev.openPage,
    contentBase: config.dev.contentBase,
    // watchContentBase: true,
    historyApiFallback: true,
    hot: true, // 暫時有問題先不使用
    compress: true,
    useLocalIp: true, // 統一使用local ip
    host: '0.0.0.0',
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    stats: { 
      children: false,
      chunks: false
    },
    watchOptions: {
      poll: config.dev.poll,
    },
    inline: config.dev.inline,
    before(app, server) {
      // server._watch(`./src/pc/pug/components/*.pug`);
      // server._watch(`./src/pc/pug/pages/*.pug`);
      server._watch(`src/pc/pug/**/*.pug`);
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),  // 配合 hot reload 
    new webpack.HotModuleReplacementPlugin(), // 配合 hot reload 
  ]

})

module.exports = devWebpackConfig