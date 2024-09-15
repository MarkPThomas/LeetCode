// 2024/09/15
// O(n * n!) time complexity
// O(n) space complexity
// Time to complete: 15:28 min
// Patterns: Backtracking
// Notes w.r.t. solution: Refactored from recursion solution that took 12:40
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const results = [];

  function backtrack(curr) {
    if (curr.length === nums.length) {
      results.push([...curr]);
      return;
    }

    for (const num of nums) {
      if (!curr.includes(num)) {
        curr.push(num);
        backtrack(curr);
        curr.pop();
      }
    }
  }

  backtrack([]);
  return results;
};

// 2024/09/15
// O(n * n!) time complexity
// O(n) space complexity
// Time to complete: 12:40 min
// Patterns: Recursion
// Notes w.r.t. solution: n cost to copy result array, n! solutions, n depth to recursion stack
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  if (nums.length === 1) {
    return [[nums[0]]];
  }

  const results = [];
  for (let i = 0; i < nums.length; i++) {
    const newNums = nums.toSpliced(i, 1);

    const newResults = permute(newNums);
    for (let j = 0; j < newResults.length; j++) {
      results.push([nums[i], ...newResults[j]]);
    }
  }

  return results;
};