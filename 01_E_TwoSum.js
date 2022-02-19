// O(NLog(N)) time complexity
// O(1) space complexity
// Runtime: 132 ms, faster than 44.34% of JavaScript online submissions for Two Sum.
// Memory Usage: 42.5 MB, less than 31.31% of JavaScript online submissions for Two Sum.
// Time to complete: 10 min

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  if (!isWithinValidRangeInclusive(nums.length, 2, Math.pow(10, 4))
    || !isWithinValidRangeInclusive(target, -Math.pow(10, 9), Math.pow(10, 9))) {
      return [];
    }

  const indices = [];

  for (let i = 0; i < nums.length - 1; i++) {
    let firstValue = nums[i];
    if (!isWithinValidRangeInclusive(firstValue, -Math.pow(10, 9), Math.pow(10, 9))) {
      return [];
    }

    for (let j = i + 1; j < nums.length; j++) {
      let secondValue = nums[j];
      if (firstValue + secondValue === target) {
        // check if this is the second valid pair, which is not allowed
        if (indices.length > 0) {
          return [];
        }
        indices[0] = i;
        indices[1] = j;
      }
    }
  }

  return indices;
};

let isWithinValidRangeInclusive = function(value, min, max) {
  return (min <= value && value <= max);
}

const testCases = [
  { input: {
      nums: [2, 7, 11, 15],
      target: 9 },
    expected: [0, 1]},
  { input: {
      nums: [3, 2, 4],
      target: 6 },
    expected: [1, 2]},
  { input: {
      nums: [3, 3],
      target: 6 },
    expected: [0, 1]},
  { input: {
      nums: [2222222, 2222222],
      target: 4444444 },
    expected: [0, 1]},
  ];

  testCases.forEach((testCase) => {
    let result = twoSum(testCase.input.nums, testCase.input.target);
    let pass = result === testCase.expected;
    console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
    }
  );