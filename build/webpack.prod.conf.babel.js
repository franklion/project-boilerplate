'use strict'
const path                 = require('path')
const utils                = require('./utils')
const webpack              = require('webpack')
const config               = require('../config')
const merge                = require('webpack-merge')
const releaseMeta          = require('../page_meta/release.meta')
const baseWebpackConfig    = require('./webpack.base.conf.babel')
const env                  = require('../config/prod.env')
const cleanWebpackPlugin   = require('clean-webpack-plugin')
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const htmlWebpackPlugin    = require('html-webpack-plugin')





const ProdWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },
  plugins: [
    //- process.env 參數暫時沒用到
    new webpack.DefinePlugin({
        'process.env': env
    }),
    new cleanWebpackPlugin(config.build.pathsToClean, config.build.cleanOptions),
    ...config.PAGES.map((name) => {
      return new htmlWebpackPlugin({
        filename: `${name}.html`,
        inject: false,    // 關閉注入 webpack打包好的 css & js
        template: path.resolve(__dirname, `../src/pc/pug/pages/${name}.pug`),
        meta: releaseMeta.meta,
        scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
        cssPath: `assets/css/${name}.${utils.hashTime()}.css`,
      })
    }),
  ]
})

if (config.build.bundleAnalyzerReport) {
  ProdWebpackConfig.plugins.push( new bundleAnalyzerPlugin() )
}

module.exports = ProdWebpackConfig