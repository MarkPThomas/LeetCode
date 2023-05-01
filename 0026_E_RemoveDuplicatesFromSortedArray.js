// 2023 Solution
// O(n) time complexity
// O(1) space complexity
// where n = length of the input numbers
// Time to complete: 12 min + 3 min debugging = 15 min
// Patterns: 2 pointers, runner technique
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let insertIndex = 1;
    for (let currIndex = 1; currIndex < nums.length; currIndex++) {
        const lastNum = nums[currIndex - 1];
        const currNum = nums[currIndex];

        if (lastNum !== currNum) {
            nums[insertIndex] = currNum;
            insertIndex++;
        }
    }

    return insertIndex;
};

// 2022 Solution
// O(N) time complexity
// O(1) space complexity
// Time to complete: 18:53 min - lost some time due to not reading the instructions carefully enough
// Patterns: Two-pointers, Runner Technique
// Notes w.r.t. solution: With some rearrangement of some code, I could simplify my solution a bit, but complexity remains the same,.

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums.length < 1 || Math.pow(30, 4) < nums.length) {
        return 0;
    }

    if (nums.length === 1) {
        return 1;
    }

    let insertionIndex = 0;
    let hasRepeatingNumbers = false;
    if (nums[0] < -100 || 100 < nums[0]) {
        return 0;
    }

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < -100 || 100 < nums[i]) {
            return 0;
        }

        if (nums[i] === nums[i - 1] && !hasRepeatingNumbers) {
            // number is duplicate
            insertionIndex = i;
            hasRepeatingNumbers = true;
        } else if (hasRepeatingNumbers && nums[i] !== nums[i - 1]) {
            nums[insertionIndex] = nums[i];
            insertionIndex++;
        }
    }

    return hasRepeatingNumbers ? insertionIndex : nums.length;
};

// TODO: Add tests later? Expand to compare arrays
// Validate returned length k & matching first k entries in array

// const testCases = [
// { input: '',
//   expected: ''},
// ];

// Example 1:

// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).
// Example 2:

// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Also:
// [],
// [1]
// [1,2]

// // assert k == expectedNums.length;
// // for (int i = 0; i < k; i++) {
// //     assert nums[i] == expectedNums[i];
// // }

// testCases.forEach((testCase) => {
//   let result = removeDuplicates(testCase.input);
//   let pass = result === testCase.expected;
//   console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
//   }
// );