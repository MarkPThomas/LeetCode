// 2024/04/28
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:47 min
// Patterns: Hashmap
// Notes w.r.t. solution: Would have been faster but messed of for of loop & switched to more verbose form.
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const freq = {};
  arr.forEach((num) => {
    if (!freq[num]) {
      freq[num] = 0;
    }

    freq[num]++;
  });

  const numOccur = {};
  const keys = Object.keys(freq);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = freq[key];

    if (!numOccur[value]) {
      numOccur[value] = key;
    } else {
      return false;
    }
  }

  return true;
};

// 2023/05
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