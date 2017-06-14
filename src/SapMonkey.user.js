// ==UserScript==
// @name        SapMonkey
// @namespace   bf.sap
// @include     https://confluence.successfactors.com/*
// @include     https://jira.successfactors.com/browse/*
// @include     http://192.168.161.161:8080/*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/SapMonkey.user.js
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @run-at      document-end
// @grant       GM_addStyle
// @version     7
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
