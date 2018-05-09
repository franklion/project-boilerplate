'use strict'
const path              = require('path')
const utils             = require('./utils')
const webpack           = require('webpack')
const config            = require('../config')
const merge             = require('webpack-merge')
const releaseMeta       = require('../page_meta/release.meta')
const baseWebpackConfig = require('./webpack.base.conf.babel')
const env               = require('../config/prod_release.env')




const ProdReleaseWebpackConfig = merge(baseWebpackConfig, {

  output: {
    path: config.build_release.assetsRoot,
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },

  plugins: PAGES.map((name) => {
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      inject: false,    // 關閉注入 webpack打包好的 css & js
      template: path.resolve(__dirname, `../src/pc/pug/page/${name}.pug`),
      meta: releaseMeta.meta,
      scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
      minify: {
        removeComments:     true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })
  })

})

module.exports = ProdReleaseWebpackConfig