// 2025/06/07
// O(n) time complexity
// O(n) space complexity
// where n = # chars <= 10 or 11
// Time to complete: 35:48 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const xString = x.toString();
  const result = Array(xString.length);

  let offset = 0;
  if (x < 0) {
    result[0] = '-';
    offset = 1;
  }

  let maxAbsString = null;
  if (xString.length - offset >= 10) {
    maxAbsString = x < 0 ? ((-2) ** 31).toString() : (2 ** 31 - 1).toString();
  }

  let checkOverflow = maxAbsString ? true : false;
  for (let i = xString.length - 1; i >= offset; i--) {
    let idxRev = xString.length - 1 - i + offset;
    result[idxRev] = xString[i];

    if (checkOverflow) {
      if (result[idxRev] > maxAbsString[idxRev]) {
        return 0;
      } else if (result[idxRev] < maxAbsString[idxRev]) {
        checkOverflow = false;
      }
    }
  }

  return Number(result.join(''));
};