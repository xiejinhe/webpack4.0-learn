const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const makePlugins = () => {
	const plugins = [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		// 每次清除dist 目录
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		// 当模块中有使用某第三方模块时，而并没有引入该模块。兼容此问题可以使用该插件支持自动添加import语句引入
		new webpack.ProvidePlugin({
			$: 'jquery',
			_join: ['lodash', 'join'],
		}),
	];

	/**
 	* @description 分析import模块，
	*/
	const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
	files.forEach(file => {
		if(/.*\.dll.js/.test(file)) {
			// 向页面插入js资源
			plugins.push(new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file),
			}))
		}
		if(/.*\.manifest.json/.test(file)) {
			// 对manifest映射文件做分析
			plugins.push(new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file),
			}))
		}
	});
	return plugins;
};

const configs = {
    entry: {
		main: './src/index.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
		}
	},
    module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: ['babel-loader',/*  {
				// 不推荐使用eslint-loader 推荐提交代码时校验，以免减缓打包速度
				loader: 'eslint-loader',
				// 自动修复非常浅显的问题
				options: {
					fix: true,
				},
			} */],
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
    },
	// code spliting
	optimization: {
		// webpack用的映射文件
		runtimeChunk: {
			name: 'runtime',
		},
		// 开启tree shaking
		usedExports: true,
		splitChunks: {
			// 同步,异步代码都作code spliting(chunks默认值async，异步chunks可以提升首屏性能加载速度，同步chunk只能二次缓存利用，webpack推荐async优化)
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			// e.g: 引入lodash库，dist目录中有n个chunk，其中0个用到了lodash库，那么就不对lodash code spliting，反之会对lodash code spliting
			minChunks: 1,
			// 最大异步请求数，如果在家过多chunks，可能导致http消耗
			maxAsyncRequests: 5,
			// 首屏加载最大初始请求数
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			// priority 会执行优先级高的配置项
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors',
					// filename: 'vendors.js',
				},
				default: {
					minChunks: 2,
					priority: -20,
					// 已经打包过的chunk，就不再打包 e.g: (b modules 在首屏有引用, 稍后 a modules 依赖 b modules， 只会打包一次b modules)
					reuseExistingChunk: true,
					filename: 'common.js',
				}
			}
		},
	},
    output: {
		path: path.resolve(__dirname, '../dist')
	}
};

configs.plugins = makePlugins();

module.exports = configs;