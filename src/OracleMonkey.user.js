// ==UserScript==
// @name        OracleMonkey
// @namespace   oracle
// @description sso,bugdb,dep, bugsmart, ice
// @include     http*://*.oracle.com*
// @include     http*://*.oraclecorp.com*
// @include     http*://*.oracledemos.com*
// @version     10.9
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


//weblogic console login begin
    if (window.location.href.indexOf('/console/login/LoginForm.jsp') > 0) {
        $('#j_username').val('system');
        $('#j_password').val('Passw0rd');
        $('#loginData div.button-row span.ctrl input.formButton').click();
    }
//weblogic console login end


    //peopletools login page begin
    var id$ = $('#userid');

    if (id$.length > 0 && currentURL.indexOf('us.oracle.com') > 0) {
        console.log('peoplesoft login begin');
        var idArray = ['VP1', 'PS', 'PTDMO', 'GUEST'];
        for (var i = 0; i < idArray.length; i++) {
            $('<div>' + idArray[i].toUpperCase() + '</div>').appendTo($('td.psloginframe,#ps_select_parent')).on('click', function () {

                $('#userid,#pwd').val($(this).html());
                $('#login').submit();
            });
        }
        console.log('peoplesoft login end');
    }
//peopletools login page end

    if ((currentURL.indexOf('/psp/') > 0 || currentURL.indexOf('/psc/') > 0)
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
                'fluid home': '/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL',
                'web profile': '/c/WEB_PROFILE.WEB_PROFILE.GBL',
                'gateways': '/c/IB_PROFILE.IB_GATEWAY.GBL',
                'Security folder': '/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=PT_SECURITY',
                'Portal folder': '/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=PT_PORTAL',
                'Peopletools folder': '/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=PT_PEOPLETOOLS'
            };
            for (var o in urlMap) {
                var url = prefix + urlMap[o];
                url = url.replace('/psc/', '/psp/');
                $('#baofeng_qa_menu').append('<li><a href="' + url + '">' + o + '</a></li>');
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

        }
    }


//ice end


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


    if (currentURL.indexOf("dsiweb01") >= 0) {
        console.log('dep begin');

        if ($('#dep').length == 0) {

            console.log('do dep 1st login');

            $.ajax
            ({
                type: "GET",
                url: "/dep/default.asp",
                dataType: 'json',
                async: false,
                headers: {
                    "Authorization": "Basic " + btoa(getValue('peoplesoftId') + ":" + getValue('peoplesoftPass'))
                },

                success: function () {
                    console.log('dep 1st login done');
                    document.location.href = '/dep/default.asp';
                }
            });

        }


        var login$ = $('input[name="WHO"]');
        if (login$.length == 1) {

            console.log('do dep 2nd login');
            if ($('span.loginLabel').html().toLowerCase().indexOf('invalid') >= 0) {
                console.log('delete ssoPass');
                GM_deleteValue('ssoPass');
            }

            login$.val(getValue('ssoId'));
            $('input[name="sPassword"]').val(getValue('ssoPass'));
            $('form').submit();
            console.log('dep 2nd login done');

        }

        console.log('dep end');
        return;
    }


//oracle sso begin
    if (currentURL.indexOf("/mysso/signon.jsp") >= 0) {

        console.log('oracle sso begin');

        if ($('#errormsg').length > 0) {
            console.log('delete ssoPass');
            GM_deleteValue('ssoPass');

        }


        $('#sso_username').val(getValue('ssoId'));
        $('#ssopassword').val(getValue('ssoPass'));

        $('form:first').submit();

        console.log('oracle sso end');

    }
//oracle sso end


//bugdb edit begin
    if (currentURL.indexOf('https://bug.oraclecorp.com/pls/bug/webbug_edit') >= 0 && $('#fixby').length > 0) {

        addStyle();

        var bugNo = $('#rptno').val();
        var bugsmart = 'https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?eb=' + bugNo;
        var iceCreate = 'https://iceportal.oraclecorp.com/psp/ICE/EMPLOYEE/ICE/c/ICE_BUG.RQ_BUG_RSLT.GBL?\
olderPath=PORTAL_ROOT_OBJECT.ICE_20.WRK_RSLT.RQ_BUG_RSLT_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder';

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
<a href="#wantClose" id="wantClose">Want to Close</a>&nbsp;<a href="#closeBug" id="closeBug">Close bug</a>\
&nbsp;<a href="#p2" id="p2">p2</a>');

        $(document).on('click', "#textClear", function () {
            console.log('clear');
            bug_desc$.val('');
        }).on('click', "#askUpate", function () {
            bug_desc$.val('Could you check my update from bugdb? thanks');
        }).on('click', "#wantClose", function () {
            bug_desc$.val('I am going to close this bug if no further response in 3 days.');
        }).on('click', "#p2", function () {
            bug_desc$.val('This is P2, hope could come back soon since I\'m working on some P1 and escalations.');
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


    if (currentURL.indexOf('https://bug.oraclecorp.com/pls/bug/webbug_reports.simple_query') >= 0) {

        console.log('bugdb simple query begin');

        $('input[title="Product I D. Separate by Comma if more than one."]').val('5085');
        $('#comp_code').val('TECH,PORTAL');
        console.log('bugdb simple query end');
    }

    GM_registerMenuCommand('clear sso', function () {
        GM_deleteValue('ssoPass');
        alert('cleared');
    });

    GM_registerMenuCommand('clear peoplesoft', function () {
        GM_deleteValue('peoplesoftPass');
        alert('cleared');
    });


    function getValue(key) {

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
