// ==UserScript==
// @name         ImdbMonkey
// @namespace    bf.imdb
// @version      0.1
// @description  Filter imdb
// @include      https://www.imdb.com/search/title?*
// @run-at      document-end
// @grant        none
// ==/UserScript==

(function() {

    console.log('Imdb monkey begin')

    document.body.addEventListener('DOMSubtreeModified', function () {
        var list = document.querySelectorAll('#main h3 > span.lister-item-year.text-muted.unbold');
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var s = item.textContent.split('(') [1].split(')') [0]

            if(s.length==4) {
                removeNode(item)
                continue
            }
            if(s.length==6) continue

            var start = parseInt(s.substring(0,5));
            var end = parseInt(s.substring(5))

            if(end<2000 || end -start <3){
                removeNode(item)
            }
        }

    }, false)

    function removeNode(item){
        console.log(item.parentNode)
        item.parentNode.parentNode.parentNode.style.display = 'none'
    }
    console.log('Imdb monkey end')
})()
