// ==UserScript==
// @name       ChinazMonkey
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.chinaz.com/start/*.shtml
// @copyright  Baofeng
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// ==/UserScript==

console.log('chinaz begin');

$('#cz-head,.m-crumb-search,.cz-box-300,#cz-footer').remove();

$('#content').removeClass('cz-box-670');
$('.m-post').removeClass('m-post').css('background','#F5FAFF');
$('#fulltext').click();

console.log('chinaz end');
