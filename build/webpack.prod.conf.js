'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const {
  merge
} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin') 已推荐使用mini-css-extract-plugin代替
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //A Webpack plugin to optimize \ minimize CSS assets.
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //This plugin uses uglify-js to minify your JavaScript.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');


console.log("config.build.assetsRoot==", config.build.assetsRoot);
console.log("utils.assetsPath==", utils.assetsPath("test/"));
const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    publicPath: './',
    path: config.build.assetsRoot, //path.resolve(__dirname, '../dist')
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin() //不传参默认清除output.path
  ],
  optimization: { // 提取公共代码
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: 'initial',
          name: 'utils', // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  },

})


if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig