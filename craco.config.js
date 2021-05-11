const path = require('path');
const CracoLessPlugin = require('craco-less');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir);
const globalLess = require('./src/assets/css/global.js')

module.exports = {
    webpack: {
        alias: {
            '@': resolve('src')
        },
        externals: {
            TMap: 'TMap',
        },
        plugins: [
            new SimpleProgressWebpackPlugin(),
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // 修改主题色 
                        modifyVars: globalLess,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }]
        ]
    }
}
