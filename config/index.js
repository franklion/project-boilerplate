'use strict'

const path = require('path')
const PAGES = ['first', 'second', 'third']
module.exports = { 

  dev: {
    PAGES,
    assetsPublicPath: 'assets/',


    
    // Various Dev Server settings
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080,        // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
  },

  build: {
    PAGES,
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/thor'),
    assetsPublicPath: 'assets/',
    
  },

  build_release: {
    PAGES,
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/release'),
    assetsPublicPath: 'assets/',
  }

}