// O(n + k) time complexity
// O(k) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:


// O(n * log(n)) time complexity (for sort)
// O(n) space complexity (for sort)
// Time to complete: 12:20 min
// Patterns: Hash Map, Sorting Algorithms
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  })

  const countsKeys = Object.entries(counts);
  countsKeys.sort((a, b) => a[1] - b[1]);


  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(countsKeys[countsKeys.length - 1 - i][0])
    i++;
  }

  return topKs;
};