// 2025/05/31
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:21 min
// Patterns: Counting
// Notes w.r.t. solution:
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function (s1, s2) {
  // true if strings equal (swap char w/ itself)
  // true if at most 2 chars are out of place (swap 2 chars)
  // true if 2 chars out of place equal other string @ swap position

  // mismatch char idx
  const swapIdxs = [];
  for (let i = 0; i < s2.length; i++) {
    if (s2[i] !== s1[i]) {
      swapIdxs.push(i);
      if (swapIdxs.length > 2) { // more than 1 swap is needed
        return false;
      }
    }
  }

  if (swapIdxs.length === 1) { // strings unequal but no swap can be made
    return false;
  } else if (!swapIdxs.length) { // strings are equal
    return true;
  }

  const idx1 = swapIdxs[0];
  const idx2 = swapIdxs[1];
  return s1[idx1] === s2[idx2] && s1[idx2] === s2[idx1];
};