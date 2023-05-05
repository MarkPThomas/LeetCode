// O(n/2) time complexity
// O(1) space complexity
// Time to complete: 1 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const swap = s[left];
    s[left] = s[right];
    s[right] = swap;
    left++;
    right--;
  }
};