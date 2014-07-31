// ==UserScript==
// @name       ReadingMonkey
// @namespace  baofeng.reading
// @version    2.8
// @description  文章阅读简化:站长之家,新浪,web开发者,51cto,csdn,博客园,qq
// @match      http://www.chinaz.com/*.shtml
// @match      http://*.sina.com.cn/*.shtml
// @match      http://www.admin10000.com/document/*.html
// @match      http://*.blog.51cto.com/*
// @match      http://blog.csdn.net/*/article/details/*
// @match      http://www.cnblogs.com/*/*.html
// @match      http://news.cnblogs.com/n/*
// @match      http://*.qq.com/*.htm*
// @copyright  GNU
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// ==/UserScript==

(function () {

    var url = window.location.href;

    simplify('qq.com', '.navWrap,.foot-Article-QQ,#sideBars,.crumbs-tool,#about,.ft,#scrollBtn',
        '.body-Article-QQ,#Main-Article-QQ,.main');

    simplify('cnblogs.com', '#header,#footer,#sideBar,#blog_news_kb,#wrap,#main_header,#sideright,#guide,.blogStats,#leftcontent,#mylinks,#right',
        '#main_wrapper,#sideleft,#main,#home,#mainContent,.post', function () {
            $('#left').css('left', 0);
        });

    simplify('blog.csdn.net', '.csdn-toolbar,#header,#navigator,#side,.notice,#res-relatived,.blog-associat-tag,.tag_list,#pub_footerall',
        '#content,#body,#main');

    simplify('chinaz.com', '#cz-head,.m-crumb-search,.cz-box-300,#cz-footer,.u-postfooter,.m-relate,.m-leftad,.m-picshow,#pinglun,#m-rightshare,.u-post-textad',
        '.czbox,#content,.m-post');

    simplify('sina.com', '#navTop,#hdnav,#blkBreadcrumb,.sidebar,.can_right,.wb_rec,.wc14_qr,.guess-view-list,.blkContainerOther,#J_Comment_Form_B,.side-btns-2wm,.navTop,.blkBreadcrumb,.footer,iframe',
        '.wrap,.blkContainerSblk,.blkContainer');

    simplify('admin10000.com', '#miniNav,#header,#nav,#search,#position,#footer,.right,.weixin,.tags,.tip,.relation,.share,.texttip,.ad_336x280,.ad_640x90,iframe',
        '.left,#main');

    simplify('blog.51cto.com', '#home_top,.headerBox,.blogLeft,.mainNav,.edu-col-b,.relatedArt,#message',
        '.blogMain,.blogRight');


    function expand(s) {
        $(s).css('width', 'auto').css('padding', 10).css('border', 0).css('margin', 0).css('background-color', '#F5FAFF');
    }

    function simplify(siteName, removeStr, expandStr, callback) {

        $('p').css('font-size', 'large').css('font-family', 'Georgia, \"Times New Roman\", \"Microsoft YaHei\", \"微软雅黑\", STXihei, \"华文细黑\", serif');

        if (url.indexOf(siteName) >= 0) {
            console.log(siteName + ' begin');

            $(removeStr).remove();

            expand(expandStr);

            callback();

            console.log(siteName + ' end');
        }
    }
})();
