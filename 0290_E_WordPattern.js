// 2024/04/22
// O(n + m) time complexity
// O(w) space complexity for s being turned into array
// where w = # of words, m = length of pattern, n = total # characters in all words
// Time to complete: 12:23 min
// Patterns: Hash map
// Notes w.r.t. solution:
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const patternKey = {}
  const wordsUsed = {};
  const words = s.split(' ');

  if (words.length !== pattern.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    if (!patternKey[pattern[i]] && !wordsUsed.hasOwnProperty(words[i])) {
      wordsUsed[words[i]] = true;
      patternKey[pattern[i]] = words[i];
    } else if (!patternKey[pattern[i]] && wordsUsed.hasOwnProperty(words[i])) {
      return false;
    }
  }

  for (let i = 0; i < words.length; i++) {
    if (patternKey[pattern[i]] !== words[i]) {
      return false;
    }
  }

  return true;
};


// 2023/06
// O(n) time complexity
// O(n) space complexity for s being turned into array
// where n = length of pattern, or # of words
// Time to complete: 12:00 min
// Patterns: Hash map
// Notes w.r.t. solution:

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) {
    return false;
  }

  const patternToWord = {};
  const wordToPattern = {};
  for (let i = 0; i < pattern.length; i++) {
    let word = words[i];
    if (word === 'constructor') {
      word = 'constructorReservedWord';
    }
    const letter = pattern[i];
    if (!patternToWord[letter] && !wordToPattern[word]) {
      patternToWord[letter] = word;
      wordToPattern[word] = letter;
    } else if (patternToWord[letter] !== word || wordToPattern[word] !== letter) {
      return false;
    }
  }
  return true;
};