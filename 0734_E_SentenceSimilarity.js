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