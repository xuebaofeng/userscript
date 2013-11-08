// ==UserScript==
// @name        bug list
// @namespace   bugdb
// @include     https://bug.oraclecorp.com/pls/bug/webbug_reports.my_open_bugs
// @version     1.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/bug_list.user.js
// @run-at      document-end
// ==/UserScript==


$("<style type='text/css'> \
 *{font-family: 'Tahoma','Microsoft YaHei',sans-serif !important;}\
 table{border-collapse: collapse;}\
</style>").appendTo("head");

var tr$=$('#SummaryTab tr');


tr$.css('text-transform','lowercase').css('font-size','18px');

tr$.find(':nth-child(9)').remove();
tr$.find(':nth-child(9)').remove();
tr$.find(':nth-child(4)').remove();
tr$.find(':nth-child(2)').remove();


tr$.each(function(){
var oneRow$=$(this);

if(
oneRow$.find(':nth-child(5)').html()==="4"
||oneRow$.find(':nth-child(6)').html()==="30"
){
oneRow$.css('color','gray');
}else if(
oneRow$.find(':nth-child(5)').html()==="1"
){
oneRow$.css('color','red');
}

});
