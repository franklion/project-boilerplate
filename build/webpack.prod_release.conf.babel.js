'use strict'

const utils                   = require('./utils')
const config                  = require('../config')
const merge                   = require('webpack-merge')
const baseWebpackConfig       = require('./webpack.base.conf.babel')
const cleanWebpackPlugin      = require('clean-webpack-plugin')
const imageminPlugin          = require('imagemin-webpack-plugin').default
const imageminMozjpeg         = require('imagemin-mozjpeg')
const UglifyJsPlugin          = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const miniCssExtractPlugin    = require('mini-css-extract-plugin')


const ProdReleaseWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build_release.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },
  plugins: [
    new cleanWebpackPlugin(config.build_release.pathsToClean, config.build_release.cleanOptions),
    new UglifyJsPlugin({ parallel: true, }), // 壓縮 js
    new miniCssExtractPlugin({ filename: `assets/css/[name].${utils.hashTime()}.css`, }),
    new OptimizeCSSAssetsPlugin({}), // 壓縮 css
    new imageminPlugin({ 
        minFileSize: 200000, // 根據專案進行客製化 200kb 以上壓縮
        pngquant: {
            quality: '65-90',
            speed: 4,
        }, 
        gifsicle: {
            optimizationLevel: 3,
        },
        svgo: {
            plugins: [{
                removeViewBox: false,
                removeEmptyAttrs: true,
            }],
        },
        jpegtran: {
            progressive: true,
        },
        plugins: [
            imageminMozjpeg({
                quality: 85,
                progressive: true,
            }),
        ],
    }),
  ]
})


module.exports = ProdReleaseWebpackConfig