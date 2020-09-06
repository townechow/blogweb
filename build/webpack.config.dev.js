const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || "development";

console.log("打包环境===", ENV);

module.exports = {
    mode: ENV == "production" || ENV == undefined ? "production" : "development",
    devtool: ENV == "production" ? "none" : "source-map",
    entry: {
        index: './src/index.js',

    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist/'),
        filename: 'js/[name].[hash:6].js',
        chunkFilename: 'js/[name].[hash:6].js'
    },
    resolve: {
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
                use: ["url-loader"],
                include: /src/,
                // options: {
                //     limit: 8192,
                //     name: "[name].[hash:6].[ext]",
                //     outputPath: "static/"
                // }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: ["url-loader"],
                include: /src/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: ["url-loader"],
                include: /src/
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'index']
            // hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:6].css",
            chunkFilename: "chunk/[id].[contenthash:6].css"
        }),
        // new CleanWebpackPlugin() //不传参默认清除output.path
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
    devServer: {
        contentBase: "./dist",
        port: 8092,
        hot: true,
        compress: true,
        host: "localhost",
        disableHostCheck: true,
        historyApiFallback: true,
        overlay: {
            errors: true,
            warnings: false
        }
    },

}