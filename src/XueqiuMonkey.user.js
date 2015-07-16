// ==UserScript==
// @name        XueqiuMonkey
// @namespace   bf
// @description 雪球股票详情页，一键打开相关页面： i财富，牛叉诊股，千股千评，股吧
// @include     http://xueqiu.com/S/*
// @version     3
// @grant       none
// @copyright  GNU
// @run-at      document-end
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/XueqiuMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/XueqiuMonkey.user.js
// ==/UserScript==

(function () {

    console.log('xueqiu begin')

    function buildStock() {
        var url = document.location.href
        var ua = url.split('/')
        console.log(ua)
        return ua[4]
    }

    var stock = buildStock()
    var ele = document.querySelector('div.stockTitle')

    var a = document.createElement('a')
    var t = document.createTextNode('油猴数据')
    a.appendChild(t)
    a.onclick = function () {
        var urls=[
            'http://www.icaifu.com/stock/doctora/' + stock + '.shtml',
                  'http://qgqp.shdjt.com/gpdm.asp?gpdm=' + stock.substring(2),
                  'http://guba.eastmoney.com/list,' + stock.substring(2) + '.html',
                  'http://doctor.10jqka.com.cn/' + stock.substring(2) + '/'
                 ]
        for(var i=0;i<urls.length;i++){
            window.open(urls[i],urls[i])
        }
    }
    ele.appendChild(a)

    console.log('xueqiu end')
})()
