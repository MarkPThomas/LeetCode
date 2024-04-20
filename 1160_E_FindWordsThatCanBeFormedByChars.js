// 2024/04/20
// O(n + m) time complexity
// O(m) -> O(1) space complexity, reduced since only limited # of total chars
// where n = total length of all words, m = length of chars
// Time to complete: 9:00 min
// Patterns: Hash Map
// Notes w.r.t. solution: Finished longer one in 9:31 for experiment. Optimized by 13:02 total.
/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  function isGoodString(word, charsFreq) { // T: O(n)
    for (let i = 0; i < word.length; i++) {
      if (charsFreq[word[i]]) {
        charsFreq[word[i]]--;
      } else {
        return false;
      }
    }

    return true;
  }

  const charsFreq = {}; // S: O(m)
  for (let i = 0; i < chars.length; i++) { // T: O(m)
    if (!charsFreq[chars[i]]) {
      charsFreq[chars[i]] = 0;
    }
    charsFreq[chars[i]]++;
  }

  let sum = 0;
  words.forEach((word) => {  // T: O(n), S: O(m)
    if (word.length <= chars.length && isGoodString(word, { ...charsFreq })) { // T: O(n), S: O(m)
      sum += word.length;
    }
  });

  return sum;
};

/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters2024Experiment = function (words, chars) {
  function isGoodString(word, charsFreq) {
    const wordCharsFreq = {};
    for (let i = 0; i < word.length; i++) {
      if (!wordCharsFreq[word[i]]) {
        wordCharsFreq[word[i]] = 0;
      }
      wordCharsFreq[word[i]]++;
    }

    for (key in wordCharsFreq) {
      if (!charsFreq[key] || wordCharsFreq[key] > charsFreq[key]) {
        return false;
      }
    }
    return true;
  }

  const charsFreq = {}; // S: O(m)
  for (let i = 0; i < chars.length; i++) {
    if (!charsFreq[chars[i]]) {
      charsFreq[chars[i]] = 0;
    }
    charsFreq[chars[i]]++;
  }

  let sum = 0;
  words.forEach((word) => {
    if (isGoodString(word, charsFreq)) {
      sum += word.length;
    }
  });

  return sum;
};

// 2023/05
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
var countCharacters2023 = function (words, chars) {
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