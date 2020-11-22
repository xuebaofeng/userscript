// ==UserScript==
// @name        remove add block's block 1point3acres.com
// @namespace   Violentmonkey Scripts
// @match       https://www.1point3acres.com/bbs/forum*.html
// @match       https://www.1point3acres.com/bbs/thread-*.html
// @grant       none
// @version     1.0
// @author      -
// @description 11/22/2020, 12:19:03 PM
// ==/UserScript==

console.log('1point3acres start')
document.addEventListener("DOMNodeInserted", function (event) {
  document.querySelector('.fc-ab-root').remove()
  document.getElementById('nv_forum').style.removeProperty('overflow');
}, false);
console.log('1point3acres end')
