'use strict'

const path = require('path')


const PAGES  = ['first', 'second', 'third']
const DEVICE = process.env.device


module.exports = { 
  // 全自動化 js, sass, pug
  PAGES,
  DEVICE,

  dev: {
    assetsPublicPath: 'assets/',

    // Various Dev Server settings
    openPage: 'first.html', // 可以指定預設要開啟的頁面
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080,        // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
  },

  build: {

    pathsToClean: ['dist/thor'], // 可以把整個 dist/刪除，或是改成只刪除 dist/thor or dist/release
    cleanOptions: {
      root: path.resolve(__dirname, `../`),
      verbose:  true,
      dry:      false
    },
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/thor'),
    assetsPublicPath: 'assets/',
    
  },

  build_release: {

    pathsToClean: ['dist/release'], // 可以把整個 dist/刪除，或是改成只刪除 dist/thor or dist/release
    cleanOptions: {
      root: path.resolve(__dirname, `../`),
      verbose:  true,
      dry:      false
    },
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/release'),
    assetsPublicPath: 'assets/',
  }

}