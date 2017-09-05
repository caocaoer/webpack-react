import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const env = process.env;
const LOCAL_HOST = env.npm_package_server_local_host;
const LOCAL_PORT = env.npm_package_server_local_port;
const MOCK_HOST = env.npm_package_server_mock_host;
const MOCK_PORT = env.npm_package_server_mock_port;
const API_HOST = env.npm_package_server_api_host;
const API_PORT = env.npm_package_server_api_port;

export default webpackMerge(baseConfig, {
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    // module: {
        // loaders: [
        //     { test: /\.css$/, loader: 'style-loader!css-loader' },
        //     { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel', include: path.join(__dirname, 'app')},
        //     { test: /\.js?$/, exclude: /(node_modules|bower_components)/, loader: 'babel', include: path.join(__dirname, 'app')},
        //     { test: /\.jpg$/, loader: 'file-loader' },
        //     { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        // ]
        // loaders: [
        //     {
        //         test: /\.(js|jsx)$/,
        //         enforce: 'pre',
        //         include: path.join(__dirname, 'src'),
        //         use: [{
        //             loader: 'eslint-loader',
        //             options: {
        //                 configFile: '.eslintrc.json'
        //             }
        //         }]
        //     }
        // ]
        // rules: [{
        // /**
        //  * eslint代码规范校验
        //  */
        //     test: /\.(js|jsx)$/,
        //     enforce: 'pre',
        //     include: path.join(__dirname, 'src'),
        //     use: [{
        //         loader: 'eslint-loader',
        //         options: {
        //             configFile: '.eslintrc.json'
        //         }
        //     }]
        // }]
    // },
    plugins: [
        // 出错不终止插件
        // new webpack.NoEmitOnErrorsPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true,
            __MOCK__: env.NODE_ENV === 'mock'
        })
    ],
    devServer: {
        host: LOCAL_HOST,
        port: LOCAL_PORT,
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'build')
    }
});
