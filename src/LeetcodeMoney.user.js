// ==UserScript==
// @name        LeetcodeMoney
// @namespace   bf
// @description remove locked item from list
// @include     https://leetcode.com/problemset/algorithms/
// @version     1
// @grant       none
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/LeetcodeMoney.user.js
// ==/UserScript==


(function () {

    console.log('LeetcodeMoney begin')

    document.addEventListener('DOMContentLoaded', function (event) {
        hideLocked()
    });

    function hideLocked() {

        var x = document.querySelectorAll('#problemList i.fa.fa-lock')
        for (i = 0; i < x.length; i++) {
            x[i].parentNode.parentNode.classList.add('hide');
        }
    }

    console.log('LeetcodeMoney end')
})();