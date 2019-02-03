// ==UserScript==
// @name        KantieMonkey
// @namespace   bf.Kantie
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/KantieMonkey.user.js
// @version     1
// @match        https://kantie.org/topics/today
// ==/UserScript==


(function() {
    'use strict';

    removeHupu()
    document.body.addEventListener('DOMSubtreeModified', function() {
        removeHupu()
    }, false);

})();

function removeHupu() {
    var list = document.querySelectorAll('.icon-hupu')
    for (var i = 0; i < list.length; i++) {
        list[i].parentNode.parentNode.remove();
    }
}
