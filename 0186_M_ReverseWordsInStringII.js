// 2024/10/03
// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:38 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseWords = function (s) {
  function reverse(start, end) {
    while (start < end) {
      const swap = s[start];
      s[start] = s[end];
      s[end] = swap;

      start++;
      end--;
    }
  }

  // Reverse entire string
  reverse(0, s.length - 1);

  // Word-by-word, reverse the word
  let start = 0;
  for (let i = 0; i <= s.length; i++) {
    if (s[i] === ' ' || i === s.length) {
      reverse(start, i - 1);
      start = i + 1;
    }
  }
};
// 2023/07
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