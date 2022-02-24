// O() time complexity
// O(1) space complexity
// Time to complete: xx min

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {

};

const testCases = [
{ input: {
  nums1: [],
  m: 0,
  nums2: [],
  n: 0
  },
  expected: ''},
];

testCases.forEach((testCase) => {
  let result = merge(testCase.input.nums1, testCase.input.m, testCase.input.nums2, testCase.input.n);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
  }
);