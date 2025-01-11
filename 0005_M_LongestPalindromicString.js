// 2025/01/11
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 22:49 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // is palindrome if mid - offset = mid + offset
  // from base case, odd/even treated the same & palindrome check naturally grows out

  // states: mid, offset
  // base cases:
  //  odd - check starts at mid = mid
  //  even, check starts at mid = mid + 1
  //  min palindrome = 1 for any char

  function longestAt(mid, offset) {
    let left = mid;
    let right = mid + offset;

    let length = 1;
    if (s[left] !== s[right]) {
      return [left, length];
    }
    length += offset;

    while (0 <= left && right < s.length && s[left] === s[right]) {
      left--;
      right++;
      length += 2;
    }

    return [left + 1, length - 2];
  }

  let longest = 1;
  let left = 0;

  for (let mid = 0; mid < s.length; mid++) {
    const [oddLeft, oddLength] = longestAt(mid, 0);
    if (oddLength > longest) {
      longest = oddLength;
      left = oddLeft;
    }

    const [evenLeft, evenLength] = longestAt(mid, 1);
    if (evenLength > longest) {
      longest = evenLength;
      left = evenLeft;
    }
  }

  return s.substring(left, left + longest);
};

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