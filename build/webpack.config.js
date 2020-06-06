const path = require('path');
const webpack = require('webpack');


module.exports = {

    mode: 'development',
    entry:{
        main: './src/index.js',

    },
    output:{
        publicPath:'/',
        path: path.resolve(__dirname,'../dist/'),
        filename: 'js/[name].[hash:6].js',
        chunkFilename: 'js/[name].[hash:6].js'
    }

}