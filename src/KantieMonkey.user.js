// ==UserScript==
// @name        KantieMonkey
// @namespace   bf.Kantie
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/KantieMonkey.user.js
// @version     3
// @match        https://kantie.org/topics/today*
// ==/UserScript==


(function() {
    'use strict';

    removeHupu()
    removeDuplicate()
    document.body.addEventListener('DOMSubtreeModified', function() {
        removeHupu()
        removeDuplicate()
    }, false);

})();

function removeHupu() {
    var list = document.querySelectorAll('.icon-hupu')
    for (var i = 0; i < list.length; i++) {
        list[i].parentNode.parentNode.remove();
    }
}

function removeDuplicate() {
    console.log('removeDuplicate begin')
    var titles = new Set();
    var list = document.querySelectorAll('.title')
    for (var i = 0; i < list.length; i++) {
        var title = list[i].innerText
        if(
            titles.has(title)
            || title.toLowerCase().includes('gucci')
            || title.includes('痛经')
            || title.includes('神仙水')
          ) list[i].parentNode.parentNode.remove();
        titles.add(title);
    }
}
