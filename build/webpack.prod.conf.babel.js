'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
// const meta = require('../page_meta/thor.meta')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf.babel')

// console.log(config)

const env = require('../config/prod.env')
// const PAGES = baseWebpackConfig.PAGES
// console.log('baseWebpackConfig ', baseWebpackConfig)
const ProdWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },
  // single
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     // filename: 'first.html',
  //     filename: `${config.dev.PAGES[0]}.html`,
  //     inject: false,    // 關閉注入 webpack打包好的 css & js
  //     template: path.resolve(__dirname, `../src/pc/pug/page/${config.dev.PAGES[0]}.pug`),
  //   }),
  // ],
  // automatics
  plugins: config.dev.PAGES.map((name) => {
    return new HtmlWebpackPlugin({
      // filename: 'first.html',
      filename: `${name}.html`,
      inject: false,    // 關閉注入 webpack打包好的 css & js
      template: path.resolve(__dirname, `../src/pc/pug/page/${name}.pug`),
    })
  })

})

module.exports = ProdWebpackConfig