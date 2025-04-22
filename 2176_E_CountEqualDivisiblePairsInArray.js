// 2025/04/20
// O(n) time complexity
// O(n) space complexity
// Time to complete: 11:19 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPairs = function (nums, k) {
  // get numPairs that are =
  // check which of the associated index products are divisible by k

  // For each num, add it's idx in a hashmap under the number
  // For any num after w/ more than 1 idx, see which products are divisible by k
  const matchingNums = {};
  for (let i = 0; i < nums.length; i++) {
    matchingNums[nums[i]] ??= [];
    matchingNums[nums[i]].push(i);
  }

  let numValid = 0;
  for (const indices of Object.values(matchingNums)) {
    for (let i = 0; i < indices.length - 1; i++) {
      for (let j = i + 1; j < indices.length; j++) {
        const product = indices[i] * indices[j];
        if (Math.floor(product / k) === product / k) {
          numValid++;
        }
      }
    }
  }

  return numValid;
};