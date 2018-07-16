'use strict'

const utils                = require('./utils')
const config               = require('../config')
const merge                = require('webpack-merge')
const baseWebpackConfig    = require('./webpack.base.conf.babel')
const cleanWebpackPlugin   = require('clean-webpack-plugin')
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const miniCssExtractPlugin = require('mini-css-extract-plugin')



const ProdWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  }, 
  plugins: [
    new cleanWebpackPlugin(config.build.pathsToClean, config.build.cleanOptions),
    new miniCssExtractPlugin({ filename: `assets/css/[name].${utils.hashTime()}.css` }),
  ]
})

if (config.build.bundleAnalyzerReport) { ProdWebpackConfig.plugins.push( new bundleAnalyzerPlugin() ) }


module.exports = ProdWebpackConfig