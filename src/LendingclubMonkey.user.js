// ==UserScript==
// @name        LendingclubMonkey
// @namespace   bf
// @include     https://jira.tlcinternal.com/secure/ConfigureReport*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/LendingclubMonkey.user.js
// @version     2
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==
(function () {
    var url = window.location.href
    if (url.indexOf('https://jira.tlcinternal.com/secure/ConfigureReport') == 0) {
        function formatDate(date, begin) {
            var monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            var day = date.getDate();
            if(begin)day=begin
            var monthIndex = date.getMonth();
            var year = date.getYear();
            year += ''
            var s = day + '/' + monthNames[monthIndex].substring(0, 3) + '/' + year.substring(year.length - 2)
            console.log(s);
            return s
        }

        function setSelectBoxByText(eid, etxt) {
            for (var i = 0; i < eid.options.length; ++i) {
                console.log(eid.options[i].text.trim())
                if (eid.options[i].text.trim() === etxt)
                    eid.options[i].selected = true;
            }
        }

        var today=new Date()
        document.querySelector('#date_endDate').value = formatDate(today)
        document.querySelector('#date_startDate').value = formatDate(today,1)
        var ssoId=getValue('ssoId')
        document.querySelector('#targetUser').value = ssoId
        var e = document.querySelectorAll('#configure-report.aui fieldset fieldset div.field-group fieldset.group select')
        setSelectBoxByText(e[3], 'None')
    }
    
    function getValue(key) {

        var value = GM_getValue(key);
        if (!value || value === '') {
            value = window.prompt('plese enter ' + key);
            GM_setValue(key, value);
        }
        return value;
    }
})()
