// O(n + m) time complexity
// O(m) -> O(1) space complexity
// where n = total length of all words, m = length of chars
// Time to complete: 12 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  const charsMap = {}; // S: O(m)
  for (let i = 0; i < chars.length; i++) { // T: O(m)
    const char = chars[i];
    if (!charsMap[char]) {
      charsMap[char] = 0;
    }
    charsMap[char]++;
  }

  let sumOfGoodLengths = 0;
  words.forEach((word) => {// T: O(n + m)
    if (word.length <= chars.length) {
      const charsMapCopy = { ...charsMap };
      let isGoodWord = true;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!charsMapCopy[char]) {
          isGoodWord = false;
          break;
        }
        charsMapCopy[char]--;
        if (charsMapCopy[char] === 0) {
          delete charsMapCopy[char];
        }
      }
      if (isGoodWord) {
        sumOfGoodLengths += word.length;
      }
    }
  });

  return sumOfGoodLengths;
};