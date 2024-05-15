// 2024/05/15
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6:59 min
// Patterns: Recursion
// Notes w.r.t. solution: Just as an exercise on recursion. This is a bad way to solve this one! :-P
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  function reverse(s, start) {
    if (start === s.length) {
      return [];
    }

    const reversed = reverse(s, start + 1);
    reversed.push(s[start]);

    return reversed;
  }

  const reversed = reverse(s, 0);
  for (let i = 0; i < s.length; i++) {
    s[i] = reversed[i];
  }
};


// 2024/04/20
// O(n/2) time complexity
// O(1) space complexity
// Time to complete: 1:00 min
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
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;

    left++;
    right--;
  }
};

// 2023/04
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