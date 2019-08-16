### learn webpack summary

1. package.json sideEffects field
package.json file sideEffects for Tree Shaking. sideEffects: ["*.css"] 如果打包遇到任何css文件，不要使用Tree Shaking

2. use loader the order instructions

```javascript
    use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
    执行顺序：从右到左执行
```

3. babel
```javascript
    // 检测浏览器不支持某语法时，会自动注入babel-poryfill
    useBuiltIns: "usage"
```

4. Tree Shaking
Tree Shaking only support ES moudles(import)

5. code spliting one fo two ways
```javascript
    // webpack sync by from
    import _ from 'lodash';
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    // webpack async by @babel/plugin-syntax-dynamic-import
    function getComponent() {
        return import( /* webpackChunkName:"lodash" */ 'lodash').then(_ => {
            // use lodash a method
        });
    }

```

6. webpack analyse
    1. [official-analyze-tool](http://webpack.github.io/analyse/)
    2. [official-recommend-bundle-analyse](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```javascript
    webpack --profile --json > stats.json
```

7. webpack prefetching && webpack preloading
    1. webpackPrefetch: true, 主要chunk加载完成后，网络空闲时，在加载相应模块(提升代码利用率-> console -> command+shift+p -> coverage)

8. webpack shimming(打包时用的垫片)
    1. 用于兼容老项目添加到新项目时，无法更改老项目代码，如添加依赖。因为使用webpack.ProvidePlugin提供自动添加import模块语句。

9.  dev-Server = { historyApiFallback: true, };
    1. 对于单页应用来说，一般只有index.html文件, 根据路由地址变换切换页面内容, 配置项为true, e.g localhost:8080/ccc,
    访问此地址时, dev-server服务器会把找不到的ccc.html文件指向index.html文件返回，such so 执行index.html 会走路由逻辑, 以供正确渲染

10. webapck.DllPlugin && webpack.DllReferencePlugin (performance up)
    1. DllPlugin 从node_modules生成第三方库的文件到本地[dll]文件夹映射关系manifest.json
    2. DllReferencePlugin 根据manifest.json文件解析映射关系
    3. AddAssetHtmlWebpackPlugin 向index.html文件插入js资源
    4. 打包性能提升相关 thread-loader parallel-webpack happypack 多进程打包

11. 打包时建议先执行build:dll,然后执行build||dev:build,因为build:dll可以提升打包速度,详情参考webpack.dll.js file


