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

  function dpResults(dropFloor, eggs, floors) { // # moves to determine after each outcome
    return [
      dpBreak(dropFloor, eggs),
      dpSurvive(dropFloor, eggs, floors)
    ];
  }

  function dpBreak(dropFloor, eggs) { // # moves to determine, if egg breaks
    return dp(eggs - 1, dropFloor - 1);
  }

  function dpSurvive(dropFloor, eggs, floors) {   // # moves to determine, if egg survives
    return dp(eggs, floors - dropFloor);
  }

  function dp(eggs, floors) {
    if (eggs in memo && floors in memo[eggs]) {
      return memo[eggs][floors];
    } else if (!(eggs in memo)) {
      memo[eggs] = [];
    }

    if (floors === 0) {
      memo[eggs][floors] = 0;
      return 0;
    } else if (eggs === 1) {
      memo[eggs][floors] = floors;
      return floors;
    }

    // Determine 1-2 best floors to start dropping eggs from
    let minFloor = 1;
    let maxFloor = floors;
    while (maxFloor - minFloor > 1) {
      const dropFloor = minFloor + Math.floor((maxFloor - minFloor) / 2);
      const [breaks, survives] = dpResults(dropFloor, eggs, floors);

      if (breaks < survives) {          // Try higher floor to start
        minFloor = dropFloor;
      } else if (breaks > survives) {   // Try lower floor to start
        maxFloor = dropFloor;
      } else {                          // Floor is at optimal start
        minFloor = dropFloor;
        maxFloor = dropFloor;
      }
    }

    // Check final state of adjacent floors
    const [breaksAtOrBelow, survivesAtOrBelow] = dpResults(minFloor, eggs, floors);
    const [breaksAtOrAbove, survivesAtOrAbove] = dpResults(maxFloor, eggs, floors);

    memo[eggs][floors] =
      1 + Math.max(
        breaksAtOrBelow, survivesAtOrBelow,
        breaksAtOrAbove, survivesAtOrAbove
      );

    return memo[eggs][floors];
  }

  return dp(k, n);
};