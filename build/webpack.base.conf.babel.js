'use strict'
const path   = require('path')
const utils  = require('./utils')
const config = require('../config')

// 專案所有頁面 會用此名稱生成對應的 html, js, css
const PAGES = ['first', 'second', 'third']

// 取得 command line option
const DEVICE = process.env.device

// console.log( utils.handleEntry(PAGES, DEVICE) )
// console.log( process.env.device )


module.exports = {
  entry: utils.handleEntry(PAGES, DEVICE),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `[name].${utils.hashTime()}.js`,
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
              {
                  /* webpack 2.x 移除了省略 -loader 的寫法 */
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          /* Loose mode and No native modules(Tree Shaking) */
                          ['es2015', { modules: false, loose: false }]
                      ]
                  }
              }
          ]    
      },  
      {
          test: /\.pug$/,
          use: [{
              loader: 'pug-loader',
              options: {
                  pretty: true,
                  hash: true
              }
          }]
      },
    ]
  }
}
