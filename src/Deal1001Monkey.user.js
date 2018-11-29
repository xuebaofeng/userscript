// ==UserScript==
// @name        Deal1001Monkey
// @namespace   bf.Deal1001
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/Deal1001Monkey.user.js
// @version     20
// @match        https://www.deal1001.com/ui/
// ==/UserScript==


console.log('deal1001 start')

document.addEventListener("DOMNodeInserted", function (event) {

    var elem=event.target
    var productInfos=elem.querySelectorAll('.product-info')
    if(productInfos.length!=1) return

    var info=productInfos[0].innerHTML

    var hide = false;
    if(!info.includes('免评')) {hide=true}

    var title=elem.querySelectorAll('.title')[0].innerHTML
        if(title.includes('蜡烛')
       || title.includes('体温计')
       || title.includes('乳贴')
       || title.includes('耳机')
       || title.includes('宠物')
       || title.includes('天线')) {
        hide=true
    }
    if(hide) elem.style.display = 'none'
}, false);

console.log('deal1001 end')
