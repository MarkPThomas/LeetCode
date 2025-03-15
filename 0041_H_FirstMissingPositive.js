// 2025/03/14
// O(n) time complexity
// O(n) space complexity
// Time to complete: 13:00 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  const positivesUnique = {};
  let min = 2 ^ 31 - 1;
  let max = -2 ^ 31;
  for (const num of nums) {
    if (num > 0) {
      positivesUnique[num] = true;
      min = Math.min(min, num);
      max = Math.max(max, num);
    }
  }

  // Return first before recorded
  if (min > 1) {
    return 1;
  }

  // Return smallest within recorded
  const positives = Object.keys(positivesUnique);
  for (let i = 0; i < positives.length - 1; i++) {
    const positive = Number(positives[i]);
    if (positive + 1 !== Number(positives[i + 1])) {
      return positive + 1;
    }
  }

  // Return first after recorded
  return max + 1;
};