// 2025/01/05
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Worked out solution, mild optimization from answer
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  function expand(left, right) {
    while (0 <= left && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    return { start: left + 1, length: right - left - 1 };
  }

  let palindrome = { start: 0, length: 1 };

  for (let i = 0; i < s.length; i++) {
    const odd = expand(i, i);
    if (odd.length > palindrome.length) {
      palindrome = odd;
    }

    const even = expand(i, i + 1);
    if (even.length > palindrome.length) {
      palindrome = even;
    }
  }

  return s.slice(palindrome.start, palindrome.start + palindrome.length);
};