// ==UserScript==
// @name       ReadingMonkey
// @namespace  baofeng.im
// @version    1.3
// @description  文章阅读简化:chinaz,sina,admin1000,51cto
// @match      http://www.chinaz.com/*.shtml
// @match      http://*.sina.com.cn/*.shtml
// @match      http://www.admin10000.com/document/*.html
// @match      http://*.blog.51cto.com/*
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

$('.czbox').css('width','100%');

console.log('chinaz end');
return;
}


if(url.indexOf('sina')>=0){
console.log('sina begin');

$('#navTop,#hdnav,#blkBreadcrumb,.sidebar,.can_right,.wb_rec,.wc14_qr,.guess-view-list,.blkContainerOther,#J_Comment_Form_B,.side-btns-2wm').remove();

$('.blkContainerSblk').removeClass('blkContainerSblk');
$('.blkContainer').removeClass('blkContainer');

$('.wrap').css('width','100%').css('background','#F5FAFF');

console.log('sina end');
return;
}

if(url.indexOf('admin10000')>=0){
console.log('admin10000 begin');

$('#miniNav,#header,#nav,#search,#position,#footer,.right,.weixin,.tags,.tip,.relation,.share,.texttip').remove();

$('.left,#main').css('width','100%').css('background','#F5FAFF');

console.log('admin10000 end');
return;
}

if(url.indexOf('blog.51cto')>=0){
console.log('blog.51cto begin');

$('#home_top,.headerBox,.blogLeft,.mainNav,.edu-col-b,.relatedArt').remove();

$('.blogMain,.blogRight').css('width','100%').css('background','#F5FAFF');

console.log('blog.51cto end');
return;
}


