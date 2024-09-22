// 2024/09/22
// O(n*c) time complexity
//    where n = # words, c = average word length
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  const map = {};

  for (let i = 0; i < order.length; i++) {
    map[order[i]] = i;
  }

  for (let i = 1; i < words.length; i++) {
    const wordPrev = words[i - 1];
    const wordNext = words[i];
    const length = Math.max(wordPrev.length, wordNext.length);

    for (let j = 0; j < length; j++) {
      const charPrev = wordPrev[j];
      const charNext = wordNext[j];

      const mapPrev = map[charPrev] !== undefined ? map[charPrev] : -1;
      const mapNext = map[charNext] !== undefined ? map[charNext] : -1;

      if (mapPrev > mapNext) {
        return false;
      } else if (mapPrev < mapNext) {
        break;
      }
    }
  }

  return true;
};