// ==UserScript==
// @name        LendingclubMoney
// @namespace   bf
// @include     https://jira.tlcinternal.com/secure/ConfigureReport*
// @downloadURL https://github.com/xuebaofeng/userscript/raw/master/src/LendindclubMoney.user.js
// @version     1
// @grant       none
// ==/UserScript==
(function () {
    var url = window.location.href
    if (url.indexOf('https://jira.tlcinternal.com/secure/ConfigureReport') == 0) {
        function formatDate(date) {
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

        document.querySelector('#date_endDate').value = formatDate(new Date())
        var sDate = Date.now() + -7 * 24 * 3600 * 1000;
        document.querySelector('#date_startDate').value = formatDate(new Date(sDate))
        document.querySelector('#targetUser').value = 'bxue'
        var e = document.querySelectorAll('#configure-report.aui fieldset fieldset div.field-group fieldset.group select')
        setSelectBoxByText(e[3], 'None')
    }
})()
