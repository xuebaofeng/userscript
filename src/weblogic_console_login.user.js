// ==UserScript==
// @name        weblogic console login
// @namespace   ps
// @description weblogic console login
// @include     http://*.us.oracle.com*/console/login/LoginForm.jsp
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-end
// ==/UserScript==
$('#j_username').val('system');
$('#j_password').val('11111111');
$('#loginData div.button-row span.ctrl input.formButton').click();