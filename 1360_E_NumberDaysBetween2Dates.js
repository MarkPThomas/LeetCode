// 2024/09/21
// O(1) time complexity
// O(1) space complexity
// Time to complete: 16:35 min
// Patterns:
// Notes w.r.t. solution: Got held up on leap years calc. Had to stop & look it up.
/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
var daysBetweenDates = function (date1, date2) {

  function daysSince1971(date) {
    const datePieces = date.split('-');
    const year = parseInt(datePieces[0]);
    const month = parseInt(datePieces[1]);
    const day = parseInt(datePieces[2]);

    return daysFromYear(year) + daysFromMonth(month, year) + day;
  }

  function daysFromYear(year) {
    let days = 0;
    for (let i = 1971; i < year; i++) {
      days += isALeapYear(i) ? 366 : 365;
    }

    return days;
  }

  function daysFromMonth(month, year) {
    const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let daysFromMonths = 0;
    for (let i = 1; i < month; i++) {
      daysFromMonths += monthDays[i];
    }

    if (isALeapYear(year) && 2 < month) {
      daysFromMonths += 1;
    }

    return daysFromMonths;
  }

  function isALeapYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0)
      || year % 400 === 0);
  }

  return Math.abs(daysSince1971(date1) - daysSince1971(date2));
};