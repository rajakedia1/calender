"use strict";var date=new Date,week=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],month=["January","February","March","April","May","June","July","August","September","October","November","December"],weekInYear=52,dayinmonth=[31,28,31,30,31,30,31,31,30,31,30,31];function createDayNode(e,t){var a=document.createElement("div");a.classList.add("day");var n=document.createElement("span"),o=document.createTextNode(e);return n.classList.add("title"),t||n.classList.add("active"),n.appendChild(o),a.appendChild(n),a}function createMonthNode(e){var t=document.createElement("div");return t.classList.add("months"),t.id=month[e],t}function createDateNode(e,t,a,n){var o=document.createElement("div");o.classList.add("date"),t===date.getDate()&&o.classList.add("date-active"),a||o.classList.add("sun");var r=document.createElement("span"),d=document.createTextNode(e);if(r.classList.add("text"),console.log("G",n,date.getMonth(),month[n]),t===date.getDate()&&(1==t&&n===date.getMonth()||1!=t&&n-1===date.getMonth())&&r.classList.add("active"),r.appendChild(d),o.appendChild(r),1===t&&500<=window.innerWidth){var c=document.createElement("p");1===date.getDate()?c.classList.add("month"):c.classList.add("month-active"),c.innerHTML=month[n].substr(0,3),o.appendChild(c)}return o}function calcFirstDayofWeek(e,t){var a=e%7;console.log(a);for(var n=t;0<a;)a--,0<n?n-=1:n=6;return(n+1)%7}function calcFirstDayofYear(e){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1,a=((1<arguments.length&&void 0!==arguments[1]?arguments[1]:0)+10)%12+1,n=e%100-(10<a?1:0),o=Math.floor(e/100),r=t+Math.floor((13*a-1)/5)+n+Math.floor(n/4)+Math.floor(o/4)-2*o;return(0<r?r:(r-7*(Math.floor(r)+2))%7)%7}function isElementInViewport(e){var t=e.getBoundingClientRect();return(0<t.top?window.innerHeight-t.top:t.bottom)>=window.innerHeight/2}var mNode=[];function main(){showWeekRow(),showCalender()}function showTitle(e){var t=document.createTextNode(e+" ");document.querySelector(".nav .h1").replaceChild(t,document.querySelector(".nav .h1").childNodes[0]),document.querySelector(".nav .h1 .span").innerHTML=date.getFullYear()}function showWeekRow(){week.map(function(e,t){return document.querySelector(".nav .row").appendChild(createDayNode(e,t))})}function showCalender(){for(var e=[],t=0;t<weekInYear+2;t++){e.push([]);for(var a=0;a<7;a++)e[t].push(1)}var n=0;for(t=(l=calcFirstDayofYear(date.getFullYear()))-1;0<=t;t--)e[0][t]=31-(l-1-t);for(t=0;t<12;t++)for(a=0;a<dayinmonth[t];a++)e[n][l]=a+1,7==++l&&(l=0,n++);var o=[],r=[],d=[];for(t=0;t<weekInYear;t++){var c=document.createElement("div");for(c.classList.add("row"),a=0;a<7;a++){var i=createDateNode(e[t][a],e[t][a],a,o.length);c.appendChild(i),1==e[t][a]&&(o.push(t),mNode.push(d),d=[]),d.push(i)}r.push(c)}mNode.push(d);var s=createMonthNode(0),l=1;for(t=0;t<weekInYear;t++)0<t&&t===o[l]?(l++,document.querySelector(".wrapper").appendChild(s),(s=createMonthNode(l-1)).appendChild(r[t])):s.appendChild(r[t])}main(),window.addEventListener("DOMContentLoaded",function(){document.getElementById(month[date.getMonth()]).scrollIntoView(),window.scrollTo(0,200),document.querySelectorAll(".wrapper .months").forEach(function(e,t){e.classList.remove("actived"),isElementInViewport(e)&&(mNode.forEach(function(e){return e.forEach(function(e){e.classList.remove("active-m")})}),e.classList.add("actived"),showTitle(month[t]),mNode[t+1].forEach(function(e){e.classList.add("active-m")}))})},!1),document.querySelector(".wrapper").addEventListener("scroll",function(){document.querySelectorAll(".wrapper .months").forEach(function(e,t){e.classList.remove("actived"),isElementInViewport(e)&&(mNode.forEach(function(e){return e.forEach(function(e){e.classList.remove("active-m")})}),e.classList.add("actived"),showTitle(month[t]),mNode[t+1].forEach(function(e){e.classList.add("active-m")}))})},!1);