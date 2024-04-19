// 2024/04/16
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 6:56 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var isMajorityElement = function (nums, target) {
  if (target < nums[0] || nums[nums.length - 1] < target) {
    return false;
  }

  // Get first occurrence
  let firstOccurrence = -1;
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const mid = Math.floor(start + 0.5 * (end - start));

    if (nums[mid] === target && nums[mid - 1] !== target) {
      firstOccurrence = mid;
      break;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  const lastOccurrence = firstOccurrence + Math.floor(nums.length / 2);

  return nums[lastOccurrence] === target;
};



// 2024/01
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: Too long. Overthought binary search. Doh!
// Patterns: Binary Search
// Notes w.r.t. solution:
//   Brute force is to increment to first occurrence, then check length/2 items ahead.
//   Optimized approach is to find the first occurrence with binary search.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var isMajorityElement202401 = function (nums, target) {
  if (target < nums[0] || nums[nums.length] < target) {
    return false;
  }

  const firstOccurrence = (nums, target) => {
    let start = 0;
    let end = nums.length - 1;
    let index = nums.length;

    while (start <= end) {
      const mid = start + Math.floor((end - start) / 2);

      if (nums[mid] >= target) {
        end = mid - 1;
        index = mid;
      } else {
        start = mid + 1;
      }
    }

    return index;
  }

  const firstIndex = firstOccurrence(nums, target);
  const assumedLastIndex = firstIndex + Math.floor(nums.length / 2);

  return assumedLastIndex < nums.length && nums[assumedLastIndex] === target;
};