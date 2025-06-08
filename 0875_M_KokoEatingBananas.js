// 2025/06/08
// O(n * log(m)) time complexity
// O(1) space complexity
//  where n = # piles, m = max # bananas in any of the piles, since n <= h by contraints given
// Time to complete: 12:46 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} piles  // # bananas
 * @param {number} h    // hrs, time limit
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // k = bananas/hr eating speed
  // eats at most piles[i] bananas @ hr i
  // guess k, see how many hrs it takes for k
  // binary search to adjust k
  function timeToEat(k) {
    let time = 0;
    for (const pile of piles) {
      time += Math.ceil(pile / k);
    }

    return time;
  }

  let maxPile = 0;
  for (const pile of piles) {
    maxPile = Math.max(maxPile, pile);
  }

  // min hrs = n, 1 pile per hour, @ k = max pile size
  // max hrs = max of any 1 pile, since h_min = # piles
  let minRate = 1;
  let maxRate = maxPile;
  while (minRate < maxRate) {
    const guessRate = minRate + Math.floor((maxRate - minRate) / 2);
    const hrsNeeded = timeToEat(guessRate);

    if (hrsNeeded > h) { // Must eat faster
      minRate = guessRate + 1;
    } else { // Can eat slower
      maxRate = guessRate;
    }
  }

  return minRate;
};

// 2025/01/22
// O(n * log)(m)) time complexity
// O(1) space complexity
// Time to complete: 38:22 min
// Patterns: Binary Search
// Notes w.r.t. solution: Finished in 16:50, bugs took me the rest. Slow down!
//  Not in a good headspace today anyways. Mistakes were from carelessness rather than a lack of understanding.
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let totalBananas = 0;
  let maxBananasPile = 0;
  for (const pile of piles) {
    maxBananasPile = Math.max(maxBananasPile, pile);
    totalBananas += pile;
  }

  if (h === piles.length) {
    return maxBananasPile;
  }

  let minRate = 1;
  // let minRate = Math.ceil(totalBananas / h);
  let maxRate = maxBananasPile;
  // let maxRate = 10 ** 9;
  while (minRate < maxRate) {
    const guessRate = minRate + Math.floor((maxRate - minRate) / 2);

    // simulate result for guess rate
    let timeToEat = 0;
    for (const bananas of piles) {
      timeToEat += Math.ceil(bananas / guessRate);
    }

    if (timeToEat > h) {
      // eat faster (+1 since min is not valid)
      minRate = guessRate + 1;
    } else {
      // eat slower (no -1 since max is valid but not optimal)
      maxRate = guessRate;
    }
  }

  return minRate;
};