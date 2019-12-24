/**
 * Created by CLAKE on 2016/8/9.
 */

module.exports = {
    //页面入口文件配置
    mode: 'production',
    performance: {
        hints: false
    },
    module: {
        rules: [
            { test: /\.woff[2]?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  use: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  use: "file-loader" },
            { test: /\.svg$/,  use: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.jsx$/,
                use: {loader:'babel-loader',query:{
                    presets:["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-syntax-dynamic-import"
                    ]
                }},
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {loader:'babel-loader',query:{
                    presets:["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-syntax-dynamic-import"
                    ]
                }},
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'url-loader?limit=10000&name=img/[hash:8].[name].[ext]'
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: [ '.js', '.json', '.less', '.jsx'],
        // modulesDirectories: [path.resolve(__dirname, 'node_modules')]
    },
    node: {
        fs: 'empty'
    },
    externals: {
        "jquery": "jQuery",
        "react": "React",
        "react-dom": "ReactDOM",
        "zepto": "Zepto",
        "marked":"Marked",
        "moment":"moment"
    }
};