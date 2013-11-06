// ==UserScript==
// @name        pt-login
// @namespace   pt-login
// @include     http://*.us.oracle.com*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/pt_login.user.js
// @run-at      document-end
// ==/UserScript==

console.log('start pt longin');

var ids$=$('#userid,#pwd');

if(ids$.length===0){
	return;
}

ids$.bind('keyup',function(){
ids$.val($(this).val().toUpperCase());
});


var userid$=$('#userid');
userid$.focus();




if(userid$.val()===''){
    ids$.val('VP1');
    
}
var pwd$=$('#pwd');
pwd$.val(ids$.val());