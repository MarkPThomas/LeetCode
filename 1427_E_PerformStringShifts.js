// O(n * l) time complexity
// O(l) space complexity
// where n = # of shift entries, l = length of string
// Time to complete: 20:05 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
var stringShift = function (s, shift) {
  let result = s;
  shift.forEach((item) => {
    let wrappedShift = item[1] % s.length;
    if (wrappedShift === 0) {
      wrappedShift = s.length;
    }
    const shiftStart = item[0] === 0 ? wrappedShift : s.length - wrappedShift;

    // ==== Note, the following can be replaced with
    let stringAppend = '';
    let stringKeep = '';
    for (let i = 0; i < result.length; i++) {
      if (i < shiftStart) {
        stringAppend += result[i];
      } else {
        stringKeep += result[i];
      }
    }

    result = stringKeep + stringAppend;
    // === Replaced with below, although complexities are the same
    // result = result.substring(shiftStart) + result.substring(0, shiftStart);
  });
  return result;
};