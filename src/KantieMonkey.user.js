// ==UserScript==
// @name        KantieMonkey
// @namespace   bf.Kantie
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/KantieMonkey.user.js
// @version     2
// @match        https://kantie.org/topics/today
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
    var titles = new Set();
    var list = document.querySelectorAll('a.content > div.title')
    for (var i = 0; i < list.length; i++) {
        var title = list[i].innerText
        if(titles.has(title)) list[i].parentNode.parentNode.parentNode.remove();
        titles.add(title);
    }
    console.log(titles);
}
