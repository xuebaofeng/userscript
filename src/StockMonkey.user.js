// ==UserScript==
// @name        StockMonkey
// @namespace   bf
// @description 给各个股票网站增加链接打开跳转页面： i财富，牛叉诊股，爱股说，雪球
// @match     http://xueqiu.com/S/*
// @match     http://doctor.10jqka.com.cn/*
// @match     http://www.igushuo.com/company_main.html?companycode=*
// @version     5
// @grant       none
// @copyright  GNU
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/StockMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/StockMonkey.user.js
// ==/UserScript==

console.log('stock monkey begin')

var stock = buildStock()

var shortStock = stock
if (stock.length == 8)shortStock = stock.substring(2)
else if (stock.length == 6) stock = createLongStock(stock)
else console.error(stock);

console.log('long:', stock)
console.log('short:', shortStock)

var urls = [
  {name: '牛叉诊股', url: 'http://doctor.10jqka.com.cn/' + shortStock},
  {name: '雪球', url: 'http://xueqiu.com/S/' + stock + "/MRCWZB"},
  {name: '爱股说', url: 'http://www.igushuo.com/company_main.html?companycode=' + createIgushuoStock(shortStock)}
]

addStyle();

var eleUl = document.createElement('ul')
eleUl.id = "stock_links"
document.querySelector('body').appendChild(eleUl)

for (var i = 0; i < urls.length; i++) {

  var a = document.createElement('a')
  a.appendChild(document.createTextNode(urls[i].name))
  a.href = urls[i].url
  var li = document.createElement('li')
  li.appendChild(a)
  eleUl.appendChild(li)
}

function buildStock() {
  var url = document.location.href
  var ua = url.split('/')
  console.log(ua)
  if (url.indexOf('xueqiu') >= 0)
    return ua[4]

  if (url.indexOf('10jqka') >= 0)
    return ua[3]

  if (url.indexOf('igushuo') >= 0)
    return ua[3].split('=')[1].split('.')[0]
}

function createLongStock(stock) {
  if (stock.charAt(0) == '6') return 'sh' + stock
  return 'sz' + stock
}

function createIgushuoStock(stock) {
  if (stock.charAt(0) == '6') return stock + '.sh'
  return stock + '.sz';
}

function addStyle() {
  var css = '#stock_links { position:fixed; top:100px; right:0; background-color:white; z-index:9999999 }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

console.log('stock money end')

