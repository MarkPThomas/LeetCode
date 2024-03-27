// 2024/03/23
// O(n) time complexity
// O(1) space complexity ignoring output
// Time to complete: 11:42 min
// Patterns: Interval
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const ranges = [];
  if (nums.length === 0) {
    return ranges;
  }

  let numA = nums[0];
  let numB = numA;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] + 1) {
      const result = numB !== numA ? `${numA}->${numB}` : numA.toString();
      ranges.push(result);

      numA = nums[i];
      numB = numA;
    } else {
      numB = nums[i];
    }
  }
  console.log('numB', numB)
  const result = numB !== numA ? `${numA}->${numB}` : numB.toString();
  ranges.push(result);

  return ranges;
};


// 2023/06
// O(n) time complexity
// O(1) space complexity ignoring output
// Time to complete: 17:00 min
// Patterns: Interval
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