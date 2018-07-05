const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const STATIC_PATH = 'static';

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: `${STATIC_PATH}/js/[chunkhash].[name].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(s*)css$/,
                exclude: /node_modules/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }, 'sass-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};
