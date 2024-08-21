// 2024/08/21
// O(n + m) time complexity
// O(1) space complexity
// where n = length of jewels, m = length of stones
// Time to complete: 5:29 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  const jewelsMap = {};

  for (let i = 0; i < jewels.length; i++) {
    const jewel = jewels[i];
    if (!jewelsMap[jewel]) {
      jewelsMap[jewel] = true;
    }
  }

  let numberOfJewels = 0;
  for (let i = 0; i < stones.length; i++) {
    if (jewelsMap[stones[i]]) {
      numberOfJewels++;
    }
  }

  return numberOfJewels;
};