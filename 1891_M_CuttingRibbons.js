// 2025/05/15
// O(n * log(m)) time complexity
//  m = max value, n = # elements
// O(1) space complexity
// Time to complete: 31:43 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} ribbons
 * @param {number} k
 * @return {number}
 */
var maxLength = function (ribbons, k) {
  // max length x, that occurs k times, w/ or without cutting
  // 1. Guess x - min = 1, max = max # in array
  // 2. Count # ribbons we can get from x
  //  2a. If # > k, try larger x
  //  2b. If # < k, try smaller x
  //  2c. If # === k return x

  function getNumRibbons(x) {
    let numRibbons = 0;

    for (const ribbon of ribbons) {
      numRibbons += Math.floor(ribbon / x);
    }

    return numRibbons;
  }

  let min = 1;
  let max = 0;
  let sum = 0;
  for (const ribbon of ribbons) {
    max = Math.max(max, ribbon);
    sum += ribbon;
  }

  if (sum < k) {
    return 0;
  }

  let maxCuts = 0;
  while (min <= max) {
    const mid = min + Math.floor((max - min) / 2);
    const numRibbons = getNumRibbons(mid);

    if (numRibbons >= k) {
      maxCuts = Math.max(maxCuts, mid);
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return maxCuts;
};