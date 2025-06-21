// 2025/06/21
// O(n * 3^(n / 7) + n * log(n)) time complexity
// O(n) space complexity
//  where n = length of s
// Time to complete: 18:45 min
// Patterns: Backtracking
// Notes w.r.t. solution: Would have solved much faster, but minor bug took me a while to work out. Slow down!
/**
 * @param {string} s
 * @return {string[]}
 */
var expand = function (s) {
  // step through chars
  // { means to collect all next chars to }
  // go through each {} char, one at a time (i or j or k, etc.)
  // other chars go i & j & k
  const OPEN = '{';
  const CLOSE = '}';
  const SEPARATOR = ',';

  const results = [];
  function backtrack(idx, result) {
    if (s[idx] === undefined) {
      results.push(result.join(''));
      return;
    }

    if (s[idx] === OPEN) {
      let idxClose = idx;
      while (s[idxClose] !== CLOSE) {
        idxClose++;
      }

      for (let idxOpt = idx + 1; idxOpt < idxClose; idxOpt++) {
        if (s[idxOpt] !== SEPARATOR) {
          result.push(s[idxOpt]);
          backtrack(idxClose + 1, result);
          result.pop();
        }
      }
    } else {
      result.push(s[idx]);
      backtrack(idx + 1, result);
      result.pop();
    }
  }

  backtrack(0, []);
  return results.sort();
};