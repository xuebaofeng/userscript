// ==UserScript==
// @name        SapMonkey
// @namespace   bf.sap
// @include     https://confluence.successfactors.com/*
// @include     http://192.168.*:8080/*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/SapMonkey.user.js
// @run-at      document-end
// @version     5
// ==/UserScript==
(function () {
    var url = window.location.href
    if (url.indexOf('https://confluence.successfactors.com') == 0) {
        document.querySelector('#header-precursor').style.display = 'none'
    } //

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
    return url.indexOf('http://192.168.')==0 && url.indexOf(':8080') > 0 ;
}
