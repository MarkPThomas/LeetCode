// 2024/12/24
// O(n) time complexity
// O(m) -> O(1) space complexity
//  where n = length of s, m = length of possible chars = constant (e.g. 26)
// Time to complete: 30:21 min
// Patterns: Greedy
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  const charRanges = {};
  for (let i = 0; i < s.length; i++) {
    if (!charRanges[s[i]]) {
      charRanges[s[i]] = [i, i]
    } else {
      charRanges[s[i]][1] = i;
    }
  }

  const indices = {};
  for (const [start, end] of Object.values(charRanges)) {
    indices[start] = end;
  }

  const counts = [];
  let countTotal = 0;
  let start = 0;
  let end = indices[start];
  for (let i = 1; i < s.length; i++) {
    if (i > end || end === s.length - 1) {
      const count = end - start + 1;
      counts.push(count);
      countTotal += count;

      if (end === s.length - 1) {
        break;
      }
      start = i;
    }

    if (indices[i]) {
      end = Math.max(end, indices[i]);
    }
  }

  if (countTotal < s.length) {
    counts.push(s.length - countTotal);
  }

  return counts;
};