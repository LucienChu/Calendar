const MONTHS = [
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

const PREV_DATE_CLASS = "prev-date";
const NEXT_DATE_CLASS = "next-date";

// let currentDate = new Date();

let selectedDate = new Date();

const renderCalendar = (date: Date) => {
  const currentDate = new Date(date.getTime());
  const d = selectedDate.getDate();
  currentDate.setDate(1);

  const monthDays = document.querySelector(".days");

  /**
   * last date object of the current month
   */

  const lastDateOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  /**
   * last date of the current month, ie: 28,29,30, or 31
   */
  const lastDay = lastDateOfMonth.getDate();

  /**
   * date object of the last date of the previous month
   */
  const lastDateOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  /**
   * last date of the previous month
   */
  const prevLastDay = lastDateOfLastMonth.getDate();

  /**
   * index of week days of the current date, ie: Mon, Tue, ...
   */
  const firstDayIndex = currentDate.getDay();

  /**
   * index of week days of the last date of month, ie: Mon, Tue, ...
   */
  const lastDayIndex = lastDateOfMonth.getDay();

  /**
   * dates after the last date of current month (belongs to next month)
   */
  const nextDays = 7 - lastDayIndex - 1;

  document.querySelector(".date h1")!.innerHTML =
    MONTHS[currentDate.getMonth()];

  document.querySelector(".date p")!.innerHTML = selectedDate.toDateString();

  let days: HTMLDivElement[] = [];

  for (let x = firstDayIndex; x > 0; x--) {
    const tempDiv = document.createElement("div");
    // tempDiv.innerText = prevLastDay - x + 1 + "";
    tempDiv.innerText = "";
    tempDiv.className = PREV_DATE_CLASS;
    days.push(tempDiv);
  }

  for (let i = 1; i <= lastDay; i++) {
    const tempDiv = document.createElement("div");
    tempDiv.innerText = "" + i;
    if (
      currentDate.getMonth() === selectedDate.getMonth() &&
      i === selectedDate.getDate()
    ) {
      tempDiv.className = "today";
    }
    days.push(tempDiv);
  }

  for (let j = 1; j <= nextDays; j++) {
    const tempDiv = document.createElement("div");
    tempDiv.innerText = "";
    tempDiv.className = NEXT_DATE_CLASS;
    days.push(tempDiv);
  }

  // monthDays.innerHTML = ""
  while (monthDays.firstElementChild) {
    monthDays.removeChild(monthDays.firstElementChild);
  }
  days.forEach((d) => {
    d.addEventListener("click", function () {
      const value = parseInt(d.innerText);
      const newDate = new Date(currentDate.getTime());
      if (d.className === PREV_DATE_CLASS) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (d.className === NEXT_DATE_CLASS) {
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

function selecteDate(dateObj: Date) {
  const date = dateObj.getDate();
  const monthDays = document.querySelector(".days");
  const children = monthDays.childNodes;
  for (let i = 0; i < children.length; i++) {
    const element = children[i] as HTMLDivElement;
    const classList = element.classList;
    const value = parseInt(element.innerText);
    if (!isNaN(value) && value === date && classList.length === 0) {
      classList.add("today");
    }
  }
}

const now = new Date();

document.querySelector(".prev")!.addEventListener("click", () => {
  now.setMonth(now.getMonth() - 1);
  renderCalendar(now);
});

document.querySelector(".next")!.addEventListener("click", () => {
  now.setMonth(now.getMonth() + 1);
  renderCalendar(now);
});

renderCalendar(new Date());
selecteDate(selectedDate);
