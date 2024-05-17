// O(n) time complexity
// O(n) space complexity
// Time to complete: 2:31 min
// Patterns: Hashmap
// Notes w.r.t. solution: Technically no more space can be allocated, making this a binary problem.
//    That constraint was ignored in my solution :-P
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const freq = {};

  nums.forEach((num) => {
    if (!freq[num]) {
      freq[num] = 0;
    }
    freq[num]++;
  });

  const keys = Object.keys(freq);
  for (let i = 0; i < keys.length; i++) {
    if (freq[keys[i]] === 1) {
      return keys[i];
    }
  }

  return -1;
};