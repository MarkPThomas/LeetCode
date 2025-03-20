// O(n) time complexity
// O(1) space complexity
// Time to complete: 13:21 min
// Patterns: Two Pointer
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  // Elements at most 2x
  let end = 0;
  let freq = 1;
  for (let next = 0; next < nums.length; next++) {
    // increment next forward & count instances
    if (nums[next] !== nums[next - 1]) {
      freq = 1;
    } else {
      freq++;
    }

    // once we hit a third, set end
    if (freq > 2 && !end) {
      end = next;
    } else if (freq <= 2 && end) {
      // for each additional instance, copy next to end & increment end
      nums[end] = nums[next];
      end++;
    }
  }

  // return # remaining elements
  return end ? end : nums.length;
};