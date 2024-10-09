// 2024/10/08
// O(n * w) time complexity
// O(n * w) space complexity
//  where n = # words,
//    w = average word length
// Time to complete: 13:53 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {
  const shiftCodes = {};
  for (const string of strings) {
    let shifts = [];
    for (let i = 0; i < string.length; i++) {
      let shift = string[i].charCodeAt() - string[0].charCodeAt();
      if (shift < 0) {
        shift = 26 + shift;
      }
      shifts.push(shift);
    }

    const shiftCode = shifts.join(',');
    if (!shiftCodes[shiftCode]) {
      shiftCodes[shiftCode] = [];
    }
    shiftCodes[shiftCode].push(string);
  }

  return Object.values(shiftCodes);
};