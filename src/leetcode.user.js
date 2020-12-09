// ==UserScript==
// @name        Insert markdown of problem - leetcode.com
// @namespace   Violentmonkey Scripts
// @match       https://leetcode.com/problems/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/9/2020, 12:49:25 PM
// ==/UserScript==

console.log('leetcode start')

document.addEventListener("DOMNodeInserted", ar, false);

//setInterval(function(){ar()  }, 1000);
var done =false;
function ar(){
  if(done) return
  var e =document.querySelector('div[data-cy="question-title"]')
  if(!e) return
  document.removeEventListener("DOMNodeInserted", ar);
  var s = '<br/>['+document.querySelector('div[data-cy="question-title"]').innerHTML +']('+window.location.href + ') [' + document.querySelector('div .css-dcmtd5').innerHTML +']'
  console.log(s)
  e.insertAdjacentHTML('beforeend', s);
  done = true
}


console.log('leetcode end')
