// ==UserScript==
// @name        oracle-sso
// @namespace   oracle
// @description sso
// @include     https://login.oracle.com/mysso/signon.jsp
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-end
// ==/UserScript==
$('#sso_username').val('baofeng.xue@oracle.com');
$('#ssopassword').val('AVG9dRPG');
doLogin(document.LoginForm);

