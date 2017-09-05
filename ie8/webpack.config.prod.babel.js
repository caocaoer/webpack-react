import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

export default webpackMerge(baseConfig, {
    module: {
        rules: [{
        /**
         * eslint代码规范校验
         */
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc.prod.json'
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({               // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({    // 压缩混淆js文件
            sourceMap: true,
            comments: false
        })
    ]
});
