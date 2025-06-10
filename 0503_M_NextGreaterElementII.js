// 2025/06/10
// O(n) time complexity
// O(n) space complexity
// Time to complete: 15:36 min
// Patterns: Monotonic Stack
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  // brute force just looks in either direction/wrap around
  // could get sorted list of unique nums & check in list
  //  max #s are -1, all others have a nextGreater
  // could do monotonic stack while doing this?
  // just wrap array & do 2 traverses

  const greaterElms = [];
  const nextGreaterElms = new Array(nums.length);

  function updateNextGreaterElements() {
    for (let i = nums.length - 1; i >= 0; i--) {
      while (greaterElms.length && nums[i] >= greaterElms[greaterElms.length - 1]) {
        greaterElms.pop();
      }

      if (nums[i] < greaterElms[greaterElms.length - 1]) {
        nextGreaterElms[i] = greaterElms[greaterElms.length - 1];
      } else {
        nextGreaterElms[i] = -1;
      }

      greaterElms.push(nums[i]);
    }
  }

  updateNextGreaterElements();
  updateNextGreaterElements();

  return nextGreaterElms;
};