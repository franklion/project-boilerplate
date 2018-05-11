'use strict'
const path              = require('path')
const webpack           = require('webpack')
const utils             = require('./utils')
const config            = require('../config')
const thorMeta          = require('../page_meta/thor.meta')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const imageminPlugin    = require('imagemin-webpack-plugin').default
const imageminMozjpeg   = require('imagemin-mozjpeg')


module.exports = {
    entry: Object.assign(utils.handleEntry(config.PAGES, config.DEVICE), 
    {
        vendors: ['jquery'],
        utils: ['./src/pc/js/utils/banner.js']
    }),
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
                vendorsPath: `assets/js/vendors.${utils.hashTime()}.js`,
                utilsPath: `assets/js/utils.${utils.hashTime()}.js`,
                scriptPath: `assets/js/${name}.${utils.hashTime()}.js`,
                cssPath: `assets/css/${name}.${utils.hashTime()}.css`
            })
        }),
        new extractTextPlugin(`assets/css/[name].${utils.hashTime()}.css`),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            isMobile: 'ismobilejs'
        }),

        // 參考 https://juejin.im/post/5a1127666fb9a045023b3a63
        // doc https://doc.webpack-china.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: `assets/js/vendors.${utils.hashTime()}.js`,
            minChunks: Infinity,
        }),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'utils',
            filename: `assets/js/utils.${utils.hashTime()}.js`,
            minChunks: function(module) {
                return (
                    module.resource && /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
                )
            },
            chunks: config.PAGES
        }),
        
        new copyWebpackPlugin([
            {
              from: path.resolve(__dirname, `../src/${config.DEVICE}/images`),
              to: config.build.assetsRoot + '/' + config.build.assetsPublicPath + 'images',
              ignore: ['.*']
            }
        ]),
        new imageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 8,
            },
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
}
