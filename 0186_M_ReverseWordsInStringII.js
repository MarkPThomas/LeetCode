// O(n) time complexity
// O(1) space complexity
// Time to complete: 6 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseWords = function (s) {
  // 1. Reverse entire string
  let left = 0;
  let right = s.length - 1;
  swap(s, left, right);

  // 2. Reverse individual words
  let indexLastSpace = -1;
  for (let i = 0; i <= s.length; i++) {
    const char = s[i];
    if (char === ' ' || i === s.length) {
      swap(s, indexLastSpace + 1, i - 1);
      indexLastSpace = i;
    }
  }

  function swap(s, left, right) {
    while (left < right) {
      const swap = s[left];
      s[left] = s[right]
      s[right] = swap;
      left++;
      right--;
    }
  }
};