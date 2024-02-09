// O(n) time complexity
// O(n) space complexity
// where n = # of numbers
// Time to complete: 13 min
// Patterns: Hash map
// Notes w.r.t. solution: Solved in 7 min but was a bit rushed. Took 6 min to debug a small error.

/**
 * @param {number[]} nums
 * @return {number}
 */
var largestUniqueNumber = function (nums) {
  const numCount = [];
  nums.forEach((num) => {
    if (!numCount[num]) {
      numCount[num] = 1;
    } else {
      numCount[num]++;
    }
  });

  let maxNum = -1;
  Object.keys(numCount).forEach((key) => {
    const num = parseInt(key);
    if (numCount[key] === 1 && num > maxNum) {
      maxNum = num;
    }
  });

  return maxNum;
};