// 2024/04/23
// O(m * n) time complexity
// O(1) space complexity
// where m is the array length & n is the length of the shortest word
// Time to complete: 6:43 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let prefixChars = [];

  let i = 0;
  while (i < strs[0].length) {
    let sampleChar = strs[0][i];
    let charIsValid = true;
    for (let j = 0; j < strs.length; j++) {
      charIsValid = sampleChar === strs[j][i];
      if (!charIsValid) {
        break;
      }
    }

    if (charIsValid) {
      prefixChars.push(sampleChar);
    } else {
      break;
    }

    i++;
  }


  return prefixChars.join('');
};

// 2022
// O(m*n) time complexity where m is the array length & n is the length of the shortest word
// O(1) space complexity
// Time to complete: 6.5 min 1st, 9.5 min error handling, 13.5 min total
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!isValidLengthInclusive(strs.length, 1, 200)) {
    return '';
  }

  if (!isValidLengthInclusive(strs[0].length, 0, 200)) {
    return '';
  }

  let prefix = '';
  let currentCharIndex = 0;
  while (strs[0][currentCharIndex]) {
    let currentChar = strs[0][currentCharIndex];
    for (let i = 1; i < strs.length; i++) {
      if (!isValidLengthInclusive(strs[i].length, 0, 200)) {
        return '';
      }
      // stop if at end of shortest word, or at first nonmatching char
      if (!strs[i][currentCharIndex]
        || currentChar !== strs[i][currentCharIndex]) {
        return prefix;
      }
    }
    prefix += currentChar;
    currentCharIndex++;
  }
  return prefix;
};

let isValidLengthInclusive = function (value, min, max) {
  return (min <= value && value <= max);
};

const testCases = [
  {
    input: ["flower", "flow", "flight"],
    expected: 'fl'
  },
  {
    input: ["dog", "racecar", "car"],
    expected: ''
  },
  {
    input: ["cir", "car"],
    expected: 'c'
  },
];



testCases.forEach((testCase) => {
  let result = longestCommonPrefix(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);