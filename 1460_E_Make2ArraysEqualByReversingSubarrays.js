// 2025/04/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 2:39 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
  const freqs = {};

  for (let i = 0; i < target.length; i++) {
    freqs[target[i]] ??= 0;
    freqs[target[i]]++;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i] in freqs)) {
      return false;
    }

    freqs[arr[i]]--;
    if (freqs[arr[i]] === 0) {
      delete freqs[arr[i]];
    }
  }

  return Object.keys(freqs).length === 0;
};