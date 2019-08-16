const merge = require('webpack-merge');
// 对css做代码分割 (默认css文件会打包到entry 下指定的js文件中)
const MinxCssExtractPlugin = require('mini-css-extract-plugin');
// 打包时合并css文件 (默认一个css打包出一个文件)
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common.js')

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				MinxCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MinxCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}],
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
		new MinxCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css',
		}),
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
	}
}
module.exports = merge(commonConfig, prodConfig);