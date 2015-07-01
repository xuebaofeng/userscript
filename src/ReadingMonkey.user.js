// ==UserScript==
// @name       ReadingMonkey
// @namespace  baofeng.reading
// @version    15
// @description  文章阅读简化:站长之家,新浪,web开发者,51cto,csdn,博客园,qq,infoq,开源中国,网易,
//伯乐在线,feedly,炼数成金, dataguru.cn, linuxeden,managershare,meijutt,kanmeiju,btmeiju
// @match      http://www.chinaz.com/*.shtml
// @match      http://sports.sina.com.cn/*htm*
// @match      http://www.admin10000.com/document/*.html
// @match      http://*.51cto.com/*
// @match      http://*.csdn.net/*
// @match      http://www.cnblogs.com/*/*.html
// @match      http://news.cnblogs.com/n/*
// @match      http://*.qq.com/*.htm*
// @match      http://www.infoq.com/*
// @match      http://*.oschina.net/*
// @match      http://*.163.com/*.html*
// @match      http://*.jobbole.com/*
// @match      http://feedly.com/*
// @match      https://feedly.com/*
// @match      http://www.dataguru.cn/*
// @match      http://www.ibm.com/developerworks/*.html
// @match      http://www.linuxeden.com/html/*
// @match      http://www.managershare.com/post/*
// @match      http://www.meijutt.com/content/meiju*.html*
// @match      http://kanmeiju.net/detail/*.html
// @match      http://www.btmeiju.com/ustv/*.html
// @copyright  GNU
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/ReadingMonkey.user.js
// ==/UserScript==
(function () {
    var url = window.location.href;

    if (url.indexOf('meijutt') > 0) {
        $('.ckall p a').attr('onclick', '').on('click', function () {
            var downloadLins = '<br><br>';

            $('.downurl li div.adds input:checked').each(function () {
                downloadLins += $(this).attr('value') + '<br>';
            });

            downloadLins += '<br><br>';

            $(this).parent().append(downloadLins);
        });
    }

    if (url.indexOf('kanmeiju.net') > 0) {

        var downloadLins = '';

        $('div.vpl ul a').each(function () {
            var link = $(this).attr('href');
            if (link.indexOf('ed2k') >= 0)
                downloadLins += decodeURIComponent(link) + '<br>';
        });

        $('body').prepend(downloadLins)
    }

    if (url.indexOf('http://www.btmeiju.com') >= 0) {

        var downloadLins = '';
        var downloadLins1 = '';
        $('a.ml3').each(function () {
            var link = $(this).attr('href');
            if (link.indexOf('ed2k') >= 0)
                downloadLins += decodeURIComponent(link) + '<br>';
            if (link.indexOf('thunder') >= 0)
                downloadLins1 += link + '<br>';
        });

        $('body').prepend(downloadLins + downloadLins1)
    }


    simplify('qq.com',
        '.navWrap,.foot-Article-QQ,.crumbs-tool,#about,.ft,#scrollBtn,#invideocon,#sideBars,.mian-ad',
        '.body-Article-QQ,#Main-Article-QQ');

    simplify('cnblogs.com',
        '#blog_news_kb,#wrap,#main_header,#sideright,#guide,.blogStats,#leftcontent,#mylinks,#right,\
#mytopmenu,#rightmenu,#leftmenu,#site_nav_under,#under_post_news,#under_post_kb',
        '#main_wrapper,#sideleft,#mainContent,#centercontent,.forFlow');

    simplify('csdn.net',
        '.csdn-toolbar,#navigator,#side,.notice,#res-relatived,.blog-associat-tag,.tag_list,#pub_footerall,\
#im_popupWindow_miniMsg',
        '.details');

    simplify('chinaz.com',
        '#cz-head,.m-crumb-search,.cz-box-300,#cz-footer,.u-postfooter,.m-relate,.m-leftad,.m-picshow,\
#pinglun,#m-rightshare,.u-post-textad',
        '.czbox,.m-post');

    simplify('sina.com',
        '#hdnav,#blkBreadcrumb,.can_right,.wb_rec,.wc14_qr,.guess-view-list,.blkContainerOther,#J_Comment_Form_B,\
.side-btns-2wm,.blkBreadcrumb,.nsinatopbar,#sinablogHead,#column_1,#sinablogfooter,.SG_connHead,#blk_nav_1,.topbar,\
.zwsidebar,.headlines_news,#fudong,.blkContentFooter,div[id$="_panel"],div[id^="sinaadToolkitBox"],#recommendShangXun',
        '.blkContainerSblk,.blkContainer,#column_2,#sinablogbody,.articalContent,.SG_connBody,.blkContainerSblk,\
.Main,.zwcontent,.zwc');

    simplify('admin10000.com',
        '#miniNav,#search,#position,.right,.weixin,.tags,.tip,.relation,.share,.texttip,.ad_336x280,\
.ad_640x90，#f_close_box',
        '');

    simplify('51cto.com',
        '#home_top,.headerBox,.blogLeft,.mainNav,.edu-col-b,.relatedArt,#message,.mb10,.menu,.subweb,.g_13,.tips,\
.titbg,.reltag,.relart,.cathot,.bor,#ft,.crumb,.edu-col-a,.art_tj,#f_close_box,.m_sharebtn',
        '.blogMain,.blogRight,.g_26,.g_39,.brief');

    simplify('infoq.com', '#topInfo,.share_this,.article_page_right,.random_links,.bottomContent,.eBookLeft,\
.related_sponsors',
        '#site,.article_page_left,.ebook,.txt,blockquote');

    simplify('oschina.net',
        '#OSC_NavTop,#OSC_Banner,#OSC_Footer,.NewsRight,.toolbar,.copyright,.RelatedNews,.RelatedThreads,#upprev_box,\
.translater,.ProjectRight,#SpaceLeft,#OSC_Topbar,.QuestionRelations,#Vote',
        '#OSC_Screen,.NewsBody,.NewsEntity,.TextContent,.ProjectMain,.SpaceList');

    simplify('163.com',
        '#js_N_nav,.ep-header,.subfoot-wrap,.N-nav-bottom,#epContentRight,.sharecommend-wrap,.ep-keywords,.atleLP,\
.ep-returnlink,.extra-tag,.ep-content-side',
        '#js-epContent,#epContentLeft,#endText,.ep-content-main');


    simplify('jobbole.com',
        '#wp_rp_first,.right-content',
        '.grid-8,.col-sm-8');


    simplify('dataguru.cn',
        '#float_l,#float_r,#friendlink,.sd,#pt,.wrap_top,.wrap_end',
        '.mn,#ct:first-child,.wrap_main,#wp', function () {
            $('#wp').parent().css('width', '100%');
        });


    simplify('feedly.com', '', '', function () {
        setInterval(function () {
            $('.condensed .entryholder .u100Entry,.entryBody').css('max-width', 'none');
        }, 1000);
    });

    simplify('www.ibm.com',
        '#ibm-masthead,#ibm-footer-module-dwwrapper',
        '#ibm-content,#ibm-pcon,#ibm-content-main,.ibm-columns,.ibm-col-1-1');

    simplify('www.linuxeden.com',
        '#newhead,.pright,.place',
        '.w960,.pleft,.viewbox,.TextContent');

    simplify('www.managershare.com',
        '.bottom_layer,.post_relate,.post_nav',
        '.main_left');


    function expand(expandStr) {
        if (expandStr && expandStr !== '') {
            expandStr += ',.';
        }

        var expandArray = ['main', 'home', 'body', 'container', 'content', 'wrapper', 'left', 'right', 'post', 'wrap',
            'page', 'Body', 'Content'];

        expandStr += expandArray.join(',.');
        expandStr += ',#' + expandArray.join(',#');

        $(expandStr).css({
                'width': '100%',
                'padding': 0,
                'border': 0,
                'margin': 0,
                'background-image': 'none',
                'max-width': 'none'
            }
        );
        console.log('elements expanded');

    }

    function remove(removeStr) {
        if (removeStr && removeStr !== '') {
            removeStr += ',';
        }

        var removeArray = ['object', 'header', 'nav', 'footer', 'embed', 'sidebar', 'breadcrumb',
            'sideBar', 'navTop', 'topNav', 'aside'];

        removeStr += removeArray.join(',');
        removeStr += ',#' + removeArray.join(',#');
        removeStr += ',.' + removeArray.join(',.');

        setInterval(function () {
            $(removeStr).remove();
            console.log(removeStr + ',removed');
        }, 1000);

    }


    function addStyle() {
        $("<style type='text/css'>\
body{margin:0;border:0;padding:20px;background-image:none;width:auto;background-color:#F5FAFF}\
p{font-family:Georgia, \"Times New Roman\", \"Microsoft YaHei\", \"微软雅黑\", STXihei, \"华文细黑\", serif;color:#000000;text-indent:2em}\
</style>").appendTo("head");
        console.log('style append');
    }

    function simplify(siteName, removeStr, expandStr, callback) {

        if (url.indexOf(siteName) == -1) return;
        console.log(siteName + ' begin');

        addStyle();

        remove(removeStr);
        expand(expandStr);

        if (callback) {
            callback();
        }

        console.log(siteName + ' end');

    }
})();
