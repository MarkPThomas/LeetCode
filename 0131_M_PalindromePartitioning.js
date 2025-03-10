// 2025/03/10
// O(n * 2^n) time complexity
// O(n) space complexity
// Time to complete: 6:03 min
// Patterns: Backtracking
// Notes w.r.t. solution: Started solving wrong problem. Peeked at sol for rough idea then solved.
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const pals = [];

  function isPalindrome(s) {
    let low = 0;
    let high = s.length - 1;
    while (low < high) {
      if (s[low] !== s[high]) {
        return false;
      }
      low++;
      high--;
    }
    return true;
  }

  function backtrack(sub, currPalSubs) {
    // Palindromic substrings form complete word
    if (!sub.length) {
      pals.push([...currPalSubs]);
    }

    // From first char working towards end
    for (let i = 0; i < sub.length; i++) {
      const nextSub = sub.substring(0, i + 1);
      if (isPalindrome(nextSub)) {
        currPalSubs.push(nextSub);
        backtrack(sub.substring(i + 1), currPalSubs);
        currPalSubs.pop();
      }
    }
  }

  backtrack(s, []);

  return pals;
};