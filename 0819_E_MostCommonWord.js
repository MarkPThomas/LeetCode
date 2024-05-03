// 2024/04/30
// O(n + m) time complexity
// O(n + m) space complexity
// where n = # paragraph words, m = # banned words
// Time to complete: 11:14 min
// Patterns: Hashmap, strings
// Notes w.r.t. solution: String BS to work out, unclear setup/examples cost more time not recorded.
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  const bannedWords = {};
  banned.forEach((word) => {
    bannedWords[word] = true;
  });

  const regex1 = /[\']/gi;
  paragraph = paragraph.replaceAll(regex1, '').toLowerCase();

  const regex2 = /[!?,;.]/gi;
  paragraph = paragraph.replaceAll(regex2, ' ').toLowerCase();

  const words = paragraph.split(' ');

  let maxCount = 0;
  const wordFreq = {};

  words.forEach((word) => {
    if (word && !bannedWords[word]) {
      if (!wordFreq[word]) {
        wordFreq[word] = 0;
      }
      wordFreq[word]++;
      maxCount = Math.max(maxCount, wordFreq[word]);
    }
  });

  for ([key, value] of Object.entries(wordFreq)) {
    if (value === maxCount) {
      return key;
    }
  }

  return '';
};