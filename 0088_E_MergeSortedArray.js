// O(m+n) time complexity
// O(1) space complexity
// Time to complete: 16 min for main solve, 20:40 for total (a bit too fast again, 99% there, debugging)
// Patterns: Multiple pointers, working from ends forwards
// Notes w.r.t. solution: Got the medium-level solution to the easy problem!

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  // m states the point where nums1 is 0
  // ultimately nums1 has m+n, so last entry is the least of nums1[m] & nums2[n]
  // makes sense to have 3 pointers:
  //      1. num1 @ m, working forwards
  //      2. num2 @ n, working forwards
  //      3. num1 @ end, working forwards
  if (n === 0) {
      return;
  }

  if (m + n === 0) {
      nums1 = nums2;
      return;
  }

  let num1Index = m - 1;
  let num2Index = n - 1;
  let insertIndex = m + n - 1;

  while (insertIndex >= 0 && num1Index >= 0 && num2Index >= 0) { // O(m+n)
      let value1 = nums1[num1Index];
      let value2 = nums2[num2Index];

      if (value1 < value2) {
          nums1[insertIndex] = value2;
          num2Index--;
      } else {
          nums1[insertIndex] = value1;
          num1Index--;
      }
      insertIndex--;
  }
  // if insertIndex reaches beginning, do nothing
  // if nums2 is emptied first, do nothing
  // if nums1 is emptied first, place remaining nums2 in nums1 in order
  while (num2Index >= 0) {  // O(n)
      nums1[insertIndex] = nums2[num2Index];
      num2Index--;
      insertIndex--;
  }
};

// test later
// const testCases = [
// { input: {
//   nums1: [],
//   m: 0,
//   nums2: [],
//   n: 0
//   },
//   expected: ''},
// ];

// testCases.forEach((testCase) => {
//   let result = merge(testCase.input.nums1, testCase.input.m, testCase.input.nums2, testCase.input.n);
//   let pass = result === testCase.expected;
//   console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
//   }
// );