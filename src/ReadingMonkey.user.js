// ==UserScript==
// @name       ReadingMonkey
// @namespace  baofeng.reading
// @version    2.4
// @description  文章阅读简化:站长之家,新浪,web开发者,51cto,csdn,博客园
// @match      http://www.chinaz.com/*.shtml
// @match      http://*.sina.com.cn/*.shtml
// @match      http://www.admin10000.com/document/*.html
// @match      http://*.blog.51cto.com/*
// @match      http://blog.csdn.net/*/article/details/*
// @match      http://www.cnblogs.com/*/*.html
// @match      http://news.cnblogs.com/n/*
// @copyright  GNU
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// ==/UserScript==

(function () {

    var url = window.location.href;

    function expand(s) {
        $(s).css('width', '100%').css('padding', 0).css('border', 0).css('margin', 0).css('background-color', '#F5FAFF');
    }

    $("<style type='text/css'> \
p,div{font-size:large !important;\
font-family: Georgia, \"Times New Roman\", \"Microsoft YaHei\", \"微软雅黑\", STXihei, \"华文细黑\", serif !important;}\
body{overflow-x:hidden;}\
</style>").appendTo("head");

    if (url.indexOf('cnblogs') >= 0) {
        console.log('cnblogs begin');

        $('#header,#footer,#sideBar,#blog_news_kb,#wrap,#main_header,#sideright,#guide').remove();
        $('#mainContent').find('.forFlow').css('padding', 0);

        expand('#main_wrapper,#sideleft,#main,#home,#mainContent');

        console.log('cnblogs end');
        return;
    }

    if (url.indexOf('blog.csdn.net') >= 0) {
        console.log('csdn begin');

        $('.csdn-toolbar,#header,#navigator,#side,.notice,#res-relatived,.blog-associat-tag,.tag_list,#pub_footerall').remove();
        $('#content').removeClass('cz-box-670');

        expand('#body,#main');

        console.log('csdn end');
        return;
    }


    if (url.indexOf('chinaz') >= 0) {
        console.log('chinaz begin');

        $('#cz-head,.m-crumb-search,.cz-box-300,#cz-footer,.u-postfooter,.m-relate,.m-leftad,.m-picshow,#pinglun,#m-rightshare,.u-post-textad').remove();
        $('#content').removeClass('cz-box-670');
        $('.m-post').removeClass('m-post');
        $('#fulltext').click();


        expand('.czbox');

        console.log('chinaz end');
        return;
    }


    if (url.indexOf('sina') >= 0) {
        console.log('sina begin');

        $('#navTop,#hdnav,#blkBreadcrumb,.sidebar,.can_right,.wb_rec,.wc14_qr,.guess-view-list,.blkContainerOther,#J_Comment_Form_B,.side-btns-2wm,.navTop,.blkBreadcrumb,.footer,iframe').remove();

        expand('.wrap,.blkContainerSblk,.blkContainer');

        console.log('sina end');
        return;
    }

    if (url.indexOf('admin10000') >= 0) {
        console.log('admin10000 begin');

        $('#miniNav,#header,#nav,#search,#position,#footer,.right,.weixin,.tags,.tip,.relation,.share,.texttip,.ad_336x280,.ad_640x90,iframe').remove();
        expand('.left,#main');

        console.log('admin10000 end');
        return;
    }

    if (url.indexOf('blog.51cto') >= 0) {
        console.log('blog.51cto begin');

        $('#home_top,.headerBox,.blogLeft,.mainNav,.edu-col-b,.relatedArt,#message').remove();
        expand('.blogMain,.blogRight');

        console.log('blog.51cto end');
    }

})();
