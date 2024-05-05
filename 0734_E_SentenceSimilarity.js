// 2024/05/05
// O((p + s) * m) time complexity
// O(p * m) space complexity
//  where s = sentence length, p = pairs length, m = average word length
// Time to complete: 16:30 min - 10:26 min rework to 16:30 min
// Patterns: Hash map
// Notes w.r.t. solution: Problem insufficiently explained.
//    Had to develop w/ trial & error in opaque test cases.
//    Problem should specify in some way that each similarity association is 1:n and NOT 1:1 & bidirectional
/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {
  if (sentence1.length !== sentence2.length) {
    return false;
  }

  const wordMap = {};
  for (const [word1, word2] of similarPairs) {
    if (!wordMap[word1]) {
      wordMap[word1] = {}
    }
    wordMap[word1][word2] = true;
  }

  for (let i = 0; i < sentence1.length; i++) {
    const word1 = sentence1[i];
    const word2 = sentence2[i];

    if (word1 !== word2
      && (!wordMap[word1] || !wordMap[word1][word2])
      && (!wordMap[word2] || !wordMap[word2][word1])) {
      return false;
    }
  }

  return true;
};

// 2024/01/01
// O((s + p) * m) time complexity
// O(p * m) space complexity
//  where s = sentence length, p = pairs length, m = average word length
// Time to complete: 36 min/20 min
// Patterns: Hash map
// Notes w.r.t. solution: Poorly defined problem.
// Wasted most of first 16 min making solutions based on guesses that could only be validated by analyzing failed tests.
// Once I actually knew the full form, was more like 20 min of work.

/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {
  if (sentence1.length !== sentence2.length) {
    return false;
  }

  const pairsMap = [];
  similarPairs.forEach((pair) => {
    if (!pairsMap[pair[0]]) {
      pairsMap[pair[0]] = []
    }
    pairsMap[pair[0]][pair[1]] = true;
  });

  for (let i = 0; i < sentence1.length; i++) {
    if (sentence1[i] === sentence2[i]) {
      continue;
    }

    let pair1 = pairsMap[sentence1[i]] ? pairsMap[sentence1[i]][sentence2[i]] : false;
    let pair2 = pairsMap[sentence2[i]] ? pairsMap[sentence2[i]][sentence1[i]] : false;

    if (!pair1 && !pair2) {
      return false;
    }
  }

  return true;
};