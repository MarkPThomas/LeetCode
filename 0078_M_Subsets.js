// 2025/03/06
// O(n * 2^n) time complexity
// O(n) space complexity
// Time to complete: 11:39 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const results = [[]];

  function backtrack(start, subset) {
    for (let i = start; i < nums.length; i++) {
      subset.push(nums[i]);
      results.push([...subset]);

      backtrack(i + 1, subset);

      subset.pop();
    }
  }

  backtrack(0, []);
  return results;
};

// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const results = [];

  function backtrack(first, curr) {
    results.push([...curr]);

    for (let i = first; i < nums.length; i++) {
      curr.push(nums[i]);
      backtrack(i + 1, curr);
      curr.pop();
    }
  }

  backtrack(0, []);

  return results;
};