// 2024/05/12
// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:33 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  const base = 26;
  let colNumber = 0;

  let power = 0;
  for (let i = columnTitle.length - 1; 0 <= i; i--) {
    const increment = columnTitle.charCodeAt(i) - 'A'.charCodeAt() + 1;

    colNumber += increment * base ** power;
    power++;
  }

  return colNumber;
};


// 2023/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 26 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  let base = 0;
  let colNumber = 0;
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    const charCode = columnTitle.charCodeAt(i) - 'A'.charCodeAt() + 1;
    colNumber += (26 ** base) * charCode;
    base++;
  }
  return colNumber;
};