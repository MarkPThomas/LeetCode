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