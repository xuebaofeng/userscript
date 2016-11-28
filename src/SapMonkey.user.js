// ==UserScript==
// @name        SapMonkey
// @namespace   bf.sap
// @include     https://confluence.successfactors.com/*
// @include     http://192.168.163.128:8080/*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/SapMonkey.user.js
// @run-at      document-end
// @version     3
// ==/UserScript==
(function () {
    var url = window.location.href
    if (url.indexOf('https://confluence.successfactors.com') == 0) {
        document.querySelector('#header-precursor').style.display = 'none'
    } //

    if (url.indexOf('http://192.168.163.128:8080/login') == 0) {
        var iv = setInterval(function () {
            count--
            console.log(count)
            if (count == 0) clearInterval(iv)
            var c = document.querySelector('input[placeholder="Enter Company ID"]')
            console.log(c)
            if (c) {
                c.value = 'salesdemo'
                document.href = 'http://192.168.163.128:8080/login?company=BizXTest#/login'
            }
            c = document.querySelector('input[placeholder="Username"]')
            console.log(c)
            if (c) {
                c.value = 'admin'
                document.querySelector('input[placeholder="Enter Password"]').value = 'demo101'
            }
        }, 1000);
    }

    if (url.indexOf('http://192.168.163.128:8080/provisioning_login') == 0) {
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
var count = 10;
