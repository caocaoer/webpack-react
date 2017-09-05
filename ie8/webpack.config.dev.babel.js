import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const env = process.env;
const LOCAL_HOST = env.npm_package_server_local_host;
const LOCAL_PORT = env.npm_package_server_local_port;

export default webpackMerge(baseConfig, {
    devtool: 'source-map',
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
