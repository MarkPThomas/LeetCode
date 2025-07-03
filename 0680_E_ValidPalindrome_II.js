// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:00 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Initially lost a lot of time with a minor bug due to if/else statements
//    causing only one viable path to be explored. Calling a function w/ 2 states & 'or' is necessary.
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;

  function checkPalindrome(left, right) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  while (left < right) {
    if (s[left] !== s[right]) {
      return (checkPalindrome(left, right - 1)
        || checkPalindrome(left + 1, right));
    }

    left++;
    right--;
  }

  return true;
};