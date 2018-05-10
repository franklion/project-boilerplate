'use strict'
const path              = require('path')
const utils             = require('./utils')
const config            = require('../config')
const thorMeta          = require('../page_meta/thor.meta')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    entry: utils.handleEntry(config.PAGES, config.DEVICE), 
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: `assets/js/[name].${utils.hashTime()}.js`,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: { url: false }
                        },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
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
                                ['es2015', { modules: false, loose: false }]
                            ]
                        }
                    }
                ]    
            },  
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                        hash: true
                    }
                }]
            },
        ]
    },
    plugins: [
        ...config.PAGES.map((name) => {
            return new htmlWebpackPlugin({
                filename: `${name}.html`,
                inject: false,    // 關閉注入 webpack打包好的 css & js
                template: path.resolve(__dirname, `../src/pc/pug/pages/${name}.pug`),
                meta: thorMeta.meta,
                scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
                cssPath: `assets/css/${name}.${utils.hashTime()}.css`
            })
    }),
        new extractTextPlugin(`assets/css/[name].${utils.hashTime()}.css`)
    ]
}
