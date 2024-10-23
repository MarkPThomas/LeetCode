// 2024/10/18
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 10:20/11:38 min
// Patterns: Binary Search
// Notes w.r.t. solution: Solved in 10:20, then added optimizations to shorten counts.
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let left = 1;
  let right = nums.length;
  let duplicate = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    let count = 0;
    let midCount = 0;
    for (const num of nums) {
      if (num <= mid) {
        count++;
        if (count > mid) {
          break;
        }
      }
      if (num === mid) {
        midCount++;
        if (midCount > 1) {
          return num;
        }
      }
    }

    if (count > mid) {
      duplicate = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return duplicate;
};