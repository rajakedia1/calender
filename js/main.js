var mNode = [];
(function() {
  main();
})();

function main() {
  showWeekRow();
  showCalender();
}

function showTitle(mon) {
  var textnode = document.createTextNode(mon + " ");
  document
    .querySelector(".nav .h1")
    .replaceChild(textnode, document.querySelector(".nav .h1").childNodes[0]);
  document.querySelector(".nav .h1 .span").innerHTML = date.getFullYear();
}

function showWeekRow() {
  week.map((m, i) =>
    document.querySelector(".nav .row").appendChild(createDayNode(m, i))
  );
}

function showCalender() {
  var showDate = [];

  for (var i = 0; i < weekInYear + 2; i++) {
    showDate.push([]);
    for (var j = 0; j < 7; j++) {
      showDate[i].push(1);
    }
  }

  var startDay = calcFirstDayofYear(date.getFullYear());
  var w = 0,
    k = startDay;
  for (var i = k - 1; i >= 0; i--) showDate[0][i] = 31 - (k - 1 - i);
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < dayinmonth[i]; j++) {
      showDate[w][k] = j + 1;
      k++;
      if (k == 7) {
        k = 0;
        w++;
      }
    }
  }
  for (var i = k; i < 7; i++) showDate[w][i] = i - k + 1;
  console.log("h", showDate, w, k);
  var firstMonth = [];
  var wrapperNode = [];

  var monthsforyear = [];
  for (var i = 0; i < weekInYear + 1; i++) {
    var rows = document.createElement("div");
    rows.classList.add("row");
    for (j = 0; j < 7; j++) {
      var m = createDateNode(
        showDate[i][j],
        showDate[i][j],
        j,
        firstMonth.length
      );
      rows.appendChild(m);
      if (showDate[i][j] == 1) {
        firstMonth.push(i);
        mNode.push(monthsforyear);
        monthsforyear = [];
      }
      monthsforyear.push(m);
    }
    wrapperNode.push(rows);
  }
  mNode.push(monthsforyear);

  console.log("F: ", mNode);
  var monthsNode = createMonthNode(0),
    k = 1;
  for (i = 0; i < weekInYear + 1; i++) {
    if (i > 0 && i === firstMonth[k]) {
      k++;
      // console.log("F: ", i, k, monthsNode);

      document.querySelector(".wrapper").appendChild(monthsNode);
      monthsNode = createMonthNode(k - 1);
      monthsNode.appendChild(wrapperNode[i]);
    } else {
      // console.log("G: ", i, k, monthsNode);
      monthsNode.appendChild(wrapperNode[i]);
    }
  }
  document.querySelector(".wrapper").appendChild(monthsNode);
}

window.addEventListener(
  "DOMContentLoaded",
  function() {
    // var heightActive =
    document.getElementById(month[date.getMonth()]).scrollIntoView();
    // getBoundingClientRect();
    // console.log("x", heightActive);
    window.scrollTo(0, 200);
    document.querySelectorAll(".wrapper .months").forEach((months, index) => {
      months.classList.remove("actived");

      if (isElementInViewport(months)) {
        mNode.forEach(node =>
          node.forEach(m => {
            m.classList.remove("active-m");
          })
        );
        months.classList.add("actived");
        showTitle(month[index]);
        // console.log("x:", mNode[index + 1].length, index + 1);
        mNode[index + 1].forEach(m => {
          m.classList.add("active-m");
        });
        // console.log("x:", mNode[index + 1], index + 1);
      }
    });
  },
  false
);

document.querySelector(".wrapper").addEventListener(
  "scroll",
  function() {
    document.querySelectorAll(".wrapper .months").forEach((months, index) => {
      months.classList.remove("actived");

      if (isElementInViewport(months)) {
        mNode.forEach(node =>
          node.forEach(m => {
            m.classList.remove("active-m");
          })
        );
        months.classList.add("actived");
        showTitle(month[index]);
        mNode[index + 1].forEach(m => {
          m.classList.add("active-m");
        });
      }
    });
  },
  false
);
