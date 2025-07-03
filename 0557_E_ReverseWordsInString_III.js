// Given a string s, reverse the order of characters in each word within a sentence while still
//    preserving whitespace and initial word order.

// 2024/04/
// O(n) time complexity
// O(1) space complexity
// Time to complete: 13:45 min
// Patterns: Sliding window & 2-pointer
// Notes w.r.t. solution: Would have been 7 min but had some minor debugging errors.
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = s.split('');
  let ptrL = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === ' ' || i === words.length - 1) {
      let ptrR = (i === words.length - 1) ? i : i - 1;
      while (ptrL < ptrR) {
        const temp = words[ptrL];
        words[ptrL] = words[ptrR];
        words[ptrR] = temp;

        ptrL++;
        ptrR--;
      }
      ptrL = i + 1;
    }
  }

  return words.join('');
};

// 2023/04
// O() time complexity
// O(1) space complexity
// Time to complete: 1 min
// Patterns: String & array libraries
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = s.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = [...words[i]].reverse().join('');
  }
  return words.join(' ');
}

// Trying to be smart & avoid libraries. This seems to be more what they were going for.
// O(n) time complexity
// O(1) space complexity (or O(n), depends on if counting space for output counts)
// where n = # characters in string
// Time to complete: 15 min
// Patterns: Sliding window & 2-pointer
// Notes w.r.t. solution: Few more minutes to refactor below to be a bit cleaner
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let indexLastSpace = -1;
  const chars = [...s];
  for (let i = 0; i <= chars.length; i++) {
    if (chars[i] === ' ' || i === chars.length) {
      let indexStart = indexLastSpace + 1;
      let indexEnd = i - 1;
      while (indexStart < indexEnd) {
        const temp = chars[indexStart];
        chars[indexStart] = chars[indexEnd];
        chars[indexEnd] = temp;
        indexStart++;
        indexEnd--;
      }
      indexLastSpace = i;
    }
  }
  return chars.join('');
};

// Trying to be smart & avoid libraries. This seems to be more what they were going for.
// O(n) time complexity
// O(m) space complexity
// where n = # words, m = length of longest word.
// Time to complete: 15 min
// Patterns: Sliding window & 2-pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let indexStart = 0;
  let indexEnd = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ' || i === s.length - 1) {
      indexEnd = (i === s.length - 1) ? i : i - 1;
      s = reverseWord(s, indexStart, indexEnd);
      indexStart = indexEnd + 2;
    }
  }
  return s;
};

function reverseWord(s, left, right) {
  const word = [...s];
  while (left < right) {
    const temp = word[left];
    word[left] = word[right];
    word[right] = temp;
    left++;
    right--;
  }
  return word.join('');
}