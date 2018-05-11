'use strict'
const path               = require('path')
const utils              = require('./utils')
const webpack            = require('webpack')
const config             = require('../config')
const merge              = require('webpack-merge')
const releaseMeta        = require('../page_meta/release.meta')
const baseWebpackConfig  = require('./webpack.base.conf.babel')
const env                = require('../config/prod_release.env')
const htmlWebpackPlugin  = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const extractTextPlugin  = require('extract-text-webpack-plugin');



const ProdReleaseWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build_release.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },

  plugins: [
    new cleanWebpackPlugin(config.build_release.pathsToClean, config.build_release.cleanOptions),
    ...config.PAGES.map((name) => {
      return new htmlWebpackPlugin({
        filename: `${name}.html`,
        inject: false,    // 關閉注入 webpack打包好的 css & js
        template: path.resolve(__dirname, `../src/pc/pug/pages/${name}.pug`),
        meta: releaseMeta.meta,
        scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
        cssPath: `assets/css/${name}.${utils.hashTime()}.css`,
        minify: {
          removeComments:     true, // 移除註解
          collapseWhitespace: true, // 移除空格
        },
      })
    }),
    new webpack.optimize.UglifyJsPlugin(), // 壓縮 js
    new webpack.LoaderOptionsPlugin({   minimize: true }) // 壓縮 css 
  ]

})


module.exports = ProdReleaseWebpackConfig