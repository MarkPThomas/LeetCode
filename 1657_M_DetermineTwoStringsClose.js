// 2025/02/05
// O(n) time complexity
// O(1) space complexity
//
// Time to complete: +5:00 min from prev for refactoring
// Patterns: Hashmap
// Notes w.r.t. solution: Refactored prev solution
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }

  const counts1 = {};
  const chars1 = new Set();
  for (const char1 of word1) {
    chars1.add(char1);

    counts1[char1] ??= 0;
    counts1[char1]++;
  }

  const counts2 = {};
  for (const char2 of word2) {
    // Ensure all chars of word 1 are in word 2
    if (!chars1.has(char2)) {
      return false;
    }

    counts2[char2] ??= 0;
    counts2[char2]++;
  }

  const counts = {};
  for (const count1 of Object.values(counts1)) {
    counts[count1] ??= 0;
    counts[count1]++;
  }

  // Ensure equal counts of = or diff chars in word 1 vs. word 2
  for (const count2 of Object.values(counts2)) {
    if (!(count2 in counts)) {
      return false;
    }

    counts[count2]--;
    if (!counts[count2]) {
      delete counts[count2];
    }
  }

  return !Object.keys(counts).length;
};

// 2025/02/05
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 40:46 min (after hint @ 33:19 min)
// Patterns: Hashmap
// Notes w.r.t. solution: Was at 147/169 @ 11:43 min. Missed subtle spec in problem statement that changes are only within a string, NOT between, so I was
//  mapping chars of 1 to the other, when in fact all letters of 1 should be present in the other. Doh!
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }

  const charCounts1 = {};
  const charCounts2 = {};
  for (let i = 0; i < word1.length; i++) {

    charCounts1[word1[i]] ??= 0;
    charCounts1[word1[i]]++;

    charCounts2[word2[i]] ??= 0;
    charCounts2[word2[i]]++;
  }


  const chars1 = Object.keys(charCounts1);
  const counts1 = Object.values(charCounts1).sort((a, b) => a - b);
  const counts2 = Object.values(charCounts2).sort((a, b) => a - b);

  for (let i = 0; i < chars1.length; i++) {
    if (counts1[i] !== counts2[i] || !(chars1[i] in charCounts2)) {
      return false;
    }
  }

  return true;
};