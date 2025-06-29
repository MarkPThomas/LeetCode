// 2025/06/28
// O(n * log(m)) time complexity
// O(1) space complexity
//  where n = # nums, m = max num
// Time to complete: 14:13 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function (nums, threshold) {
  function getDivSum(div) {
    if (div === 0) {
      return Infinity;
    }

    let divSum = 0;
    for (const num of nums) {
      divSum += Math.ceil(num / div);
    }
    return divSum;
  }

  let min = 0;
  let max = 0;
  for (const num of nums) {
    max = Math.max(max, num);
  }
  while (max - min > 1) {
    const mid = min + Math.floor((max - min) / 2);
    const divSum = getDivSum(mid);

    if (divSum <= threshold) { // decrease mid to increase divSum
      max = mid;
    } else {
      min = mid;
    }
  }

  return max;
};