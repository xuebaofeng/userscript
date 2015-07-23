// ==UserScript==
// @name        OracleMonkey
// @namespace   oracle
// @description sso,bugdb,dep, bugsmart, ice, em-central
// @include     http*://*.oracle.com*
// @include     http*://*.oraclecorp.com*
// @include     http*://*.oracledemos.com*
// @version     25
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
.myButton {\
	-moz-box-shadow:inset 0px 1px 0px 0px #bbdaf7;\
	-webkit-box-shadow:inset 0px 1px 0px 0px #bbdaf7;\
	box-shadow:inset 0px 1px 0px 0px #bbdaf7;\
	background:linear-gradient(to bottom, #79bbff 5%, #378de5 100%);\
	background-color:#79bbff;\
	border-radius:4px;\
	border:1px solid #84bbf3;\
	display:inline-block;\
	cursor:pointer;\
	color:#ffffff;\
	font-weight:bold;\
	text-decoration:none;\
padding:4px;\
	text-shadow:0px 1px 0px #528ecc;\
}\
.myButton:hover {\
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #378de5), color-stop(1, #79bbff));\
	background:-moz-linear-gradient(top, #378de5 5%, #79bbff 100%);\
	background:-webkit-linear-gradient(top, #378de5 5%, #79bbff 100%);\
	background:-o-linear-gradient(top, #378de5 5%, #79bbff 100%);\
	background:-ms-linear-gradient(top, #378de5 5%, #79bbff 100%);\
	background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);\
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff',GradientType=0);\
	background-color:#378de5;\
}\
.myButton:active {\
	position:relative;\
	top:1px;\
}\
\
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

        var needRedirect = false;
        if (currentURL.indexOf('&fmode=1') > 0) {
            currentURL = currentURL.replace('&fmode=1', '');
            needRedirect = true;
        }
        if (currentURL.indexOf('cmd=logout') > 0) {
            currentURL = currentURL.replace('cmd=logout', 'cmd=login');
            needRedirect = true;
        }

        if (currentURL.indexOf('&trace=y') == -1 && currentURL.indexOf('&languageCd=') == -1) {
            needRedirect = true;
            currentURL += '&trace=y';
        }

        if (needRedirect) {
            document.location.href = currentURL
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
        <button class="myButton" id="baofeng_qa_copy_menu">copy menu</button></ul>\
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
                'Branding': '/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=PT_BRANDING',
                'Structure and Content': '/c/PORTAL_ADMIN.PORTAL_OBJ_LIST.GBL',
                'grouplet wizard': '/c/NUI_FRAMEWORK.PTGPLT_WIZARD_NUI.GBL',
                'User Profiles': 'c/MAINTAIN_SECURITY.USERMAINT.GBL'
            };
            for (var o in urlMap) {
                var url = prefix + urlMap[o];
                url = url.replace('/psc/', '/psp/');
                $('#baofeng_qa_menu').append('<li><a href="' + url + '">' + o + '</a></li>');
            }

            function getLogoutUrl() {
                var a = location.href.split('://');
                var b = a[1].split('/');
                c = '';
                for (var i = 0; i < 5; i++) {
                    c += b[i] + '/';
                }
                return a[0] + '://' + c + '?cmd=logout&trace=y';
            }

            $('#baofeng_qa_menu').append('<li><a href="' + getLogoutUrl() + '">logout</a></li>');

            $('#baofeng_qa').on('click', function () {
                $('#baofeng_qa_menu').toggle();
            });

            $('#baofeng_qa_copy_menu').on('click', function () {
                var s =
                    $('.pthnavbcanchor,.pthnavbarcref>a').map(function () {
                        return $(this).html();
                    }).toArray().join('>');

                s = s.replace('Favorites>', '').replace(/>&nbsp;/g, '');
                var componentUrl = 'c/' + location.href.split('://')[1].split('/')[6].split('\?')[0];
                s += '<br>' + componentUrl;
                $('body').prepend('<p id="baofeng_menu_copied" ' +
                'onclick="document.getElementById(\'baofeng_menu_copied\').style.display=\'none\';">' + s + '</p>');
            });

        })();


        console.log('peoplesoft menue end');
    }


    if (currentURL.indexOf('https://iceportal.oraclecorp.com/') >= 0) {
        console.log('ice begin');

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
        console.log('ice end');
    }


    if (currentURL.indexOf('https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?') >= 0) {
        console.log('bugsmart begin');
        addStyle();

        $('select[name="regression_status"],select[name="product_tgs_9"],select[name="database"],\
input[name="fix_by"],input[name="fixed_ver"]').css('background-color', 'yellow');


        $('#Back').parent().next().append('<a id="bf_close" class="myButton" style="float:right">fix</a>');
        $('#bf_close').on('click', function () {
            $('input.entry_item_override[name="auto_assign"]')
                .removeAttr('checked').removeAttr('value').parent().prev().find('span').css('color', 'green');
            $('input[name="assignee"]').val('MINGZHAO').css('background-color', 'green');
            $('select[name="status"]').val('80').css('background-color', 'green');
            $('select[name="product_tgs_9"]').val('Design-Insuff Tech Design').css('background-color', 'green');
        });



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

        if (currentURL = "http://dsiweb01.us.oracle.com/dep/ovmStatus.asp") {

            console.log("dep status begin");

            $('.DEP_TABLE,form>table').attr("width", "100%");
            $('.DEP_TABLE td:nth-child(1)').each(function () {

                if ($(this).find('font').attr('color') == 'maroon') {

                    var id = $(this).find('b').html();
                    var test = $('<button id="' + id + '">+7</>');
                    $(this).append(test);
                    $('#' + id).on('click', function () {
                        $.post('/dep/DBExpiry_Extend_save.asp?ExtnAllowed=70&ihours=7&sdbname=' + id);
                        return false;
                    });
                }
            });
            console.log("dep status end");
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
            .append('<a class="myButton" target="_blank" href="' + bugsmart + '">Bug smart</a>')
            .append('<a class="myButton" target="_blank" href="' + iceCreate + '">Create ice</a>');


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
        textspan$.append('<br><a class="myButton" href="#textClear" id="textClear">Clear</a>&nbsp;\
        <a class="myButton" href="#askUpate" id="askUpate">Ask update</a>&nbsp;\
<a class="myButton" href="#wantClose" id="wantClose">Want to Close</a>&nbsp;\
<a class="myButton" href="#closeBug" id="closeBug">Close bug</a>\
&nbsp;<a class="myButton" href="#p2" id="p2">p2</a>');

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
            bug_desc$.val('Problem:\n\
******************\n\n\
Analysis:\n\
******************\n\n\
Manual Unit test:\n\
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

        console.log('trackGroupIndex:', trackGroupIndex);
        console.log('escIndex:', escIndex);
        console.log('rows:', rows$.length);

        rows$.each(function (index) {
            if (index == 0)return;
            var oneRow$ = $(this);
            var trackingCell$ = oneRow$.children('td').eq(trackGroupIndex);
            var escCell$ = oneRow$.children('td').eq(escIndex);

            if (trackingCell$.html().indexOf("Escalation") >= 0) {
                trackingCell$.html('Escalation');
                escCell$.html('Escalation');
            } else {
                console.log(trackingCell$);

                trackingCell$.find('tr').each(
                    function () {
                        if ($(this).html().indexOf('Fixed On Build ID') == -1) {
                            $(this).remove();
                        }
                    }
                );
            }

            if (escCell$.html() == "C") {
                escCell$.html('(null)');
            }

        });

        console.log('bug list end');
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