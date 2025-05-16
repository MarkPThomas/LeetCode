// 2025/05/16
// O(n) time complexity
// O(1) space complexity
// Time to complete: OT (20:55 min @ 10/46, 23:53 min to finish)
// Patterns: Greedy
// Notes w.r.t. solution: After reading solution to get general idea. My solution was close!
//    If I had taken the Hard time limit (sounds like it should be Hard) & simplified, I would have gotten this. 23:53 min.
/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var numSubarrayBoundedMax = function (nums, left, right) {
  function numSubarrayLessOrEqual(limit) {
    let totalCount = 0;
    let currCount = 0;
    for (let i = 0; i < nums.length; i++) {
      currCount = nums[i] <= limit ? currCount + 1 : 0;
      totalCount += currCount;
    }

    return totalCount;
  }

  // return (all <= right) - (all < left)
  return numSubarrayLessOrEqual(right) - numSubarrayLessOrEqual(left - 1);
};

// 2025/05/16
// O() time complexity
// O(1) space complexity
// Time to complete: OT (20:55 min @ 10/46, 29:50 @ 13/46)
// Patterns: 2 Pointer, Greedy
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var numSubarrayBoundedMax = function (nums, left, right) {
  // min is each # that is in inclusive bounds
  // Any additional subarrays must include these
  // any #s not max that are less than left can only be included in a separate larger array

  // for each # in inclusive bounds
  // start incrementing/counting
  //      += (j - i) + 1, where i is start, j is curr #
  function isInRange(max) {
    return left <= max && max <= right;
  }

  let numVals = 0;

  let first = 0;
  while (first < nums.length) {
    if (isInRange(nums[first])) {
      // Count all possible subarrays until max is too high
      let last = first;
      while (last < nums.length && nums[last] <= right) {
        numVals += last - first + 1
        last++;
      }


      while (first < last) {
        first++;

        // Subtract all possible subarrays that
        //  do not start with a high enough max
        if (nums[first] < left) {
          const firstInvalidMax = first;
          while (first < last && nums[first] < left) {
            numVals -= first - firstInvalidMax + 1
            first++;
          }
        }
      }
    } else {
      first++;
    }
  }

  return numVals;
};