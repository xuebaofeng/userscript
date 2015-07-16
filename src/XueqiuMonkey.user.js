// ==UserScript==
// @name        XueqiuMonkey
// @namespace   bf
// @description 雪球股票详情页，一键打开相关页面： i财富，牛叉诊股，千股千评，股吧
// @include     http://xueqiu.com/S/*
// @version     2
// @grant       none
// @copyright  GNU
// @run-at      document-end
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/XueqiuMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/XueqiuMonkey.user.js
// ==/UserScript==

(function () {

    console.log('xueqiu begin')

    function addLink(ele, name, href) {

        var a = document.createElement("a")
        var t = document.createTextNode(name)
        a.appendChild(t)
        a.href = href
        console.log(a)
        ele.appendChild(a)
        ele.appendChild(document.createElement("br"))
    }


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
        window.open('http://www.icaifu.com/stock/doctora/' + stock + '.shtml')
        window.open('http://qgqp.shdjt.com/gpdm.asp?gpdm=' + stock.substring(2))
        window.open('http://guba.eastmoney.com/list,' + stock.substring(2) + '.html')
    }
    ele.appendChild(a)


    console.log('xueqiu end')
})()