const {remote} = require('electron');
const { BrowserWindow } = remote;

let preWindow;
let devServer;
let Preview = {
    start:()=>{
        console.log(setImmediate);
        // import webpack from 'webpack';
        let webpack = require('webpack');
        let webpackDevServer = require('webpack-dev-server');
        let webpackDevConfig = require('./exp/webpack.dev');
        console.log(webpackDevConfig);
        let compiler = webpack(webpackDevConfig);
        devServer = new webpackDevServer(compiler,{
            // webpack-dev-server options
            //
            contentBase: webpackDevConfig.output.path,
            // // or: contentBase: "http://localhost/",
            //
            hot: true,
            // // Enable special support for Hot Module Replacement
            // // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
            // // Use "webpack/hot/dev-server" as additional module in your entry point
            // // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
            //
            // // Set this as true if you want to access dev server from arbitrary url.
            // // This is handy if you are using a html5 router.
            historyApiFallback: true,
            //
            // // Set this if you want to enable gzip compression for assets
            compress: true,
            //
            // // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
            // // Use "*" to proxy all paths to the specified server.
            // // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
            // // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
            // // proxy: {
            // //     "*": "http://localhost:9090"
            // // },
            //
            // // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
            // staticOptions: {
            // },
            //
            // // webpack-dev-middleware options
            // quiet: false,
            // noInfo: false,
            // lazy: true,
            // filename: "index.js",
            // watchOptions: {
            //     aggregateTimeout: 300,
            //     poll: 1000
            // },
            publicPath: '/',
            inline: true,
            // // headers: { "X-Custom-Header": "yes" },
            stats: { colors: true }
        });
        devServer.listen(8033);
    },
    createBrowseWindow:()=>{
        preWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            title: 'Preview window',
            webPreferences:{
                devTools:true,
                nodeIntegration:false,
                allowRunningInsecureContent:true
            }
        });

        // and load the index.html of the app.
        // mainWindow.loadFile('index.html')
        // mainWindow.loadURL(`file://${__dirname}/index.html`);
        preWindow.loadURL("http://localhost:8033/");
        //   mainWindow.loadURL("https://lease.tubaozhang.com");
        // Open the DevTools.
        preWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        preWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            preWindow = null;
            devServer.close();
            devServer = null;
        });
        return preWindow;
    }
};

module.exports = Preview;