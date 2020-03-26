let webpack = require('webpack');
let merge = require('webpack-merge');
let cfg = require('./webpack.common');
let path = require('path');
let __fix_dirname = __dirname.replace('app.asar', 'app.asar.unpacked');
let __fix_babel = path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app.asar', 'node_modules');
const {remote} = require('electron');
let debug = remote.getGlobal('debug');

module.exports = merge(cfg,{
    resolveLoader:{
        modules: [
            'node_modules',
            path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app', 'node_modules'),
            path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app.asar', 'node_modules'),
            path.resolve('node_modules'),
            path.resolve('../node_modules')
        ]
    },
    resolve:{
        modules: [
            'node_modules',
            path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app', 'node_modules'),
            path.resolve(__dirname, '..', '..', '..', '..', 'resources', 'app.asar', 'node_modules'),
            path.resolve('node_modules'),
            path.resolve('../node_modules')
        ]
    },
    entry: {
        //主文件
        index : [
            'webpack/hot/dev-server',
            // 'webpack-hot-middleware/client?reload=true',
            path.join(__fix_dirname, 'src/app.js')
            // 'src/app.js'
        ]
    },
    output: {
        path: path.join(__fix_dirname, 'dist'),
        // path: 'dist',
        filename: '[name].js',
        chunkFilename:`./manage/chunk/[name].[chunkhash:8].js`,
    },
    // devServer: {
    //     contentBase: path.join(__dirname, './dist'),
    //     compress: true,
    //     port: 9000
    // },
    //插件项
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.jsx$/,
                use: {loader:'babel-loader',options:{
                        cwd:debug?'':__fix_babel,
                        presets:[
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-export-default-from",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-proposal-optional-chaining",
                            "@babel/plugin-proposal-nullish-coalescing-operator"
                        ]
                    }},
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {loader:'babel-loader',options:{
                        cwd:debug?'':__fix_babel,
                        presets:[
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-export-default-from",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-proposal-optional-chaining",
                            "@babel/plugin-proposal-nullish-coalescing-operator"
                        ]
                    }},
                exclude: /node_modules/
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         minSize: 50000,
    //         cacheGroups: {
    //             commons: {
    //                 name: "common",
    //                 chunks: "all",
    //                 minChunks: 2
    //             },
    //             styles: {
    //                 name: 'style',
    //                 test: /\.less$/,
    //                 chunks: 'all'
    //             }
    //         }
    //     },
    //     minimize:false,
    // },
    // target:'node',
    mode: 'development',
    devtool: 'eval-source-map',
});