// 2025/04/20
// O(m + n) -> O(n) time complexity
//  where m = s1 length, n = s2 length
// O(1) space complexity
// Time to complete: 14:56 min
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  // check any contigous set of chars in s2 the length of s1
  // if the char counts match those of s1, we have a permutation

  const s1Freqs = {};
  for (const char of s1) {
    s1Freqs[char] ??= 0;
    s1Freqs[char]++;
  }

  let charDiffs = Object.keys(s1Freqs).length;

  const s2Freqs = {};
  for (let i = 0; i < s2.length; i++) {
    // Remove prior char
    if (i >= s1.length) {
      const charLeave = s2[i - s1.length];
      if (s2Freqs[charLeave] === s1Freqs[charLeave]) {
        charDiffs++;
      } else if (s2Freqs[charLeave] === 1 && !(charLeave in s1Freqs)) {
        charDiffs--;
      }

      s2Freqs[charLeave]--;
    }

    // Add next char
    const charNext = s2[i];
    s2Freqs[charNext] ??= 0;
    s2Freqs[charNext]++;

    if (s2Freqs[charNext] === s1Freqs[charNext]) {
      charDiffs--;
    } else if (s2Freqs[charNext] === 1 && !(charNext in s1Freqs)) {
      charDiffs++;
    }

    if (charDiffs === 0) {
      return true;
    }
  }

  return false;
};