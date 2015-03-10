// ==UserScript==
// @name        OracleMonkey
// @namespace   oracle
// @description sso,bugdb,dep, bugsmart, ice, em-central
// @include     http*://*.oracle.com*
// @include     http*://*.oraclecorp.com*
// @include     http*://*.oracledemos.com*
// @version     14
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
        $('#loginData').find('div.button-row span.ctrl input.formButton').click();
    }
//weblogic console login end


    if (currentURL.indexOf('us.oracle.com') > 0 && currentURL.indexOf('cmd=log') > 0) {
        console.log('peoplesoft login begin');

        if (currentURL.indexOf('cmd=logout') > 0) {
            location.href = currentURL.replace('cmd=logout', 'cmd=login');
        }

        if (currentURL.indexOf('&trace=y') == -1) {
            location.href = location.href + '&trace=y';
        }

        $('#pia\\.unminifiedjavascript').prop('checked', true);

        var idArray = ['VP1', 'PS', 'PTDMO', 'GUEST'];
        for (var i = 0; i < idArray.length; i++) {
            $('<div>' + idArray[i].toUpperCase() + '</div>')
                .appendTo($('td.psloginframe,#ps_select_parent')).on('click',
                function () {

                    $('#userid,#pwd').val($(this).html());
                    $('#login').submit();
                });
        }

        console.log('peoplesoft login end');
    }

    if ((currentURL.indexOf('/psp/') > 0 || currentURL.indexOf('/psc/') > 0)
        && window === top
        && currentURL.indexOf('oraclecorp.com') === -1) {

        console.log('peoplesoft menue begin');

        $("<style type='text/css'> \
#baofeng_qa{position:fixed; top:0; left:0; z-index:100000;}\
</style>").appendTo("head");

        $('body').prepend('<div id="baofeng_qa">+\
        <ul id="baofeng_qa_menu" style="display: none; background-color:white;">\
        <button id="baofeng_qa_copy_menu">copy menu</button></ul>\
                          </div>');

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
                'General Settings(Navigation Type)': '/c/PORTAL_ADMIN.PORTAL_REG_ADM.GBL',
                'Branding System Options': '/c/PTBR_MENU.PTBRANDINGSYSTEMOP.GBL',
                'Structure and Content': '/c/PORTAL_ADMIN.PORTAL_OBJ_LIST.GBL',
                'User Profiles': 'c/MAINTAIN_SECURITY.USERMAINT.GBL'
            };
            for (var o in urlMap) {
                var url = prefix + urlMap[o];
                url = url.replace('/psc/', '/psp/');
                $('#baofeng_qa_menu').append('<li><a href="' + url + '">' + o + '</a></li>');
            }

            $('#baofeng_qa').on('click', function () {
                $('#baofeng_qa_menu').toggle();
            });

            $('#baofeng_qa_copy_menu').on('click', function () {
                var s =
                    $('.pthnavbcanchor,.pthnavbarcref>a').map(function () {
                        return $(this).html();
                    }).toArray().join('>');

                s = s.replace('Favorites>', '').replace(/>&nbsp;/g, '');
                $('body').prepend('<p id="baofeng_menu_copied" ' +
                'onclick="document.getElementById(\'baofeng_menu_copied\').style.display=\'none\';">' + s + '</p>');
            });

        })();


        console.log('peoplesoft menue end');
    }


    if (currentURL.indexOf('https://iceportal.oraclecorp.com/') >= 0) {


        if ($('#userid').length > 0) {

            console.log('ice login begin');

            if ($('#login table tbody tr.signInTable td.PSERRORTEXT').html()
                    .indexOf('Your User ID and/or Password are invalid.') >= 0) {
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


        if ($('td.PSACTIVETAB').html().indexOf('Environment') > 0) {
            console.log('ice Environment begin');

            $('.PSPUSHBUTTONTBSENDNOTIFY').parent().append('<input type="text" list="userids">\
            <datalist id="userids">\
            <option value="Yang Liu"></option>\
            <option value="Mofeng Ma"></option>\
            <option value="Deepankar Narayanan"></option>\
            <option value="Eamon Gaffney"></option>\
            <option value="Willie Suh"></option>\
            <option value="Hao Zhang"></option>\
            <option value="Yonghao Bai"></option>\
            </datalist>');

            console.log('ice Environment end');

        }
    }


    if (currentURL.indexOf('https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?') >= 0) {
        console.log('bugsmart begin');
        addStyle();

        $('select[name="regression_status"],select[name="product_tgs_9"]').css('background-color', 'yellow');

        console.log('bugsmart end');
        return;
    }


    if (currentURL.indexOf("dsiweb01") >= 0) {
        console.log('dep begin');


        var login$ = $('input[name="WHO"]');
        if (login$.length == 1) {

            console.log('do dep sso');
            if ($('span.loginLabel').html().toLowerCase().indexOf('invalid') >= 0) {
                console.log('delete ssoPass');
                GM_deleteValue('ssoPass');
            }

            login$.val(getValue('ssoId'));
            $('input[name="sPassword"]').val(getValue('ssoPass'));
            $('form').submit();
            console.log('dep sso done');

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



    if (currentURL.indexOf('https://bug.oraclecorp.com/pls/bug/webbug_edit') >= 0 && $('#fixby').length > 0) {
        console.log('bug edit begin');
        addStyle();

        var bugNo = $('#rptno').val();
        var bugsmart = 'https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?eb=' + bugNo;
        var iceCreate = 'https://iceportal.oraclecorp.com/psp/ICE/EMPLOYEE/ICE/c/ICE_BUG.RQ_BUG_RSLT.GBL?';

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
        textspan$.append('<br><a href="#textClear" id="textClear">Clear</a>&nbsp;\
        <a href="#askUpate" id="askUpate">Ask update</a>&nbsp;\
<a href="#wantClose" id="wantClose">Want to Close</a>&nbsp;<a href="#closeBug" id="closeBug">Close bug</a>\
&nbsp;<a href="#p2" id="p2">p2</a>');

        $(document).on('click', "#textClear", function () {
            console.log('clear');
            bug_desc$.val('');
        }).on('click', "#askUpate", function () {
            bug_desc$.val('Any update?\nCould you check my update from bugdb? thanks');
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
        console.log('bug edit end');
        return;
    }

    if (currentURL.indexOf('https://bug.oraclecorp.com/pls/bug/WEBBUG_REPORTS') >= 0) {
        console.log('bug list begin');

        var rows$ = $('#data>tr');
        var header$ = rows$.children(0);

        var trackGroupIndex = 0;
        var escIndex = 0;

        header$.each(function (index) {

            if ($(this).html().indexOf('Tracking Group') >= 0) {
                trackGroupIndex = index;
            }

            if ($(this).html() == 'Esc') {
                escIndex = index;
            }
        });

        console.log('trackGroupIndex', trackGroupIndex);
        console.log('escIndex', escIndex);
        console.log(rows$.length);

        rows$.each(function (index) {
            if (index == 0)return;
            var oneRow$ = $(this);
            var trackingCell$ = oneRow$.children('td').eq(trackGroupIndex);
            var escCell$ = oneRow$.children('td').eq(escIndex);

            if (trackingCell$.html().indexOf("Escalation") >= 0) {
                trackingCell$.html('Escalation');
                escCell$.html('Escalation');
            } else {
                trackingCell$.html('');
            }

            if (escCell$.html() == "C") {
                escCell$.html('(null)');
            }

        });

        console.log('bug list end');
        return;
    }

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


    if (currentURL.indexOf('https://bug.oraclecorp.com/pls/bug/webbug_reports.simple_query') >= 0) {

        console.log('bugdb simple query begin');

        $('input[title="Product I D. Separate by Comma if more than one."]').val('5085');
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
