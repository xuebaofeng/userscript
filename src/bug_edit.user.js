// ==UserScript==
// @name        bug edit
// @namespace   bugdb
// @include     https://bug.oraclecorp.com/pls/bug/webbug_edit*
// @version     1.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-end
// downloadUrl  https://github.com/xuebaofeng/userscript/raw/master/src/bug_edit.user.js
// ==/UserScript==


if($('#fixby').length===0) return; 

$("<style type='text/css'> \
 *{font-family: 'Tahoma','Microsoft YaHei',sans-serif !important;}\
</style>").appendTo("head");

$('#hide_yes').attr('checked', true);

$('#mainframespan form center b:first').css('text-transform', 'lowercase');

var bugsmart='https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?eb=' + $('#rptno').val();
$('#mainframespan form table tbody tr td a:first').append('<a target="_blank" href="' + bugsmart+'">bug smart</a>');


$('div tt b').css('display','block').css('margin','2px').css('font-weight', 'normal').css('text-transform', 'lowercase').css('background-color','#F2FBEF');


var tt$=$('#mainframespan form div tt');
var text =tt$.html();
tt$.html(text.replace(/Not specified/g,'').replace(/\*\*\*/g,''));

tt$.find('i').each(function () {
  var text = $(this).html();
  $(this).html(
  text.replace('###Resolution Text','')
  .replace('###Discussion','')
  .replace(/@/g,'')
  .replace('###End of section','')  
  ).css('font-style', 'normal').css('background-color','#CEF6CE').css('display','block');
});

tt$.find('i + br, b + br').remove();


var wikiString=  '('
+$('#fixby').val().replace('.00','')
+','
+'p'
+$('#severity').val()
+','
+ $('#statcode').val()
+') '
+$('form center b').first().text()
+' [[https://bug.oraclecorp.com/pls/bug/webbug_edit.edit_info_top?&rptno='
+ $('#rptno').val()
+'|Link]]';

console.log(wikiString);

var bugform$ =$('form[name="bugform"]');
bugform$.append(wikiString);


$("html, body").animate({ scrollTop:$(document).height() }, 0);

