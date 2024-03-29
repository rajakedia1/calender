var date = new Date();
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January"
];

var weekInYear = 52;

var dayinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var listOfHolidays;

function findHoliday(d, m, y) {
  return listOfHolidays.filter(holiday => {
    return holiday.d === d && holiday.m === m;
  });
}

function createDayNode(text, i) {
  var d = document.createElement("div");
  d.classList.add("day");
  var s = document.createElement("span");
  var t = document.createTextNode(text);
  s.classList.add("title");
  if (!i) s.classList.add("active");
  s.appendChild(t);
  d.appendChild(s);
  return d;
}

function createMonthNode(i) {
  var months = document.createElement("div");
  months.classList.add("months");
  months.id = month[i];
  return months;
}

function createDateNode(text, i, j, mon) {
  var d = document.createElement("div");
  d.classList.add("date");
  if (!j) d.classList.add("sun");
  var s = document.createElement("span");
  var t = document.createTextNode(text);

  s.classList.add("text");
  if (i === date.getDate()) {
    if (
      (i == 1 && mon === date.getMonth()) ||
      (i != 1 && mon - 1 === date.getMonth())
    ) {
      s.classList.add("active");
      d.classList.add("date-active");
    }
  }
  s.appendChild(t);
  var ed = document.createElement("div");
  ed.classList.add("date-box");
  ed.appendChild(s);

  if (i === 1 && window.innerWidth >= 500) {
    var m = document.createElement("p");
    if (1 === date.getDate()) m.classList.add("month");
    else m.classList.add("month-active");
    m.innerHTML = month[mon].substr(0, 3);
    ed.appendChild(m);
  }
  d.appendChild(ed);

  var holiday = findHoliday(text, text !== 1 ? mon - 1 : mon);
  if (holiday) {
    holiday.forEach(element => {
      var h = document.createElement("div");
      h.classList.add("fest");
      h.innerHTML = element.holiday;
      d.appendChild(h);
    });
  }

  return d;
}

function calcFirstDayofYear(y, M = 0, k = 1) {
  var m = ((M + 10) % 12) + 1;
  var D = (y % 100) - (m > 10 ? 1 : 0);
  var C = Math.floor(y / 100);
  var F =
    k +
    Math.floor((13 * m - 1) / 5) +
    D +
    Math.floor(D / 4) +
    Math.floor(C / 4) -
    2 * C;
  var T = F > 0 ? F : (F - (Math.floor(F) + 2) * 7) % 7;
  return T % 7;
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  var views = rect.top > 0 ? window.innerHeight - rect.top : rect.bottom;
  return (
    views >= window.innerHeight / 2
  );
}
