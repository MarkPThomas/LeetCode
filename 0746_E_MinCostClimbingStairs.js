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
