// ==UserScript==
// @name       ChinazMonkey
// @namespace  chinaz.com
// @version    1
// @description  站长之家文章阅读简化
// @match      http://www.chinaz.com/start/*.shtml
// @copyright  GNU
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
