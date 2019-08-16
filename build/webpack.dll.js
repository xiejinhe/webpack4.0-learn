const path = require('path');
const webpack = require('webpack');

/**
 * @description 
 * 1. node_modules 第三方库放到拿到dll文件，提高打包速度
 * 2. 把第三方库放到dll文件夹，并通过DllPlguin创建映射关系，方便DllReferencePlugin分析使用
 */
module.exports = {
    mode: 'production',
    entry: {
        vendors: ['lodash'],
        react: ['react', 'react-dom'],
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    },
    plugins: [
        // 生成库文件和manifest映射文件
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
};