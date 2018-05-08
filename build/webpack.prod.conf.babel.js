'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
// const meta = require('../page_meta/thor.meta')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf.babel')

const env = require('../config/prod.env')

const ProdWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },

  plugins: [
    new HtmlWebpackPlugin({
        filename: 'first.html',
        inject: false,    // 關閉注入 webpack打包好的 css & js
        template: path.resolve(__dirname, '../src/pc/pug/page/first.pug'),
    }),
  ],

})

module.exports = ProdWebpackConfig