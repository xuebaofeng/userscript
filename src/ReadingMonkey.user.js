// ==UserScript==
// @name       ReadingMonkey
// @namespace  baofeng.reading
// @version    4.2
// @description  文章阅读简化:站长之家,新浪,web开发者,51cto,csdn,博客园,qq,infoq,开源中国,网易,伯乐在线,feedly
// @match      http://www.chinaz.com/*.shtml
// @match      http://*.sina.com.cn/*htm*
// @match      http://www.admin10000.com/document/*.html
// @match      http://*.51cto.com/*
// @match      http://blog.csdn.net/*/article/details/*
// @match      http://www.cnblogs.com/*/*.html
// @match      http://news.cnblogs.com/n/*
// @match      http://*.qq.com/*.htm*
// @match      http://www.infoq.com/*
// @match      http://www.oschina.net/*
// @match      http://*.163.com/*.html*
// @match      http://*.jobbole.com/*
// @match      http://feedly.com/*
// @copyright  GNU
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// ==/UserScript==
(function () {
    var url = window.location.href;

    simplify('qq.com',
        '.navWrap,.foot-Article-QQ,#sideBars,.crumbs-tool,#about,.ft,#scrollBtn', '.body-Article-QQ,#Main-Article-QQ,.main');

    simplify('cnblogs.com',
        '#sideBar,#blog_news_kb,#wrap,#main_header,#sideright,#guide,.blogStats,#leftcontent,#mylinks,#right,#mytopmenu',
        '#main_wrapper,#sideleft,#main,#home,#mainContent,.post,#centercontent,#left');

    simplify('blog.csdn.net',
        '.csdn-toolbar,#navigator,#side,.notice,#res-relatived,.blog-associat-tag,.tag_list,#pub_footerall',
        '#content,#body,#main,.main,.details,.post');

    simplify('chinaz.com',
        '#cz-head,.m-crumb-search,.cz-box-300,#cz-footer,.u-postfooter,.m-relate,.m-leftad,.m-picshow,#pinglun,#m-rightshare,.u-post-textad',
        '.czbox,#content,.m-post');

    simplify('sina.com',
        '#navTop,#hdnav,#blkBreadcrumb,.can_right,.wb_rec,.wc14_qr,.guess-view-list,.blkContainerOther,#J_Comment_Form_B,.side-btns-2wm,\
.navTop,.blkBreadcrumb,.nsinatopbar,#sinablogHead,#column_1,#sinablogfooter,.SG_connHead,#blk_nav_1,.topbar',
        '.wrap,.blkContainerSblk,.blkContainer,#column_2,#sinablogbody,.articalContent,.SG_connBody,.blkContainerSblk,.Main');

    simplify('admin10000.com',
        '#miniNav,#search,#position,.right,.weixin,.tags,.tip,.relation,.share,.texttip,.ad_336x280,.ad_640x90',
        '.left,#main');

    simplify('51cto.com',
        '#home_top,.headerBox,.blogLeft,.mainNav,.edu-col-b,.relatedArt,#message,.mb10,.menu,.subweb,.g_13,.tips,.titbg,.reltag,.relart,.cathot,.bor,#ft,.crumb',
        '.blogMain,.blogRight,.g_26,.g_39,.brief ');

    simplify('infoq.com', '#topInfo,.share_this,.article_page_right,.random_links,.bottomContent',
        '#wrapper,#site,#content,.article_page_left');

    simplify('oschina.net',
        '#OSC_NavTop,#OSC_Banner,#OSC_Footer,.NewsRight,.toolbar,.copyright,.RelatedNews,.RelatedThreads,#upprev_box,.translater',
        '#OSC_Screen,.NewsBody,.NewsEntity,.TextContent');

    simplify('163.com',
        '#js_N_nav,.ep-header,.subfoot-wrap,.N-nav-bottom,#epContentRight,.sharecommend-wrap,.ep-keywords,.atleLP,.ep-returnlink,.extra-tag',
        '#js-epContent,#epContentLeft,#endText');

    simplify('jobbole.com',
        '#wp_rp_first',
        '.container,.grid-8');


    simplify('feedly.com', '', '', function () {
        setInterval(function () {
            $('.entryBody,.u100entry').css('max-width', 'none');
        }, 1000);
    });


    function simplify(siteName, removeStr, expandStr, callback) {


        if (url.indexOf(siteName) == -1) return;
        console.log(siteName + ' begin');

        $("<style type='text/css'>\
body{margin:0;border:0;padding-left:20px;padding-right:20px;background-image:none;width:auto;}\
p{font-family:Georgia, \"Times New Roman\", \"Microsoft YaHei\", \"微软雅黑\", STXihei, \"华文细黑\", serif;font-size:large;color:#000000;text-indent:1em;}\
</style>").appendTo("head");

        console.log('style append');


        $('header,nav,footer,iframe,#header,#footer,#sidebar,.sidebar,#breadcrumb,.header,.footer,#nav').remove();
        console.log('common removed');

        setTimeout(function () {
            $('iframe').remove();
        }, 3000);

        if (removeStr) {
            $(removeStr).remove();
            console.log('elements removed');
        }
        if (expandStr) {
            $(expandStr).css('width', '100%')
                .css('padding', 0)
                .css('border', 0)
                .css('margin', 0)
                .css('background-image', 'none')
                .css('background-color', '#F5FAFF')
                .css('max-width', 'none');
            console.log('elements expanded');
        }

        if (callback) {
            callback();
        }

        console.log(siteName + ' end');

    }
})();