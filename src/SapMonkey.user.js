// ==UserScript==
// @name        SapMonkey
// @namespace   bf.sap
// @include     https://confluence.successfactors.com/*
// @include     https://jira.successfactors.com/browse/*
// @include     http://192.168.161.161:8080/*
// @include     http://testlink.successfactors.com/testlink/lib/testcases/archiveData.php?*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/SapMonkey.user.js
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @run-at      document-end
// @grant       GM_addStyle
// @version     8
// ==/UserScript==
(function () {
    var url = window.location.href
    console.log('sap monkey', url)
    if (url.indexOf('https://confluence.successfactors.com') == 0) {
        document.querySelector('#header-precursor').style.display = 'none'
    }

    if (url.indexOf('https://jira.successfactors.com') == 0) {
        GM_addStyle('.user-content-block{font-family: monospace;}');
    }

    if (url.indexOf('http://testlink.successfactors.com/testlink/lib/testcases/archiveData.php?') == 0) {
        console.log('testlink')
        setTimeout(function() {
            var v = $('body > div > h2').text().trim();
            console.log(v);
            //PLT#-123467970:getTargetPopulation (by Role)-ONB-External Role-Group: 1 role 1 rule
            v = v.replace(/[#|\-|:|\(|\)| |\/]/g, '_').replace(/_+/g, '_')
            console.log(v);
            $('body > div > h2').append('<br>').append(v);
        }, 1000)
    }

    if (isVm(url) && url.indexOf('/login') > 0) {
        document.querySelector('#__input1-inner').value = 'admin'
        document.querySelector('#__input2-inner').value = 'demo101'
    }

    if (isVm(url) && url.indexOf('/provisioning_login') > 0) {
        var c = document.querySelector('input[name="username"]')
        console.log(c)
        if (c) {
            c.value = 'SFV4'
        }
        c = document.querySelector('input[name="password"]')
        if (c) {
            c.value = 'sfv4'
        }
    }
}) ()

function isVm(url){
    return url.indexOf('http://192.168.161.161')==0 && url.indexOf(':8080') > 0 ;
}
