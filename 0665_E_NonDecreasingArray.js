// 2024/10/10
// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:23 min (after 46 min aborted run)
// Patterns: Greedy
// Notes w.r.t. solution: Was a bit too fast in implementation & corrections, rather than thinking it through.
//      Also modifying array (since allowed) made things simpler.
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function (nums) {
  let hasSkipped = false;
  for (let i = 0; i < nums.length; i++) {
    let prev = nums[i - 1];
    let curr = nums[i];
    let next = nums[i + 1];

    if (curr > next) {
      if (hasSkipped) {
        return false;
      }
      hasSkipped = true;

      if (prev !== undefined && prev > next) {
        nums[i + 1] = curr;
      } else {
        nums[i] = next;
      }
    }
  }

  return true;
};

// 2023/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: 38 min
// Patterns: Greedy
// Notes w.r.t. solution: Was a bit too fast in implementation & corrections, rather than thinking it through.
//      Also modifying array (since allowed) made things simpler.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function (nums) {
  if (nums.length < 2) {
    return true;
  }

  let decreasingCount = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      decreasingCount++;
      if (decreasingCount === 1) {
        if (i < nums.length - 1 && nums[i - 1] > nums[i + 1]) {
          nums[i - 1] = nums[i];
          if (1 < i && nums[i - 1] < nums[i - 2]) {
            return false;
          }
        } else {
          nums[i] = nums[i - 1];
        }
      } else if (decreasingCount > 1) {
        return false;
      }
    }
  }
  return true;
};