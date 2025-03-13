// O(n + m) time complexity
// O(m) -> O(1) space complexity (since ultimately we are only storing chars, limited to 26)
// Time to complete: 10:00 min
//  where n = length of s, m = length of p
// Patterns: Sliding Window + Hashmap
// Notes w.r.t. solution: Added optimizations of counting chars for determining anagram & resetting at invalid chars
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const pCount = {};
  for (const char of p) {
    pCount[char] ??= 0;
    pCount[char] += 1;
  }

  const results = [];
  let sCount = {}
  let matchCount = 0;
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    // Case: Char not valid in anagram
    const charIn = s[i];
    if (!(charIn in pCount)) {
      sCount = {};
      matchCount = 0;
      j = i + 1;
      continue;
    }

    sCount[charIn] ??= 0;
    sCount[charIn] += 1;

    if (sCount[charIn] <= pCount[charIn]) {
      matchCount++;
    }

    // Handle char out when window is full
    const iOut = i - p.length;
    if (j <= iOut) { // Only move char out & update j when window is full
      j++;
      const charOut = s[iOut];

      if (sCount[charOut] <= pCount[charOut]) {
        matchCount--;
      }

      sCount[charOut]--;
      if (sCount[charOut] === 0) {
        delete sCount[charOut];
      }
    }

    if (matchCount === p.length) {
      results.push(iOut + 1);
    }
  }

  return results;
};


// O(n * m) time complexity
// O(m) -> O(1) space complexity (since ultimately we are only storing chars, limited to 26)
// Time to complete: 8:58 min
//  where n = length of s, m = length of p
// Patterns: Sliding Window + Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const pCount = {};
  for (const char of p) {
    pCount[char] ??= 0;
    pCount[char] += 1;
  }

  const results = [];
  const sCount = {}
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    sCount[char] ??= 0;
    sCount[char] += 1;

    if (i >= p.length) {
      sCount[s[i - p.length]] -= 1;
      if (sCount[s[i - p.length]] === 0) {
        delete sCount[s[i - p.length]];
      }
    }

    if (char in pCount) {
      let isAnagram = true;
      for (const [char, count] of Object.entries(pCount)) {
        if (!(char in sCount) || sCount[char] !== pCount[char]) {
          isAnagram = false;
          break;
        }
      }

      if (isAnagram) {
        results.push(i - p.length + 1);
      }
    }
  }

  return results;
};