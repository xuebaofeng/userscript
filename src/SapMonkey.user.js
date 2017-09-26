// ==UserScript==
// @name        SapMonkey
// @namespace   bf.sap
// @include     https://confluence.successfactors.com/*
// @include     https://jira.successfactors.com/*
// @include     http://192.168.*:8080/*
// @include     https://*.ondemand.com/*
// @include     http://testlink.successfactors.com/testlink/lib/testcases/archiveData.php?*
// @include     https://github.wdf.sap.corp/*/pull/*/files
// @include     https://github.wdf.sap.corp/*/commit/*
// @exclude     https://git*?w=1
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/SapMonkey.user.js
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @run-at      document-end
// @grant       GM_addStyle
// @version     17
// ==/UserScript==
(function () {
    var url = window.location.href
    console.log('sap monkey', url)
    
        
    if(url.indexOf('/sf/home?')>0 || url.indexOf('/acme?')>0|| url.indexOf('/sf/admin?')>0){
       console.log('bizx')
       $("<style type='text/css'> \
#baofeng_qa{position:fixed; top:0; left:0; z-index:100000;}\
</style>").appendTo("head");

        $('body').prepend('<div id="baofeng_qa">+\
        <ul id="baofeng_qa_menu" style="display: none; background-color:white;"></ul></div>');

//http://192.168.161.161:8080/sf/home?bplte_company=BizXTest&_s.crb=%2b2DLJdoshBNTo6m%2bPFvfkcuvt4M%3d
              var sufix = '&_s.crb=' + url.split('_s.crb=')[1]
            var urlMap = {
                'group': '/acme?fbacme_o=admin&pess_old_admin=true&ap_param_action=ap_manage_rbp_group',
                'role': '/acme?fbacme_o=admin&pess_old_admin=true&ap_param_action=ap_manage_rbp_role'
            };
            for (var o in urlMap) {
                var url = urlMap[o];
                $('#baofeng_qa_menu').append('<li><a href="' + url + sufix + '">' + o + '</a></li>');
            }

            $('#baofeng_qa').on('click', function () {
                $('#baofeng_qa_menu').toggle();
            });
    }
    
    if (url.indexOf('https://github.wdf.sap.corp/') == 0) {
        // Wipe out the head and body contents so that we don't wait for them to load before doing the redirect.
        document.head.innerHTML='';
        document.body.innerHTML='';

        // Redirect to the URL we are at, with the special modifier attached that signals to ignore whitespace in the diffs.
        window.location.href=window.location.href + '?w=1';
    }

    if (url.indexOf('https://confluence.successfactors.com') == 0) {
        document.querySelector('#header-precursor').style.display = 'none'
    }

    if (url.indexOf('https://jira.successfactors.com') == 0) {
        GM_addStyle('.user-content-block{font-family: monospace;}');
        document.querySelector('#announcement-banner').style.display = 'none'        
    }

    if (url.indexOf('http://testlink.successfactors.com/testlink/lib/testcases/archiveData.php?') == 0) {
        console.log('testlink')
        setTimeout(function() {
            var v = $('body > div > h2').text().trim();
            console.log(v);
            v = toJava(v)
            console.log(v);
            $('body > div > h2').append('<br>').append(v);
        }, 100)
    }

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

const toJava = (phrase) => {
    //PLT#-123467970:getTargetPopulation (by Role)-ONB-External Role-Group: 1 role 1 rule
    phrase = phrase.replace(/[#|\-|:|\(|\)| |\/]|&|\+|;|,/g, '_').replace(/_+/g, '_')
  return phrase
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
