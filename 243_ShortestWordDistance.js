// MIN(O(N) & O(M*L)) time complexity, where M + L <= N, N = # words, M = # word1 indices, L = # word2 indices
// O(1) space complexity
// Time to complete: 8:25 min

/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var shortestDistance = function(wordsDict, word1, word2) {
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
{ input: {
  wordsDict: ["practice", "makes", "perfect", "coding", "makes"],
    word1: 'coding',
    word2: 'practice'
  },
  expected: 3},
{ input: {
  wordsDict: ["practice", "makes", "perfect", "coding", "makes"],
    word1: 'makes',
    word2: 'coding'
  },
  expected: 1},
];

testCases.forEach((testCase) => {
  let result = shortestDistance(testCase.input.wordsDict, testCase.input.word1, testCase.input.word2);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
  }
);