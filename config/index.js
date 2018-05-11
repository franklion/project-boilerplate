const path = require('path')

const ar = ['first', 'second', 'third']
const PAGES = (DEVICE === 'pc') ? [...ar, 'ie'] : ar
const DEVICE = process.env.device


module.exports = {
  // 全自動化 js, sass, pug
  PAGES,
  DEVICE,

  dev: {
    assetsPublicPath: 'assets/',

    // Various Dev Server settings
    openPage: `${PAGES[0]}.html`, // 可以指定預設要開啟的頁面
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    poll: false,
  },

  build: {

    pathsToClean: ['dist/thor'], // 可以把整個 dist/刪除，或是改成只刪除 dist/thor or dist/release
    cleanOptions: {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
      exclude: DEVICE === 'pc' ? ['mb'] : ['assets', ...PAGES.map(page => `${page}.html`)],
    },
    // Paths
    assetsRoot: DEVICE === 'pc' ? path.resolve(__dirname, '../dist/thor') : path.resolve(__dirname, '../dist/thor/mb'),
    assetsPublicPath: 'assets/',

    bundleAnalyzerReport: false, // 分析 bundle

  },

  build_release: {

    pathsToClean: ['dist/release'], // 可以把整個 dist/刪除，或是改成只刪除 dist/thor or dist/release
    cleanOptions: {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
      exclude: DEVICE === 'pc' ? ['mb'] : ['assets', ...PAGES.map(page => `${page}.html`)],
    },
    // Paths
    assetsRoot: DEVICE === 'pc' ? path.resolve(__dirname, '../dist/release') : path.resolve(__dirname, '../dist/release/mb'),
    assetsPublicPath: 'assets/',

  },

}
