// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:00 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const ranges = [];

  function addRange(rangeStart, rangeEnd) {
    if (rangeEnd === rangeStart) {
      ranges.push(rangeStart.toString());
    } else {
      ranges.push(`${rangeStart}->${rangeEnd}`);
    }
  }

  let rangeStart = nums[0];
  if (nums.length === 1) {
    addRange(rangeStart, rangeStart);
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      const rangeEnd = nums[i - 1];
      addRange(rangeStart, rangeEnd);
      rangeStart = nums[i];
    }
    if (i === nums.length - 1) {
      const rangeEnd = nums[i];
      addRange(rangeStart, rangeEnd);
    }
  }

  return ranges;
};