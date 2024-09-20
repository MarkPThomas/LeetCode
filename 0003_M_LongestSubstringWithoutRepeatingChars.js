// 2024/09/19
// O(n) time complexity
// O(1) space complexity
// Time to complete: 26:00 min
// Patterns: Hashmap, 2 pointer
// Notes w.r.t. solution:
//   Lost 5 min due to hashmap val = 0 oopsie. Deducted
//   Mostly solved in 16-22 min. Final bit had to do with consideration of idxStart update & length math
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let longestSubstr = 0;
  let idxStart = 0;

  function getLongestSubtrLength(idxCurr) {
    const currSubstrLength = idxCurr - idxStart;
    longestSubstr = Math.max(longestSubstr, currSubstrLength);
  }

  let currSubstr = {}
  for (let i = 0; i < s.length; i++) {
    if (currSubstr[s[i]] !== undefined) {
      getLongestSubtrLength(i);

      if (idxStart <= currSubstr[s[i]]) {
        idxStart = currSubstr[s[i]] + 1;
      }
    }

    currSubstr[s[i]] = i;
  }

  getLongestSubtrLength(s.length);

  return longestSubstr;
};