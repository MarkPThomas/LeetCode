// Manually
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10 min
// Patterns: Reverse reversals
// Notes w.r.t. solution:
//    Could do 2 passes:
//      1. Reverse entire string (while removing extra spaces)
//      2. Reverse each word
//    Below uses 1 pass, with smaller 2nd passes as an inner loop reversing the reversed words as we go
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const chars = [...s];
  let reversedWords = '';
  let currentWord = [];
  for (let i = s.length - 1; i >= 0; i--) {
    const char = chars[i];
    if (char !== ' ') {
      currentWord.push(char);
    }

    if (i === 0 || (char === ' ' && currentWord.length)) {
      reversedWords += ' ';
      for (let j = currentWord.length - 1; j >= 0; j--) {
        reversedWords += currentWord[j];
      }
      currentWord = [];
    }
  }
  return reversedWords.trim();
};

// Using libraries
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3 min
// Patterns: Libraries :-P
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = s.split(' ');
  let reversedWords = '';
  for (let i = words.length - 1; i >= 0; i--) {
    const word = words[i];
    if (word.trim()) {
      reversedWords += ` ${word}`;
    }
  }

  return reversedWords.trim();
};
