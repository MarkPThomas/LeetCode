// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:00 min
// Patterns: Hashmap
// Notes w.r.t. solution:

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const numOccurrencesByNum = {};
  arr.forEach((num) => {
    if (!numOccurrencesByNum[num]) {
      numOccurrencesByNum[num] = 0;
    }
    numOccurrencesByNum[num]++;
  });

  const numOccurrences = {};
  const keys = Object.keys(numOccurrencesByNum);
  for (key of keys) {
    const occurrence = numOccurrencesByNum[key];
    if (numOccurrences[occurrence]) {
      return false;
    }
    numOccurrences[occurrence] = true;
  }
  return true;
};