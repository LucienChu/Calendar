var MONTHS = [
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
];
var PREV_DATE_CLASS = "prev-date";
var NEXT_DATE_CLASS = "next-date";
// let currentDate = new Date();
var selectedDate = new Date();
var renderCalendar = function (date) {
    var currentDate = new Date(date.getTime());
    var d = selectedDate.getDate();
    currentDate.setDate(1);
    var monthDays = document.querySelector(".days");
    /**
     * last date object of the current month
     */
    var lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    /**
     * last date of the current month, ie: 28,29,30, or 31
     */
    var lastDay = lastDateOfMonth.getDate();
    /**
     * date object of the last date of the previous month
     */
    var lastDateOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    /**
     * last date of the previous month
     */
    var prevLastDay = lastDateOfLastMonth.getDate();
    /**
     * index of week days of the current date, ie: Mon, Tue, ...
     */
    var firstDayIndex = currentDate.getDay();
    /**
     * index of week days of the last date of month, ie: Mon, Tue, ...
     */
    var lastDayIndex = lastDateOfMonth.getDay();
    /**
     * dates after the last date of current month (belongs to next month)
     */
    var nextDays = 7 - lastDayIndex - 1;
    document.querySelector(".date h1").innerHTML =
        MONTHS[currentDate.getMonth()];
    document.querySelector(".date p").innerHTML = selectedDate.toDateString();
    var days = [];
    for (var x = firstDayIndex; x > 0; x--) {
        var tempDiv = document.createElement("div");
        // tempDiv.innerText = prevLastDay - x + 1 + "";
        tempDiv.innerText = "";
        tempDiv.className = PREV_DATE_CLASS;
        days.push(tempDiv);
    }
    for (var i = 1; i <= lastDay; i++) {
        var tempDiv = document.createElement("div");
        tempDiv.innerText = "" + i;
        if (currentDate.getMonth() === selectedDate.getMonth() &&
            i === selectedDate.getDate()) {
            tempDiv.className = "today";
        }
        days.push(tempDiv);
    }
    for (var j = 1; j <= nextDays; j++) {
        var tempDiv = document.createElement("div");
        tempDiv.innerText = "";
        tempDiv.className = NEXT_DATE_CLASS;
        days.push(tempDiv);
    }
    // monthDays.innerHTML = ""
    while (monthDays.firstElementChild) {
        monthDays.removeChild(monthDays.firstElementChild);
    }
    days.forEach(function (d) {
        d.addEventListener("click", function () {
            var value = parseInt(d.innerText);
            var newDate = new Date(currentDate.getTime());
            if (d.className === PREV_DATE_CLASS) {
                newDate.setMonth(newDate.getMonth() - 1);
            }
            else if (d.className === NEXT_DATE_CLASS) {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            newDate.setDate(value);
            // currentDate = new Date();
            selectedDate = newDate;
            renderCalendar(newDate);
            selecteDate(newDate);
        });
        monthDays.appendChild(d);
    });
};
function selecteDate(dateObj) {
    var date = dateObj.getDate();
    var monthDays = document.querySelector(".days");
    var children = monthDays.childNodes;
    for (var i = 0; i < children.length; i++) {
        var element = children[i];
        var classList = element.classList;
        var value = parseInt(element.innerText);
        if (!isNaN(value) && value === date && classList.length === 0) {
            classList.add("today");
        }
    }
}
var now = new Date();
document.querySelector(".prev").addEventListener("click", function () {
    now.setMonth(now.getMonth() - 1);
    renderCalendar(now);
});
document.querySelector(".next").addEventListener("click", function () {
    now.setMonth(now.getMonth() + 1);
    renderCalendar(now);
});
renderCalendar(new Date());
selecteDate(selectedDate);
