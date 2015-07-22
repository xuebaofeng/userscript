// ==UserScript==
// @name        XueqiuMonkey
// @namespace   bf
// @description 雪球股票详情页，一键打开相关页面： i财富，牛叉诊股，千股千评，股吧
// @include     http://xueqiu.com/S/*
// @version     4
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


    var urls = [
        {name: '牛叉诊股', url: 'http://doctor.10jqka.com.cn/' + stock.substring(2) + '/'},
        {name: 'i财富', url: 'http://www.icaifu.com/stock/doctora/' + stock + '.shtml'},
        {name: '千股千评', url: 'http://qgqp.shdjt.com/gpdm.asp?gpdm=' + stock.substring(2)},
        {name: '股吧', url: 'http://guba.eastmoney.com/list,' + stock.substring(2) + '.html'}
    ]

    for (var i = 0; i < urls.length; i++) {

        var a = document.createElement('a')
        a.appendChild(document.createTextNode(urls[i].name))
        a.href = urls[i].url
        ele.appendChild(a)
        ele.appendChild(document.createTextNode(' '))
    }

    console.log('xueqiu end')
})()
