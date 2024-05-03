// 2024/05/03
// O(n) time complexity
// O(1) space complexity
// Time to complete: 15:00 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Solved in 6:51, debugging added another 10ish min. Error in k calc & edge cases. Slow down!
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let end = nums.length - 1;
  while (nums[end] === val) {
    end--;
  }

  let i = 0;
  while (i < end) {
    if (nums[i] === val) {
      nums[i] = nums[end];
      nums[end] = val;
      while (nums[end] === val) {
        end--;
      }
    }

    i++;
  }

  return end + 1;
};

// 2023/05
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

// 2024/03/01
// O(n) time complexity
// O(1) space complexity
// Time to complete: 18 min + 10 min debugging = 28 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: This solution seems better/easier to read than the 2023 one.
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement20240301 = function (nums, val) {
  let valPtr = nums.length;
  let k = 0;
  for (let i = 0; i < valPtr; i++) {
    if (nums[i] === val) {
      k++;
      valPtr--;
      while (nums[valPtr] === val && valPtr > i) {
        k++;
        valPtr--;
      }
      nums[i] = nums[valPtr];
      nums[valPtr] = val;
    }
  }

  return nums.length - k;
};