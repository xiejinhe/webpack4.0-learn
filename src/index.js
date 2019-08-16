/**  1.webpack 基础功能描述 */

// Tree Shaking 只支持 ES Module
// import _ from 'lodash';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Home from './components/home';
import List from './components/list';
import addDiv from './oldProject.js';
import { add } from './math.js';

add(1, 6);
// 演示新项目中引入老项目兼容一些模块引入问题
addDiv();
import './style.css';
import './main.css';
//console.log(_.join(['a', 'b', 'c'], '****'));  

function getComponent() {
    // dynamic import
    return import(/* webpackChunkName:"lodash" */ 'lodash').then(_ => {
        var ele = document.createElement('div');
        ele.innerHTML = _.join(['hello', 'webapck', 'lazy', 'load'], '-');
        return ele;
    })
};

document.addEventListener('click', () => {
    getComponent().then(ele => {
        document.body.appendChild(ele);
    });
    // 应用场景：首屏渲染先加载主文件，首屏没有用到的业务文件如点击登录弹窗，可以在主文件加载完成后在自动加载
    import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
        func();
    });
});

/**  2.webpack 单页面路由功能描述 */

class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/list" component={List}></Route>
                </div>
            </BrowserRouter>
        )
    }
};

ReactDom.render(<App/>, document.getElementById('react-root'));




