// 2024/04/19
// O(n) time complexity
// O(n) space complexity
// where n = # of numbers
// Time to complete: 5:54 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const numsFreq = {};
  for (let i = 1; i <= nums.length; i++) {
    numsFreq[i] = true;
  }

  nums.forEach((num) => {
    delete numsFreq[num];
  });

  return Object.keys(numsFreq);
};



// 2023/05
// O(n) time complexity
// O(n) space complexity
// Time to complete: 4 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const numsMissing = {};
  for (let i = 1; i <= nums.length; i++) {
    numsMissing[i] = true;
  }

  for (let i = 0; i < nums.length; i++) {
    if (numsMissing[nums[i]]) {
      delete numsMissing[nums[i]];
    }
  }
  return Object.keys(numsMissing);
};