'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config')
// const vueLoaderConfig = require('./vue-loader.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const ENV = process.env.NODE_ENV || "development";

console.log("ENV==", ENV);
console.log("process.env.NODE_ENV==", process.env.NODE_ENV);

module.exports = {
  // context: path.resolve(__dirname, '../'),
  mode: process.env.NODE_ENV || 'production',
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".less", ".ts"],
    alias: {
      '@': './src',
      '@pages': `./src/pages`,
    },
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        include: /src/,
        use: ["babel-loader?cacheDirectory=true"]
      },
      {
        test: /\.less$/,
        use: [
          ENV == "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          ENV == "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader', // url-loader 依赖于 file-loader
        options: {
          limit: false,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
      chunkFilename: "css/[id].[contenthash:6].css"
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: config.build.index,
      inject: true,
      // chunks: ['vendor', 'index']
      // hash: true, // 会在打包好的bundle.js后面加上hash串
    }),


    // copy custom static assets
    new CopyWebpackPlugin({ //直接移动静态资源
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
      }]
    }),
  ],
  node: {
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}