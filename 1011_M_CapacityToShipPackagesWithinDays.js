// 2025/06/02
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 27:36 min
// Patterns: Binary Search
// Notes w.r.t. solution: Mostly solved in 20:13. Had to fine tune binary search details
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  // min weights are 1 each day, w/:
  //  First weight on first day
  //  Last weight on last day
  // Taking more weights increases min ship capacity
  // We can guess a capacity (min is max weight, for max days = # weights)
  //  Attempt to fill each day up to <= capacity
  // Max guess is (lazily) sum of all weights (for min days = 1 day)

  // T: O(n)
  // S: O(1)
  function daysToFillByCapacity(capacityGuess) {
    let daysNeeded = 0;
    let weightIdx = 0;
    while (weightIdx < weights.length) {
      let weightDay = 0;
      while (weightIdx < weights.length
        && weightDay + weights[weightIdx] <= capacityGuess) {

        weightDay += weights[weightIdx];
        weightIdx++;
      }

      daysNeeded++;
    }

    return daysNeeded;
  }

  let weightMax = 0;
  let weightSum = 0;
  for (const weight of weights) {
    weightMax = Math.max(weightMax, weight);
    weightSum += weight;
  }

  let capacityMin = weightMax;
  let capacityMax = weightSum; //Math.floor(weightSum / days);
  while (capacityMin < capacityMax) {
    const capacityGuess = capacityMin + Math.floor((capacityMax - capacityMin) / 2);
    const daysNeeded = daysToFillByCapacity(capacityGuess);

    if (daysNeeded > days) { // increase capacity
      capacityMin = capacityGuess + 1;
    } else if (daysNeeded <= days) { // decrease capacity
      capacityMax = capacityGuess;
    }
  }

  return capacityMin;
};