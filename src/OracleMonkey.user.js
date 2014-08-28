// ==UserScript==
// @name        OracleMonkey
// @namespace   oracle
// @description sso,bugdb,em-entral,dep, bugsmart, ice
// @include     https://login.oracle.com/mysso/signon.jsp
// @include     http://*.us.oracle.com*
// @include     https://*.us.oracle.com*
// @include     http://*.oraclecorp.com*
// @include     https://*.oraclecorp.com*
// @version     9.1
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/OracleMonkey.user.js
// @updateURL https://github.com/xuebaofeng/userscript/raw/master/src/OracleMonkey.user.js
// @run-at      document-end
// ==/UserScript==

(function () {

    var currentURL = window.location.href;

    function addStyle() {
        $("<style type='text/css'> \
body{\
font-family: 'Microsoft YaHei', sans-serif !important;\
font-size: 120% !important;\
          }\
</style>").appendTo("head");
    }

    if ((currentURL.indexOf('/psp/') > 0 || currentURL.indexOf('/psc/') > 0)
        && currentURL.indexOf('us.oracle.com') > 0
        && window === top) {

        console.log('peoplesoft menue begin');

        $("<style type='text/css'> \
#baofeng_qa{position:fixed; top:0; left:0; z-index:100000;}\
</style>").appendTo("head");

        $('body').prepend('<div id="baofeng_qa">+<ul id="baofeng_qa_menu" style="display: none; background-color:white;"></ul></div>');

        (function () {

            var prefixIndex = currentURL.indexOf('/h/');
            if (prefixIndex == -1) {
                prefixIndex = currentURL.indexOf('/c/');
            }
            if (prefixIndex == -1) {
                prefixIndex = currentURL.indexOf('/w/');
            }
            if (prefixIndex == -1) {
                prefixIndex = currentURL.indexOf('/s/');
            }

            var prefix = currentURL.substring(0, prefixIndex);

            var urlMap = {
                'classic home': '/h/?tab=DEFAULT',
                'peopeltools options': '/c/UTILITIES.PSOPTIONS.GBL',
                'system options': '/c/PTPP_PORTAL_ADMIN.PTPP_OPTIONS.GBL',
                'web profile': '/c/WEB_PROFILE.WEB_PROFILE.GBL',
                'Structure and Content ': '/c/PORTAL_ADMIN.PORTAL_OBJ_LIST.GBL',
                'branding system option': '/c/PTBR_MENU.PTBRANDINGSYSTEMOP.GBL',
                'Node Definitions': '/c/PORTAL_ADMIN.IB_NODE.GBL',
                'Single Signon': '/c/MAINTAIN_SECURITY.SINGLE_SIGNON.GBL',
                'NUI home': '/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL'
            };
            for (var o in urlMap) {
                $('#baofeng_qa_menu').append('<li><a href="' + prefix + urlMap[o] + '">' + o + '</a></li>');

            }

            $('#baofeng_qa').on('click', function () {
                $('#baofeng_qa_menu').toggle();
            });
        })();


        console.log('peoplesoft menue end');
    }


//ice begin
    if (currentURL.indexOf('https://iceportal.oraclecorp.com/') >= 0) {


        if ($('#userid').length > 0) {

            console.log('ice login begin');

            if ($('#login table tbody tr.signInTable td.PSERRORTEXT').html().indexOf('Your User ID and/or Password are invalid.') >= 0) {
                GM_deleteValue('peoplesoftPass');
            }

            $('#userid').val(getValue('peoplesoftId'));
            $('#pwd').val(getValue('peoplesoftPass'));
            $('input[type="submit"]').click();


            console.log('ice login end');
            return;
        }

        if (currentURL.indexOf('psc/ICE/EMPLOYEE/ICE/c/ICE_BUG.RQ_BUG_RSLT.GBL?') >= 0) {
            console.log('ice create begin');

            if ($('#RQ_BUG_WRK_RQ_BUG_RPTNO_ADD').length > 0) {

                var bugNo = getURLParameter('bugNo');

                $('#RQ_BUG_WRK_RQ_BUG_RPTNO_ADD').val(bugNo);
            }

            console.log('ice create end');
            return;
        }
    }


//ice end

//em-central begin
    if (currentURL.indexOf('em-central.oraclecorp.com/psp/EM-CENTRAL') >= 0 && currentURL.indexOf('log') > 0) {
        console.log('em-central login');

        $('#userid').val(getValue('peoplesoftId'));
        $('#pwd').val(getValue('peoplesoftPass'));

        if ($('#login table tbody tr.signInTable td.PSERRORTEXT').html().length == 0) {

            $('#login input.PSLOGINPUSHBUTTON').click();
        } else if (currentURL.indexOf('cmd=login') >= 0) {

            GM_deleteValue('peoplesoftPass');
        }

        return;
    }
//em-central end

//bugsmart begin
    if (currentURL.indexOf('https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?') >= 0) {
        console.log('bugsmart begin');
        addStyle();
        var nextButton$ = $('#Next.button');
        if (nextButton$.length > 0) {
            nextButton$.click();
        }

        $('select[name="regression_status"],select[name="product_tgs_9"]').css('background-color', 'yellow');

        console.log('bugsmart end');
        return;
    }
//bugsmart end

//dep begin
    if (currentURL.indexOf("dsiweb01") >= 0) {

        console.log('dep begin');
        if ($('span.loginLabel').html().toLowerCase().indexOf('invalid') >= 0) {
            console.log('delete ssoPass');
            GM_deleteValue('ssoPass');

        }

        $('input[name="WHO"]').val(getValue('ssoId'));
        $('input[name="sPassword"]').val(getValue('ssoPass'));
        $('form').submit();


        console.log('dep end');
        return;
    }
//dep end

//oracle sso begin
    if (currentURL === "https://login.oracle.com/mysso/signon.jsp") {

        console.log('oracle sso begin');

        if ($('#errormsg').length > 0) {
            console.log('delete ssoPass');
            GM_deleteValue('ssoPass');

        }


        $('#sso_username').val(getValue('ssoId'));
        $('#ssopassword').val(getValue('ssoPass'));

        $('form:first').submit();

        console.log('oracle sso end');
        return;
    }
//oracle sso end

//peopletools login page begin
    var id$ = $('#userid');

    if (id$.length > 0 && currentURL.indexOf('us.oracle.com') > 0) {

        var idArray = ['VP1', 'PS', 'PTDMO'];
        for (var i = 0; i < idArray.length; i++) {
            $('<div>' + idArray[i] + '</div>').prependTo($('div.ps_signinentry')).on('click', function () {

                $('#userid,#pwd').val($(this).html());
                $('#login').submit();
            });
        }

    }
//peopletools login page end

//bugdb edit begin
    if (currentURL.indexOf('https://bug.oraclecorp.com/pls/bug/webbug_edit') >= 0 && $('#fixby').length > 0) {

        addStyle();

        var bugNo = $('#rptno').val();
        var bugsmart = 'https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?eb=' + bugNo;
        var iceCreate = 'https://iceportal.oraclecorp.com/psp/ICE/EMPLOYEE/ICE/c/ICE_BUG.RQ_BUG_RSLT.GBL?FolderPath=PORTAL_ROOT_OBJECT.ICE_20.WRK_RSLT.RQ_BUG_RSLT_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder'
        iceCreate += '&bugNo=' + bugNo;
        $('#mainframespan form table tbody tr td a:first')
            .append('<a target="_blank" href="' + bugsmart + '">bug smart</a>')
            .append('&nbsp;|&nbsp;<a target="_blank" href="' + iceCreate + '">create ice</a>');


        var wikiString = '('
            + $('#fixby').val().replace('.00', '')
            + ','
            + 'p'
            + $('#severity').val()
            + ','
            + $('#statcode').val()
            + ') '
            + $('form center b').first().text()
            + ' [[https://bug.oraclecorp.com/pls/bug/webbug_edit.edit_info_top?&rptno='
            + $('#rptno').val()
            + '|Link]]\\\\';


        var bugform$ = $('form[name="bugform"]');
        bugform$.append(wikiString.toLowerCase());


        //begin to add radio button for note tempalte
        var bug_desc$ = $("#bug_desc");
        var textspan$ = $("#textspan");
        textspan$.append('<br><a href="#textClear" id="textClear">Clear</a>&nbsp;<a href="#askUpate" id="askUpate">Ask update</a>&nbsp;\
<a href="#wantClose" id="wantClose">Want to Close</a>&nbsp;<a href="#closeBug" id="closeBug">Close bug</a>');

        $(document).on('click', "#textClear", function () {
            console.log('clear');
            bug_desc$.val('');
        }).on('click', "#askUpate", function () {
            bug_desc$.val('Any update?');
        }).on('click', "#wantClose", function () {
            bug_desc$.val('I am going to close this bug if no further response in 3 days.');
        }).on('click', "#closeBug", function () {
            bug_desc$.val('Bug Analysis:\n\
******************\n\n\
Problem:\n\
******************\n\n\
Analysis:\n\
******************\n\n\
Code Change:\n\
******************\n\n\
Manual Unit test:\n\
******************\n\n\
PTF test case:\n\
******************\n\n');
        });

        return;
    }
//bugdb edit end


    GM_registerMenuCommand('clear sso', function () {
        GM_deleteValue('ssoPass');
        alert('cleared');
    });

    GM_registerMenuCommand('clear peoplesoft', function () {
        GM_deleteValue('peoplesoftPass');
        alert('cleared');
    });


    function getValue(key) {
        console.log('getValue');
        var value = GM_getValue(key);
        if (!value || value === '') {
            value = window.prompt('plese enter ' + key);
            GM_setValue(key, value);
        }
        return value;
    }

    function getURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

})();
