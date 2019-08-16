// 该文件为了演示新项目中引入老项目兼容一些模块引入问题(打包此文件时不可能更改老项目代码，如没有引入$)

export default function addDiv() {
    return $('body').append($('div').html('通过webpack.ProvidePlugin引入模块的').css('background', _join(['green'], '')));
}