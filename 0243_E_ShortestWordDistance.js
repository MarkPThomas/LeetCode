// 2023 Solution - optimized
// O(n * m) time complexity
// O(1) space complexity
// where n = # words in input list, m = total length of input words
// Time to complete: 6 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:
/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestDistance = function (wordsDict, word1, word2) {
  let word1Index = -1;
  let word2Index = -1;
  let minDistance = Infinity;

  function getMinDistance(minDistance, word1Index, word2Index) {
    return (word1Index >= 0 && word2Index >= 0)
      ? Math.min(minDistance, Math.abs(word1Index - word2Index))
      : Infinity;
  }

  for (let i = 0; i < wordsDict.length; i++) {
    const word = wordsDict[i];
    if (word === word1) {
      word1Index = i;
      minDistance = getMinDistance(minDistance, word1Index, word2Index);
    } else if (word === word2) {
      word2Index = i;
      minDistance = getMinDistance(minDistance, word1Index, word2Index);
    }

    if (minDistance === 1) {
      break;
    }
  }

  return minDistance;
};

// 2023 Solution - Brute force, 2 pass
// O(n^2) time complexity
// O(n) space complexity
// where n = # words in input list
// Time to complete: 9 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestDistance = function (wordsDict, word1, word2) {
  let word1Indices = [];
  let word2Indices = [];

  for (let i = 0; i < wordsDict.length; i++) {
    const word = wordsDict[i];
    if (word === word1) {
      word1Indices.push(i);
    } else if (word === word2) {
      word2Indices.push(i)
    }
  }

  if (word1Indices.length === 0 || word2Indices.length === 0) {
    return -1;
  }

  let minDistance = Infinity;
  word1Indices.forEach((word1Index) => {
    word2Indices.forEach((word2Index) => {
      minDistance = Math.min(minDistance, Math.abs(word1Index - word2Index))
    })
  });
  return minDistance;
};

// 2022 Solution
// MIN(O(N) & O(M*L)) time complexity,
// where M + L <= N, N = # words, M = # word1 indices, L = # word2 indices
// M * L = n^2 since M + L = N worst case, so:
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 8:25 min

/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestDistance = function (wordsDict, word1, word2) {
  if (word1 === word2
    || (wordsDict.length < 1 || Math.pow(30, 4) < wordsDict.length)) {
    return 0;
  }

  // get indices for occurrence of word 1
  let word1Indices = [];
  // get indices for occurrence of word 2
  let word2Indices = []
  for (let i = 0; i < wordsDict.length; i++) { // O(N)
    let word = wordsDict[i];
    if (word.length < 1 || 10 < word.length) {
      return 0;
    }
    if (word1 === word) {
      word1Indices.push(i);
    }
    if (word2 === word) {
      word2Indices.push(i);
    }
  }

  if (word1Indices.length === 0 || word2Indices.length === 0) {
    return 0;
  }

  // shortest distance is smalkest difference of indices
  let shortestDistance = Number.POSITIVE_INFINITY;
  // O(M*L)
  for (let i = 0; i < word1Indices.length; i++) { // O(M)
    for (let j = 0; j < word2Indices.length; j++) { // O(L)
      let distance = Math.abs(word1Indices[i] - word2Indices[j]);
      if (distance < shortestDistance) {
        shortestDistance = distance;
      }
    }
  }

  return shortestDistance;
};

const testCases = [
  {
    input: {
      wordsDict: ["practice", "makes", "perfect", "coding", "makes"],
      word1: 'coding',
      word2: 'practice'
    },
    expected: 3
  },
  {
    input: {
      wordsDict: ["practice", "makes", "perfect", "coding", "makes"],
      word1: 'makes',
      word2: 'coding'
    },
    expected: 1
  },
];

testCases.forEach((testCase) => {
  let result = shortestDistance(testCase.input.wordsDict, testCase.input.word1, testCase.input.word2);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);