// 2025/06/14
// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:36 min
// Patterns: Greedy
// Notes w.r.t. solution: Spent 17:32 doing wrong strategy. Solving naiive solution gave me the insight needeed.
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {
  function swap(i, j) {
    const swap = nums[i];
    nums[i] = nums[j];
    nums[j] = swap;
  }

  for (let i = 0; i < nums.length - 1; i++) {
    if (i % 2) { // odd indices are higher than neighbors
      if (nums[i - 1] <= nums[i] && nums[i] < nums[i + 1]) {
        swap(i, i + 1);
      }
    } else {   // even indices are lower than neighbors
      if ((i === 0 || nums[i - 1] >= nums[i]) && nums[i] > nums[i + 1]) {
        swap(i, i + 1);
      }
    }
  }
};

// 2025/06/14
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 6:05 min
// Patterns: Greedy, Sorting
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {
  function swapWithNext(i) {
    const swap = nums[i];
    nums[i] = nums[i + 1];
    nums[i + 1] = swap;
  }

  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if ((i % 2 && nums[i] < nums[i + 1])             // Swap if odd idx & lower than next
      || (i % 2 === 0 && nums[i] > nums[i + 1])) { // Swap if even idx & greater than next
      swapWithNext(i);
    }
  }
};