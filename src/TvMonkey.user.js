// ==UserScript==
// @name       TvMonkey
// @namespace  baofeng.reading
// @version    2
// @description  美剧下载 meijutt,kanmeiju,btmeiju,cn163
// @match      http://www.meijutt.com/content/meiju*.html*
// @match      http://kanmeiju.net/detail/*.html
// @match      http://www.btmeiju.com/ustv/*.html
// @match      http://cn163.net/archives/*/
// @copyright  GNU
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-end
// @grant       GM_log
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/TvMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/TvMonkey.user.js
// ==/UserScript==
(function () {
    var url = window.location.href;
    var downloadLins = '';

    if (url.indexOf('meijutt.com') > 0) {
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


        $('div.vpl ul a').each(function () {
            var link = $(this).attr('href');
            if (link.indexOf('ed2k') >= 0)
                downloadLins += decodeURIComponent(link) + '<br>';
        });

        $('body').prepend(downloadLins)
    }

    if (url.indexOf('btmeiju.com') >= 0) {

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

    if (url.indexOf('cn163.net') >= 0) {
        console.log('cn163.net begin');
        $('#entry a').each(function () {
            var link = $(this).attr('href');
            console.log(link);
            if (link.indexOf('ed2k') >= 0 || link.indexOf('thunder') >= 0 || link.indexOf('magnet') >= 0)
                downloadLins += decodeURIComponent(link) + '<br>';

        });

        $('body').prepend(downloadLins)
    }

})();
