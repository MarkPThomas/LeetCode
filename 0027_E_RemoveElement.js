// O(n) time complexity
// O(1) space complexity
// Time to complete: 10 min + 15 min (debugging minor issue) = 25 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let lastValIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    if (lastValIndex !== -1 && nums[i] !== val) {
      nums[lastValIndex] = nums[i];
      nums[i] = val;
      lastValIndex++;
      while (nums[lastValIndex] !== val && lastValIndex < nums.length) {
        lastValIndex++;
      }
    } else if (lastValIndex === -1 && nums[i] === val) {
      lastValIndex = i;
    }
  }

  return lastValIndex === -1 ? nums.length : lastValIndex;
};

const testCases = [
  {
    input: [[3, 2, 2, 3], 3],
    expected: 2
  },
  {
    input: [[0, 1, 2, 2, 3, 0, 4, 2], 2],
    expected: 5
  },
];

testCases.forEach((testCase) => {
  let result = removeElement(testCase.input[0], testCase.input[1]);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);