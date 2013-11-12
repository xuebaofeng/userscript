// ==UserScript==
// @name        OracleMonkey
// @namespace   oracle
// @description sso,bugdb,em-entral
// @include     https://login.oracle.com/mysso/signon.jsp
// @include     http://*.us.oracle.com*
// @include     https://bug.oraclecorp.com/pls/bug/webbug_edit*
// @include     https://bug.oraclecorp.com/pls/bug/webbug_reports.my_open_bugs
// @include     http://*.us.oracle.com*/console/login/LoginForm.jsp
// @include     http://em-central.oraclecorp.com/psp/EM-CENTRAL/?cmd=login*
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/OracleMonkey.user.js
// @run-at      document-end
// ==/UserScript==

var ssoName='@oracle.com';
var ssoPass='';
var peoplesoftId='baxue';
var peoplesoftPassword='64309aA#';

//oracle sso begin
if(window.location.href === "https://login.oracle.com/mysso/signon.jsp"){
    $('#sso_username').val(ssoName);
    $('#ssopassword').val(ssoPass);
    doLogin(document.LoginForm);
}
//oracle sso end

//peopletools login page begin
var ids$=$('#userid,#pwd');

if(ids$.length>0){
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
}
//peopletools login page end

//bugdb edit begin
if(window.location.href.indexOf('https://bug.oraclecorp.com/pls/bug/webbug_edit')>=0 && $('#fixby').length>0){
    
    
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
}
//bugdb edit end

//bugdb list begin
if(window.location.href==='https://bug.oraclecorp.com/pls/bug/webbug_reports.my_open_bugs'){
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
}
//bugdb list end

//weblogic console login begin
if(window.location.href.indexOf('/console/login/LoginForm.jsp')>0){
    $('#j_username').val('system');
    $('#j_password').val('11111111');
    $('#loginData div.button-row span.ctrl input.formButton').click();	
}
//weblogic console login end

//em-central begin
if(window.location.href.indexOf('http://em-central.oraclecorp.com/psp/EM-CENTRAL')>=0){
    console.log('em-central login');
    $('#userid').val(peoplesoftId);
    $('#pwd').val(peoplesoftPassword);
    $('#login input.PSLOGINPUSHBUTTON').click();	
}

//em-central end
