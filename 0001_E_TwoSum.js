// 2024/03/12
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 13:32 min
// Patterns: 2 ptrs
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const numsSorted = [...nums].sort((a, b) => a - b);

  let low = 0;
  let high = nums.length - 1;
  while (numsSorted[low] + numsSorted[high] !== target && low < high) {
    if (numsSorted[low] + numsSorted[high] > target) {
      high--;
    } else if (numsSorted[low] + numsSorted[high] < target) {
      low++;
    }
  }

  let lowResult = -1;
  let highResult = -1;
  for (let i = 0; i < nums.length; i++) {
    if (lowResult === -1 && nums[i] === numsSorted[low]) {
      lowResult = i;
    } else if (highResult === -1 && nums[i] === numsSorted[high]) {
      highResult = i
    }

    if (lowResult !== -1 && highResult !== -1) {
      break;
    }
  }


  return [lowResult, highResult];
};


// 2023/05
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 22 min (17 to solve, 5 to debug)
// Patterns: 2 pointers
// Notes w.r.t. solution: Can also do as T: O(n) with a 2-pass or 1-pass w/ Hash table to record indices
//    & check if 'remainder = target - current' has already been encountered
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2023_05 = function (nums, target) {
  const sortedNums = [...nums].sort((a, b) => a - b);
  let ptrLow = 0;
  let ptrHigh = sortedNums.length - 1;
  while (sortedNums[ptrLow] + sortedNums[ptrHigh] > target) {
    ptrHigh--;
  }

  while (sortedNums[ptrLow] + sortedNums[ptrHigh] < target) {
    ptrLow++;
  }

  while (ptrLow < ptrHigh) {
    let sum = sortedNums[ptrLow] + sortedNums[ptrHigh];
    if (sum === target) {
      break;
    } else if (sum < target) {
      ptrLow++;
    } else if (sum > target) {
      ptrHigh--;
    }
  }

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === sortedNums[ptrLow] || nums[i] === sortedNums[ptrHigh]) {
      result.push(i);
      if (result.length === 2) {
        break;
      }
    }
  }

  return result;
};


// 2022
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 10 min

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2022 = function (nums, target) {
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

let isWithinValidRangeInclusive = function (value, min, max) {
  return (min <= value && value <= max);
}

const testCases = [
  {
    input: {
      nums: [2, 7, 11, 15],
      target: 9
    },
    expected: [0, 1]
  },
  {
    input: {
      nums: [3, 2, 4],
      target: 6
    },
    expected: [1, 2]
  },
  {
    input: {
      nums: [3, 3],
      target: 6
    },
    expected: [0, 1]
  },
  {
    input: {
      nums: [2222222, 2222222],
      target: 4444444
    },
    expected: [0, 1]
  },
];

testCases.forEach((testCase) => {
  let result = twoSum(testCase.input.nums, testCase.input.target);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);