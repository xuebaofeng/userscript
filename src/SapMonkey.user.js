// ==UserScript==
// @name        SapMonkey
// @namespace   bf.sap
// @include     https://confluence.successfactors.com/*
// @include     http://192.168.163.128:8080/*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/SapMonkey.user.js
// @run-at      document-end
// @version     2
// ==/UserScript==
(function () {
  var url = window.location.href
  if (url.indexOf('https://confluence.successfactors.com') == 0) {
    document.querySelector('#header-precursor').style.display = 'none'
  } //

  if (url.indexOf('http://192.168.163.128:8080') == 0) {
    var iv = setInterval(function () {
      count--
      console.log(count)
      if (count == 0) clearInterval(iv)
      var c = document.querySelector('input[placeholder="Enter Company ID"]')
      console.log(c)
      if (c) {
        c.value = 'salesdemo'
        document.href = 'http://192.168.163.128:8080/login?company=salesdemo#/login'
      }
      c = document.querySelector('input[placeholder="Username"]')
      console.log(c)
      if (c) {
        c.value = 'bx'
        document.querySelector('input[placeholder="Enter Password"]').value = 'pwd1'
      }
    }, 1000);
  }
}) ()
var count = 100;
