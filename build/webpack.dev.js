const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')

const devCofnig =  {
	// mode: development  不会生成dist目录，寸在内存中
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		port: 8080,
		hot: true,
		//overlay: true,
		/**  
		 * 对于单页应用来说，一般只有index.html文件, 根据路由地址变换切换页面内容, 配置项为true, e.g localhost:8080/ccc,
		 * 访问此地址时, dev-server服务器会把找不到的ccc.html文件指向index.html文件返回，such so 执行index.html 会走路由逻辑, 以供正确渲染
		*/
		historyApiFallback: true,
		// hotOnly: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', 
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
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
	}
}

module.exports = merge(commonConfig, devCofnig);