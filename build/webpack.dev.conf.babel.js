'use strict'

const path                 = require('path')
const webpack           = require('webpack')
const config            = require('../config')
const thorMeta = require('../page_meta/thor.meta')
const utils             = require('./utils')
const merge             = require('webpack-merge')
const env               = require('../config/dev.env')
const baseWebpackConfig = require('./webpack.base.conf.babel')
const htmlWebpackPlugin = require('html-webpack-plugin')


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
    //- process.env 參數暫時沒用到
    new webpack.DefinePlugin({
        'process.env': env
    }),
    ...config.PAGES.map(name => new htmlWebpackPlugin({
      filename: `${name}.html`,
      inject: false, // 關閉注入 webpack打包好的 css & js
      template: path.resolve(__dirname, `../src/pc/pug/pages/${name}.pug`),
      meta: thorMeta.meta,
      vendorsPath: `assets/js/vendors.${utils.hashTime()}.js`,
      utilsPath: `assets/js/utils.${utils.hashTime()}.js`,
      scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
      cssPath: `assets/css/${name}.${utils.hashTime()}.css`,
      minify: {
        removeComments:     false, // 移除註解
        collapseWhitespace: false, // 移除空格
      },
    })),
    // new webpack.NamedModulesPlugin(),  // 配合 hot reload 
    // new webpack.HotModuleReplacementPlugin(), // 配合 hot reload 
  ]

})

module.exports = devWebpackConfig