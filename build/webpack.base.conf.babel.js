const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const thorMeta = require('../page_meta/thor.meta')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  stats: {
    children: false, // 隱藏編譯的子檔案
  },
  mode: 'none', // 關閉webpack cli 提供的 mode 模式
  entry: Object.assign(
    utils.handleEntry(config.PAGES, config.DEVICE),
    {
      vendors: ['jquery'],
      utils: ['./src/pc/js/utils/banner.js'],
    },
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
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../../', // 針對 background-image url 處理相對路徑, 在 下方 loader 都未使用的情況 才可動作
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          // filePath = publicPath + name ( '' + assets/images/... )
          name: `assets/images/[name].${utils.hashTime()}.[ext]`,
        },
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
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 30000, // 我们切割完要生成的新chunk要>30kb，否则不生成新chunk。
      minChunks: 1, // 共享该module的最小chunk数
      maxAsyncRequests: 5, // 最多有5个异步加载请求该module
      maxInitialRequests: 3, // 初始化的时候最多有3个请求该module
      // automaticNameDelimiter: '~', // 合成的間隔符號, ex: vendors~first~second~third.[hash].js
      // name: true,
      name: 'utils',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 30000, // 我们切割完要生成的新chunk要>30kb，否则不生成新chunk。
      minChunks: 1, // 共享该module的最小chunk数
      maxAsyncRequests: 5, // 最多有5个异步加载请求该module
      maxInitialRequests: 3, // 初始化的时候最多有3个请求该module
      // automaticNameDelimiter: '~', // 合成的間隔符號, ex: vendors~first~second~third.[hash].js
      // name: true,
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
    // ...config.PAGES.map(name => new htmlWebpackPlugin({
    //   filename: `${name}.html`,
    //   inject: false, // 關閉注入 webpack打包好的 css & js
    //   template: path.resolve(__dirname, `../src/pc/pug/pages/${name}.pug`),
    //   meta: thorMeta.meta,
    //   vendorsPath: `assets/js/vendors.${utils.hashTime()}.js`,
    //   utilsPath: `assets/js/utils.${utils.hashTime()}.js`,
    //   scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
    //   cssPath: `assets/css/${name}.${utils.hashTime()}.css`,
    //   minify: {
    //     removeComments:     process.env.NODE_ENV === 'production_release', // 移除註解
    //     collapseWhitespace: process.env.NODE_ENV === 'production_release', // 移除空格
    //     // removeComments:     /production_release/.test(process.env.NODE_ENV), // 移除註解
    //     // collapseWhitespace: /production_release/.test(process.env.NODE_ENV), // 移除空格
    //   },
    // })),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      isMobile: 'ismobilejs',
    }),
    new miniCssExtractPlugin({ // 輸出 css
      filename: `assets/css/[name].${utils.hashTime()}.css`,
    }),
    // 參考 https://juejin.im/post/5a1127666fb9a045023b3a63
    // doc https://doc.webpack-china.org/plugins/commons-chunk-plugin/
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   filename: `assets/js/vendors.${utils.hashTime()}.js`,
    //   minChunks: Infinity,
    // }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'utils',
    //   filename: `assets/js/utils.${utils.hashTime()}.js`,
    //   minChunks(module) {
    //     return (
    //       module.resource && /\.js$/.test(module.resource) &&
    //                 module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
    //             )
    //         },
    //         chunks: config.PAGES
    // }),
    // new copyWebpackPlugin([  // 複製圖片資料夾
    //     {
    //       from: path.resolve(__dirname, `../src/${config.DEVICE}/images`),
    //       to: `assets/images`,
    //     //   to: `assets/images/[path][name].${utils.hashTime()}.[ext]`,
    //       ignore: ['.*']
    //     }
    // ]),
  ],
}
