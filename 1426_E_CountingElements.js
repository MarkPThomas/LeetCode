// O(n) time complexity
// O(n) space complexity
// Time to complete: 8:55 min
// Patterns: Hash map
// Notes w.r.t. solution:

/**
 * @param {number[]} arr
 * @return {number}
 */
var countElements = function (arr) {
  let plusOnes = [];

  arr.forEach((num) => {
    const numPlusOne = num + 1;
    if (!plusOnes[numPlusOne]) {
      plusOnes[numPlusOne] = 1;
    } else {
      plusOnes[numPlusOne]++;
    }
  });

  let plusOnesCount = 0;
  arr.forEach((num) => {
    if (plusOnes[num]) {
      plusOnesCount += plusOnes[num];
      delete plusOnes[num];
    }
  });

  return plusOnesCount;
};