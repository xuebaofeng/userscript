// ==UserScript==
// @name       ReadingMonkey
// @namespace  baofeng.im
// @version    1.1
// @description  文章阅读简化
// @match      http://www.chinaz.com/*.shtml
// @match      http://*.sina.com.cn/*.shtml
// @copyright  GNU
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/ChinazMonkey.user.js
// ==/UserScript==

var url = window.location.href;
if(url.indexOf('chinaz')>=0){
console.log('chinaz begin');

$('#cz-head,.m-crumb-search,.cz-box-300,#cz-footer,.u-postfooter,.m-relate,.m-leftad,.m-picshow,#pinglun').remove();
$('#content').removeClass('cz-box-670');
$('.m-post').removeClass('m-post').css('background','#F5FAFF');
$('#fulltext').click();

console.log('chinaz end');
return;
}


if(url.indexOf('sina')>=0){
console.log('sina begin');

$('#navTop,#hdnav,#blkBreadcrumb,.sidebar,.can_right,.wb_rec,.wc14_qr,.guess-view-list,.blkContainerOther,#J_Comment_Form_B').remove();

$('.blkContainerSblk').removeClass('blkContainerSblk');
$('.blkContainer').removeClass('blkContainer');
     
console.log('sina end');
return;
}


