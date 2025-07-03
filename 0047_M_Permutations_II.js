// 2025/04/17
// O(sum( P(n,k) ) = sum( n! / (n - k)! ) ) time complexity
// O(n) space complexity
//  where n = length of nums, k = current recursion depth ranging from 1 to n
// Time to complete: 16:42 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  // backtracking
  // end @ nums length
  // separately track idxs used at each recursion level
  // separately track num vals used at each recursion level
  // at each recursion level, use all idxs except those marked as visited

  const idxVisited = new Set();
  const permutations = [];

  function backtrack(permutation) {
    if (permutation.length === nums.length) {
      permutations.push([...permutation]);
      return;
    }

    const numUsed = new Set();
    for (let i = 0; i < nums.length; i++) {
      if (idxVisited.has(i)) {
        continue;
      }

      const num = nums[i];
      if (numUsed.has(num)) {
        continue;
      } else {
        numUsed.add(num);
      }

      idxVisited.add(i);
      permutation.push(num);

      backtrack(permutation, idxVisited);

      permutation.pop();
      idxVisited.delete(i);
    }
  }

  backtrack([]);

  return permutations;
};