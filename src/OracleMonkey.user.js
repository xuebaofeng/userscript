// ==UserScript==
// @name        OracleMonkey
// @namespace   oracle
// @description sso,bugdb,em-entral,dep, bugsmart
// @include     https://login.oracle.com/mysso/signon.jsp
// @include     http://*.us.oracle.com*
// @include     https://bug.oraclecorp.com/pls/bug/webbug_edit*
// @include     https://bug.oraclecorp.com/pls/bug/webbug_reports.my_open_bugs
// @include     http://em-central.oraclecorp.com/psp/EM-CENTRAL/*
// @include     https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl*
// @version     1.5
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/OracleMonkey.user.js
// @run-at      document-end
// ==/UserScript==

GM_log(GM_listValues());

GM_registerMenuCommand('clear id and password', function(){
    GM_deleteValue('ssoPass');
    GM_deleteValue('peoplesoftPass');
    GM_deleteValue('ssoId');
    GM_deleteValue('peoplesoftId');
    alert('cleared');
});

//bugsmart begin
if(window.location.href.indexOf('https://bugsmart.oraclecorp.com/cgi-bin/techpm/bug_smart.pl?')>=0){  
    console.log('bugsmart begin');
    
    var nextButton$=$('#Next.button');
    if(nextButton$.length>0){
        nextButton$.click();
    }
    
    $('select[name="regression_status"],select[name="product_tgs_9"]').css('background-color','yellow');
    
    console.log('bugsmart end');
    return;
}
//bugsmart end

//dep begin
if(window.location.href.indexOf("http://dsiweb01.us.oracle.com/dep/login.asp")>=0){
    
    console.log('dep begin');
    $('input[name="WHO"]').val(getValue('ssoId'));
    $('input[name="sPassword"]').val(getValue('ssoPass'));
    fn_Submit();
    console.log('dep end');
    return;
}
//dep end

//oracle sso begin
if(window.location.href === "https://login.oracle.com/mysso/signon.jsp"){
    
    console.log('oracle sso begin');
    $('#sso_username').val(getValue('ssoId'));
    $('#ssopassword').val(getValue('ssoPass'));
    
    doLogin(document.LoginForm);
    console.log('oracle sso end');
    return;
}
//oracle sso end

//peopletools login page begin
var ids$=$('#userid,#pwd');

if(ids$.length>0 && window.location.href.indexOf('us.oracle.com')>0){
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
    return;
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
    return;
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
    return;
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
    
    $('#userid').val(getValue('peoplesoftId'));
    $('#pwd').val(getValue('peoplesoftPass'));
    $('#login input.PSLOGINPUSHBUTTON').click();	
    return;
}

function getValue(key){
    console.log('getValue');
    var value=GM_getValue(key);
    if(!value || value===''){
        value=window.prompt('plese enter '+key);
        GM_setValue(key,value);
    } 
    return value;
}
//em-central end
