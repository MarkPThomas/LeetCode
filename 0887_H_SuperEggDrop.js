// 2025/07/16
// O(k * log(n)) time complexity
// O(k * n) space complexity
// Time to complete: 59:37 min @ 71/121
// Patterns: Dynamic Programming, Binary Search
// Notes w.r.t. solution:
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function (k, n) {
  // base case:
  //  n = 1, if egg breaks, return true (egg breaks), else return false => return 1 decision
  //  k = 0, no more eggs left => no decisions can be made, retur 0
  // in true cases, egg can be re-used
  // in false cases, egg is lost (i.e. k - 1)
  // Brute force:
  //  Try each floor, from ground up (so n - 1)
  //  Decision is egg breaks (k_2 = k - 1) or egg doesn't break (k_2 = k)
  //  Returns moves_2 + 1, for each additional move working back up from results
  //      i.e. 1 move has either break/no break outcome
  // Optimize: Somehow do this with binary search on floors instead of with each floor
  //  Try doubling each floor until break, then half the difference of last delta working down & up

  const memo = []; // Array(k + 1).fill().map(() => Array(n + 1).fill(Infinity));

  function dp(k, minFloor, maxFloor) {
    if (maxFloor < minFloor) {
      return 0;   // No more drops can be done, we have converged to the correct floor
    } else if (k === 0) {
      return -Infinity;   // No more eggs left to drop but we are not done
    }
    // } else if (minFloor === maxFloor) { // We
    //     return 1;
    // }

    const dropFloor = minFloor + Math.floor((maxFloor - minFloor) / 2);
    if (k in memo && dropFloor in memo[k]) {
      return memo[k][dropFloor];
    } else if (!(k in memo)) {
      memo[k] = [];
    }

    const eggBreaks = dp(k - 1, minFloor, dropFloor - 1); // Try lower floor, minus 1 egg
    const eggSurvives = dp(k, dropFloor + 1, maxFloor);   // Try higher floor, with all eggs remaining
    memo[k][dropFloor] = Math.max(eggBreaks, eggSurvives) + 1;

    return memo[k][dropFloor];
  }

  return dp(k, 1, n);
};

// ===== Solution =====
// O(k * n * log(n)) time complexity
// O(k * n) space complexity
// Patterns: Dynamic Programming, Binary Search
// Notes w.r.t. solution:
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function (k, n) {
  const memo = [];

  function dp(numEggs, numFloors) {
    if (numEggs in memo && numFloors in memo[numEggs]) {
      return memo[numEggs][numFloors];
    } else if (!(numEggs in memo)) {
      memo[numEggs] = [];
    }

    if (numFloors === 0) {
      memo[numEggs][numFloors] = 0;
      return 0;
    } else if (numEggs === 1) {
      memo[numEggs][numFloors] = numFloors;
      return numFloors;
    }

    let minFloor = 1;
    let maxFloor = numFloors;
    while (maxFloor - minFloor > 1) {
      const dropFloor = minFloor + Math.floor((maxFloor - minFloor) / 2);
      const eggBreaks = dp(numEggs - 1, dropFloor - 1);         // Try lower floor, minus 1 egg
      const eggSurvives = dp(numEggs, numFloors - dropFloor);   // Try higher floor, with all eggs remaining

      if (eggBreaks < eggSurvives) {          // Try higher floor
        minFloor = dropFloor;
      } else if (eggBreaks > eggSurvives) {   // Try lower floor
        maxFloor = dropFloor;
      } else {                                // Same difference moving up or down
        minFloor = dropFloor;
        maxFloor = dropFloor;
      }
    }

    const eggBreaksMinFloor = dp(numEggs - 1, minFloor - 1);         // Try lower floor, minus 1 egg
    const eggSurvivesMinFloor = dp(numEggs, numFloors - minFloor);   // Try higher floor, with all eggs remaining
    const minMovesMinFloor = Math.max(eggBreaksMinFloor, eggSurvivesMinFloor);

    const eggBreaksMaxFloor = dp(numEggs - 1, maxFloor - 1);         // Try lower floor, minus 1 egg
    const eggSurvivesMaxFloor = dp(numEggs, numFloors - maxFloor);   // Try higher floor, with all eggs remaining
    const minMovesMaxFloor = Math.max(eggBreaksMaxFloor, eggSurvivesMaxFloor);

    memo[numEggs][numFloors] = Math.min(minMovesMinFloor, minMovesMaxFloor) + 1;
    return memo[numEggs][numFloors];
  }

  return dp(k, n);
};