// 2025/07/08
// O(n * log(S/(k + 1))) time complexity
// O(1) space complexity
//  where n = # pieces, S = sum of sweetness
// Time to complete: OT 1:10:02 -> 15:13 min
// Patterns: Binary Search
// Notes w.r.t. solution: 15:13 is after reading editorial but not looking at code solution.
/**
 * @param {number[]} sweetness // sweetness of each chunk
 * @param {number} k # cuts, can span consecutive chunks, => k + 1 pieces, but only in whole piece increments
 * @return {number}
 */
var maximizeSweetness = function (sweetness, k) {
  const numPeople = k + 1;

  function getMaxMinSum(min, max) {
    while (max - min > 1) {
      const mid = min + Math.floor((max - min) / 2);

      if (minSumIsValid(mid)) { // try larger minSum
        min = mid;
      } else {
        max = mid;
      }
    }

    return min; // The largest valid minSum
  }

  function minSumIsValid(targetSweetness) {
    let numChunks = 1;
    let currSum = 0;
    let minCurrSum = Infinity;

    for (let piece = 0; piece < sweetness.length; piece++) {
      currSum += sweetness[piece];
      if (currSum >= targetSweetness && numChunks < numPeople) {  // Reset for next piece
        minCurrSum = Math.min(minCurrSum, currSum);
        currSum = 0;
        numChunks++;
      }
    }
    minCurrSum = Math.min(minCurrSum, currSum); // Last piece

    return numChunks >= numPeople              // Everyone gets a chunks
      && minCurrSum >= targetSweetness;   // That is at least as sweet as the target min
  }

  const minSweetness = Math.min(...sweetness);
  const totalSweetness = sweetness.reduce((acc, curr) => acc + curr);
  const avgSweetness = Math.floor(totalSweetness / numPeople);

  return getMaxMinSum(minSweetness, avgSweetness + 1);
};