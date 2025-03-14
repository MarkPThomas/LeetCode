// 2025/03/14
// O(t * 2^n) time complexity
// O(t * n) space complexity
//  where n = # of candidates, t = target
// Time to complete: 7:33 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];

  function backtrack(sum, start, nums) {
    if (sum === target) {
      result.push([...nums]);
      return;
    } else if (sum > target) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const num = candidates[i];
      nums.push(num);
      backtrack(sum + num, i, nums);
      nums.pop();
    }
  }

  backtrack(0, 0, []);

  return result;
};