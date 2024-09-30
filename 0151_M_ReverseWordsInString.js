// 2024/09/30
// O(n) time complexity
// O(n) space complexity
// Time to complete: 14:47 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Beware substr() vs. substring().
//    substr() is deprecated, but also signature is different - NOT startI, endI (noninclusive)
//    Also, empty chars are not nullable, only no chars
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = [];
  let startChar = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      if (s[startChar] !== ' ') {
        const substring = s.substring(startChar, i);
        if (substring !== ' ') {
          words.push(substring);
        }
      }
      startChar = i + 1;
      continue;
    }
  }

  if (startChar !== s.length) {
    words.push(s.substring(startChar, s.length));
  }

  let left = 0;
  let right = words.length - 1;
  while (left < right) {
    if (!words[left]) {
      left++;
      continue;
    }
    if (!words[right]) {
      right--;
      continue;
    }

    const swap = words[left];
    words[left] = words[right];
    words[right] = swap;

    left++;
    right--;
  }

  return words.join(' ');
};

// 2023/04
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
