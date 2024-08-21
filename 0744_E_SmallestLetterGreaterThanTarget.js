// 2024/08/21
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 11:11 min
// Patterns: Binary Search
// Notes w.r.t. solution:

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  let result = letters[0];

  let left = 0;
  let right = letters.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid + 1 < letters.length && letters[mid] <= target && target < letters[mid + 1]) {
      return letters[mid + 1];
    } else if (0 < mid && letters[mid - 1] <= target && target < letters[mid]) {
      return letters[mid];
    } else if (letters[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};