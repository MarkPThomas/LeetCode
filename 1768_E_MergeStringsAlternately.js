// 2024/04/19
// O(m + n) time complexity
// O(m + n) space complexity
// m = length of word1, n = length of word2
// Time to complete: 5:21 min
// Patterns: Array/String, 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const mergedWord = [];

  let i1 = 0;
  let i2 = 0;
  while (i1 < word1.length && i2 < word2.length) {
    mergedWord.push(word1[i1]);
    i1++;

    mergedWord.push(word2[i2]);
    i2++;
  }

  if (word1.length > word2.length) {
    for (let i = word2.length; i < word1.length; i++) {
      mergedWord.push(word1[i]);
    }
  } else if (word2.length > word1.length) {
    for (let i = word1.length; i < word2.length; i++) {
      mergedWord.push(word2[i]);
    }
  }

  return mergedWord.join('');
};

// 2023/05
// O(p) time complexity
// O(m + n) space complexity
// m = length of word1, n = length of word2, p = max(m, n) -> m + n
// Time to complete: 3 min
// Patterns: Array/String
// Notes w.r.t. solution:
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const mergedLetters = [];
  let length = Math.max(word1.length, word2.length);
  for (let i = 0; i < length; i++) {
    if (i < word1.length) {
      mergedLetters.push(word1[i]);
    }
    if (i < word2.length) {
      mergedLetters.push(word2[i]);
    }
  }
  return mergedLetters.join('');
};