import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const STATIC_PATH = 'static';

export default {
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
        host: 'localhost',
        port: '8081'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};
