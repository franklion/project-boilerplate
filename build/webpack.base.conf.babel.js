'use strict'

const path                   = require('path')
const webpack                = require('webpack')
const utils                  = require('./utils')
const config                 = require('../config')
const thorMeta               = require('../page_meta/thor.meta')
const releaseMeta            = require('../page_meta/release.meta')
const htmlWebpackPlugin      = require('html-webpack-plugin')
const copyWebpackPlugin      = require('copy-webpack-plugin')
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
const miniCssExtractPlugin   =  require('mini-css-extract-plugin')




module.exports = {
  stats: {
    children: false, // 隱藏編譯的子檔案
  },
  mode: 'none', // 關閉webpack cli 提供的 mode 模式
  entry: Object.assign(
    utils.handleEntry(config.PAGES, config.DEVICE), 
    {
      redirectUrlByDevice: [
        config.DEVICE === 'pc' ? './src/pc/js/utils/goto-mobile.js' : './src/pc/js/utils/goto-pc.js',
      ]
    }
  ),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: `assets/js/[name].${utils.hashTime()}.js`,
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          config.NODE_ENV === 'development' ? 'style-loader' : 
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../../', // 針對 background-image url 處理相對路徑
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
          loader: 'file-loader',
          options: {
            name: `assets/images/[folder]/[name].${utils.hashTime()}.[ext]`,
          },
        }
      ]
      },
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
              ['es2015', { modules: false, loose: false }],
            ],
          },
        }, 
      ],
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true,
            hash: true,
          },
        }],
      },
    ],
  },
  plugins: [
    ...config.PAGES.map(name => new htmlWebpackPlugin({
      filename: `${name}.html`,
      inject: false, // 關閉注入 webpack打包好的 css & js
      template: path.resolve(__dirname, `../src/${config.DEVICE}/pug/pages/${name}.pug`),
      meta: config.NODE_ENV === 'production_release' ? releaseMeta.meta : thorMeta.meta,
      vendorsPath: `assets/js/vendors.${utils.hashTime()}.js`,
      redirectUrlByDevicePath: config.NODE_ENV === 'development' ? '' : `assets/js/redirectUrlByDevice.${utils.hashTime()}.js`,
      scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
      cssPath: config.NODE_ENV === 'development' ? '' : `assets/css/${name}.${utils.hashTime()}.css`,
      minify: {
        removeComments:     config.NODE_ENV === 'production_release', // 移除註解
        collapseWhitespace: config.NODE_ENV === 'production_release', // 移除空格
      },
    })),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 30000, // 我们切割完要生成的新chunk要>30kb，否则不生成新chunk。
      minChunks: 1, // 共享該module的最小chunk數
      maxAsyncRequests: 5, // 最多有5个非同步加载请求該module
      maxInitialRequests: 3, // 初始化的時候最多有3个請求該module
      name: 'vendors',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          chunks: config.PAGES,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }),
    // new flowBabelWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      isMobile: 'ismobilejs',
      'window.jQuery': 'jquery',
    }),
  ],
}

if(config.DEVICE === 'pc') {
  module.exports.plugins.push(
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/images/share'),
        to: 'assets/images/share',
        // to: `assets/images/[path][name].${utils.hashTime()}.[ext]`,
        ignore: ['.*']
    }]
  )
  )
}