let webpack = require('webpack');
let merge = require('webpack-merge');
let cfg = require('./webpack.common');
let path = require('path');
let __fix_dirname = __dirname.replace('app.asar', 'app.asar.unpacked');
module.exports = merge(cfg,{
    entry: {
        //主文件
        index : [
            'webpack/hot/dev-server',
            // 'webpack-hot-middleware/client?reload=true',
            path.join(__fix_dirname, 'src/index.jsx')
        ]
    },
    output: {
        path: path.join(__fix_dirname, 'dist'),
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
    mode: 'development',
    devtool: 'eval-source-map',
});