// 2024/12/09
// O(n) time complexity
// O(n) space complexity
// Time to complete: 28:35 min
// Patterns: DP, Top-down/tabulation/interative, State Reduction
// Notes w.r.t. solution: Time is total to prev solution & then refactoring state reduction.
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let prevStair2 = 0;
  let prevStair1 = 0;

  for (let i = 0; i < cost.length; i++) {
    const currStair = cost[i] + Math.min(prevStair1, prevStair2);
    prevStair2 = prevStair1;
    prevStair1 = currStair;
  }

  return Math.min(prevStair1, prevStair2);
};


// 2024/12/09
// O(n) time complexity
// O(n) space complexity
// Time to complete: 25:53 min
// Patterns: DP, Top-down/tabulation/interative
// Notes w.r.t. solution: Lost time not thinking carefully at first.
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const minCosts = Array(cost.length).fill(Infinity);
  minCosts[0] = cost[0];
  minCosts[1] = cost[1];

  for (let i = 0; i < cost.length; i++) {
    minCosts[i] = cost[i] + Math.min(minCosts[i - 1], minCosts[i - 2]);
  }

  return Math.min(minCosts[minCosts.length - 1], minCosts[minCosts.length - 2]);
};

// 2024/09/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 18:37 min
// Patterns: DP, Top-down/tabulation/interative
// Notes w.r.t. solution: Lost time not thinking carefully at first.
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  if (!cost.length) {
    return 0;
  }

  const minCosts = [];
  if (cost.length > 0) {
    minCosts.push(cost[0]);
  }
  if (cost.length > 1) {
    minCosts.push(cost[1]);
  }

  for (let i = 2; i < cost.length; i++) {
    minCosts.push(Math.min(minCosts[i - 1], minCosts[i - 2]) + cost[i]);
  }
  minCosts.push(Math.min(minCosts[minCosts.length - 1], minCosts[minCosts.length - 2]));

  return minCosts[minCosts.length - 1];
};
