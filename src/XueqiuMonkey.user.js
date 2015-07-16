// ==UserScript==
// @name        XueqiuMonkey
// @namespace   bf
// @description 雪球股票详情页，增加i财富，牛叉诊股，千股千评链接
// @include     http://xueqiu.com/S/*
// @version     1
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

    addLink(ele, 'i财富', 'http://www.icaifu.com/stock/doctora/' + stock + '.shtml')
    addLink(ele, '牛叉诊股', 'http://doctor.10jqka.com.cn/' + stock.substring(2) + '/')
    addLink(ele, '千股千评', 'http://qgqp.shdjt.com/gpdm.asp?gpdm=' + stock.substring(2))

    console.log('xueqiu end')
})()