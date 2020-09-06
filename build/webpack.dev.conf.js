'use strict'
const utils = require('./utils');
const webpack = require('webpack');
const config = require('./config');
const {
  merge
} = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder'); //A simple tool to find an open port or domain socket on the current machine
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


console.log("config.dev.assetsPublicPath==", config.dev.assetsPublicPath);
const devWebpackConfig = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    contentBase: "./dist",
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     filename: 'index.html',
  //     // chunks: ['vendor', 'index'],
  //     inject: true, //将打包后的资源注入HTML文件中
  //     // hash: true, // 会在打包好的bundle.js后面加上hash串

  //   }),
  //   // copy custom static assets
  //   /* new CopyWebpackPlugin([{
  //     from: path.resolve(__dirname, '../static'),
  //     to: config.dev.assetsSubDirectory,
  //     ignore: ['.*']
  //   }]),  旧版本的写法*/
  //   new CopyWebpackPlugin({ //直接移动静态资源
  //     patterns: [{
  //       from: path.resolve(__dirname, '../static'),
  //       to: config.dev.assetsSubDirectory,

  //     }]
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: "css/[name].[contenthash:6].css",
  //     chunkFilename: "css/[id].[contenthash:6].css"
  //   }),
  // 
]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})