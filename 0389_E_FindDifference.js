// 2024/05/05
// O(n + m) -> O(n) time complexity since m = n + 1
// O(n) -> O(1) space complexity since alphabet has 26 characters
// where n = length of string s, m = length of string t
// Time to complete: 4:19 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  const freq = {};
  for (let i = 0; i < s.length; i++) {
    if (!freq[s[i]]) {
      freq[s[i]] = 0;
    }
    freq[s[i]]++;
  }

  for (let i = 0; i < t.length; i++) {
    if (!freq[t[i]]) {
      return t[i];
    }
    freq[t[i]]--;

    if (freq[t[i]] === 0) {
      delete freq[t[i]];
    }
  }

  return '';
};