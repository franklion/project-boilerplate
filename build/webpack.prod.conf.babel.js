'use strict'
const path               = require('path')
const utils              = require('./utils')
const webpack            = require('webpack')
const config             = require('../config')
const merge              = require('webpack-merge')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const baseWebpackConfig  = require('./webpack.base.conf.babel')
const env                = require('../config/prod.env')
const cleanWebpackPlugin = require('clean-webpack-plugin')




const ProdWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },
  plugins: [
    new cleanWebpackPlugin(config.build.pathsToClean, config.build.cleanOptions),
  ]
})

module.exports = ProdWebpackConfig