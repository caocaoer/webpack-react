import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import es3ifyPlugin from 'es3ify-webpack-plugin';
const STATIC_PATH = 'static';

export default {
    entry: {
        main: ['babel-polyfill', './src/index.jsx']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js' 
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=10000'
            },
            { test: /\.(js|jsx)$/, exclude: /(node_modules)/, loader: 'babel-loader', include: path.join(__dirname, 'src')},
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=10000'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader']
            }
        ]
    },
    plugins: [
        new es3ifyPlugin(),
        new CopyWebpackPlugin([{
            context: './src',
            from: 'plugins',
            to: `${STATIC_PATH}/plugins`
        }]),        
        new CleanWebpackPlugin(['build']),                  // 清除编译目录
        new HtmlWebpackPlugin({                             // 主页面入口index.html
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};