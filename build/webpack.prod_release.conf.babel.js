'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.babel')

const env = require('../config/prod_release.env')

const ProdReleaseWebpackConfig = merge(baseWebpackConfig, {



})

module.exports = ProdReleaseWebpackConfig