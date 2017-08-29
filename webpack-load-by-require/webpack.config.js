var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index.js'],
        vendor: ['react']
    },
    output: {
        filename: '[name].js', 
        path: path.join(__dirname, 'build'),
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            use: ['babel-loader']  
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity,
            filename: 'vendor.js'
        }),
        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['vendor', 'main']
        })
    ],   
    devServer: {             
        contentBase: path.join(__dirname, 'build'), //本地服务器所加载的页面所在的目录
    }
}