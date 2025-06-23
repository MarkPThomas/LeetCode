// 2025/06/23
// O(n) time complexity
// O(k) space complexity
// Time to complete: 25:13 min
// Patterns: Sliding Window, Hashmap
// Notes w.r.t. solution: Most time was taken up working out subtlety of optimized unique char counting. Slow down!
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numKLenSubstrNoRepeats = function (s, k) {
  // sliding window + hashmap

  let numSub = 0;

  const charFreqs = {};
  let numUnique = 0;
  for (let i = 0; i < s.length; i++) {
    // Remove char
    const charOut = s[i - k];
    if (charOut) {
      if (charFreqs[charOut] === 2) {
        numUnique++;
      } else if (charFreqs[charOut] === 1) {
        numUnique--;
      }
      charFreqs[charOut]--;
    }

    // Add char
    const charIn = s[i];
    if (!charFreqs[charIn] || charFreqs[charIn] === 0) {
      numUnique++;
    } else if (charFreqs[charIn] === 1) {
      numUnique--;
    }
    charFreqs[charIn] = (charFreqs[charIn] ?? 0) + 1;

    // Evaluate window
    if (numUnique === k) {
      numSub++;
    }
  }

  return numSub;
};