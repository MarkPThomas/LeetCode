// 2022/12/??
// Refactored, optimized & simplified solution
// O(n) time complexity
// O(1) space complexity
// Time to complete: 21:00
// Patterns: Greedy?
// Notes w.r.t. solution: Worked out MUCH better by more carefully working out cases carefully
//    for both when to count a plot as valid, and how much to increment (optimization).
//  Looking more carefully I saw opportunities to shorten the code & make it easier to understand
//    by simplifying cases
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let i = 0;
  while (i < flowerbed.length) {
    let emptyPlot = flowerbed[i] === 0;
    let emptyLeftPlot = (i === 0 || flowerbed[i - 1] === 0);
    let emptyRightPlot = (i === flowerbed.length - 1 || flowerbed[i + 1] === 0);
    // Plant flower if plot empty
    if (emptyLeftPlot && emptyPlot && emptyRightPlot) {
      flowerbed[i] = 1;
      n--;
    }

    if (n <= 0) {
      return true;
    }

    // Increment based on plot arrangement
    if (!emptyRightPlot) {
      i += 3;
    } else if (emptyPlot && !emptyLeftPlot) {
      i += 1;
    } else {
      i += 2;
    }
  }
  return false;
};

// 2022/12/??
// Optimized & simplified solution
// O(n) time complexity
// O(1) space complexity
// Time to complete: 21:00
// Patterns: Greedy?
// Notes w.r.t. solution: Worked out MUCH better by more carefully working out cases carefully
//  for both when to count a plot as valid, and how much to increment (optimization)
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  if (n === 0
    || (n === 1 && flowerbed.length === 1 && flowerbed[0] === 0)) {
    return true;
  }

  let i = 0;
  while (i < flowerbed.length) {
    if (i === 0
      && flowerbed[0] === 0
      && flowerbed[1] === 0) {
      // Left edge of flowerbed
      n--;
    } else if (i > flowerbed.length - 3
      && flowerbed[flowerbed.length - 1] === 0
      && flowerbed[flowerbed.length - 2] === 0) {
      // Right edge of flowerbed
      n--;
    } else if (
      flowerbed[i - 1] === 0
      && flowerbed[i] === 0
      && flowerbed[i + 1] === 0) {
      // Inside flowerbed
      n--;
    }

    if (i > 0 && flowerbed[i - 1] === 1) {
      // last plot is filled
      i += 1;
    } else if (i < flowerbed.length - 1 && flowerbed[i + 1] === 1) {
      // next plot is filled
      i += 3;
    } else {
      i += 2;
    }

    if (n === 0) {
      return true;
    }
  }
  return false;
};

// 2022/12/??
// Original solution
// O(n) time complexity
// O(1) space complexity
// Time to complete: 1:14:00 min (ouch!)
// Patterns:
// Notes w.r.t. solution: Wasted time initially solving for case of all new flowers being in a contiguous set.
//    Slow down & read more carefully!
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  if (n === 0
    || (n === 1 && flowerbed.length === 1 && flowerbed[0] === 0)) {
    return true;
  }

  // Handle case of [{1, 0,} 1] for n = 1, multiples of 2
  let emptySpacesNeeded = 2 * n;

  let emptyCount = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      emptyCount++;
      if (emptySpacesNeeded === 1) {
        return true;
      }
    } else {
      emptyCount = 0;
      // Handle case of [1, {0, 1, 0,} 1] for n = 1, multiples of 2
      if (emptySpacesNeeded % 2 === 0) {
        emptySpacesNeeded += 1;
      }
    }

    if (emptyCount > 1 && emptyCount % 2 === 0 && emptySpacesNeeded % 2 === 0) {
      // case adjacent to beginning of bed, before any filled space is encountered
      emptySpacesNeeded -= 2;
      emptyCount = 0;
    } else if (emptyCount > 2 && emptyCount % 2 !== 0) {
      // cases after first filled space encountered
      if (emptySpacesNeeded === 3) {
        // last empty space
        return true;
      } else {
        // intermediate empty space
        emptySpacesNeeded -= 2;
        emptyCount -= 2;
      }
    } else if (i === flowerbed.length - 1 && emptyCount === emptySpacesNeeded - 1) {
      // last empty space, at end of flower bed
      return true;
    }

    if (emptySpacesNeeded === 0) {
      return true;
    }
  }

  return false;
};