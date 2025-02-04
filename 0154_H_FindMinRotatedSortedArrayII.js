// 2025/02/04
// O(log(n)) -> O(n) (worst case) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Binary Search
// Notes w.r.t. solution: Worked solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < nums[right]) { // mid in same half as UB, check left
      right = mid;
    } else if (nums[mid] > nums[right]) { // mid in diff half than LB, check right
      left = mid + 1;
    } else { // uncertain, peak could lie in either half
      right--;
    }
  }

  return nums[left];
};

// 2025/02/04
// O() time complexity
// O(1) space complexity
// Time to complete: 27:36 min @ 182/193, then 1:04:41 OT
// Patterns: Binary Search
// Notes w.r.t. solution: It turns out I was VERY close. Should have drawn it out & kept it simple.
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  function findDupBoundary(left, right, dup) {
    // In OT > 27:36 sol
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      // Never move a non-dup edge to be dup
      if (nums[mid] === dup) { // Mid is in dup region
        if (nums[left] === dup) { // search right
          left = mid + 1;
        } else { // search left
          right = mid - 1;
        }
      } else { // Mid is on slope
        if (nums[left] === dup) { // search left
          right = mid - 1;
        } else {  // search right
          left = mid + 1;
        }
      }
    }

    // Result is that either left or right is on dup, but not both
    return nums[left] === dup ? right : left;
  }

  // Check unsorted
  if (nums[0] < nums[nums.length - 1]) {
    return nums[0];
  }

  // find edge of rotated array. Min is to the right
  // since array is in ascending order, this occurs where delta < 0 between 2 numbers
  let minRemoved = Infinity;
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (mid === nums.length - 1) {
      return nums[mid];
    } else if (nums[mid - 1] > nums[mid]) {
      return nums[mid];
    } else if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    }

    if (nums[left] > nums[right] && nums[mid] !== nums[right]) {
      // Check right
      left = mid;
    } else if (nums[left] < nums[right] && nums[left] !== nums[mid]) {
      // Check left
      right = mid - 1;
    } else { // edges are equal
      const dup = nums[left];
      // clip edges
      // right--; // 27:36 solution. All other in this block was after

      // Save min in case min is clipped
      minRemoved = Math.min(minRemoved, dup);

      if (nums[mid] === dup) {
        // contract sides equally - we cannot ensure missing the target
        // once the first edge is found, we can use binary search to find the other faster
        while (nums[left] === dup && nums[right] === dup) {
          left++;
          right--;
        }

        if (nums[left] === dup) {
          left = findDupBoundary(left, right, dup);
        } else {
          right = findDupBoundary(left, right, dup);
        }
      } else {
        left = findDupBoundary(left, mid, dup);
        right = findDupBoundary(mid, right, dup);
      }
    }
  }

  return Math.min(minRemoved, nums[left]);
};