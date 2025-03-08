// 2025/03/06
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-down worked solution
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const memo = Array(costs.length).fill().map(() => Array(3).fill());

  function paintCost(house, color) {
    // Base case: At last house, no additional costs to consider
    if (house === costs.length - 1) {
      return costs[n][color];
    }

    if (memo[house][color]) {
      return memo[house][color];
    }

    let minAddCost = 0;
    if (color === 0) {
      minAddCost = Math.min(paintCost(house + 1, 1), paintCost(house + 1, 2));
    } else if (color === 1) {
      minAddCost = Math.min(paintCost(house + 1, 0), paintCost(house + 1, 2));
    } else if (color === 2) {
      minAddCost = Math.min(paintCost(house + 1, 0), paintCost(house + 1, 1));
    }

    const currMinCost = costs[house][color] + minAddCost;

    memo[house][color] = currMinCost;
    return currMinCost;
  }

  return Math.min(paintCost(0, 0), paintCost(0, 1), paintCost(0, 2));
};

// 2025/03/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: 34:17 + 3 min (+ for refactoring to reduced state)
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Reduced state from prior solution
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  // States:
  //  1 of 3 colors for each house
  // Basically, for each col of costs, that col cannot be used immediately again
  // Base case: 1st house
  let prevHouse = [...costs[0]];

  for (let house = 1; house < costs.length; house++) {
    const nextHouse = [...prevHouse];

    nextHouse[0] = costs[house][0] + Math.min(prevHouse[1], prevHouse[2]);
    nextHouse[1] = costs[house][1] + Math.min(prevHouse[0], prevHouse[2]);
    nextHouse[2] = costs[house][2] + Math.min(prevHouse[0], prevHouse[1]);

    prevHouse = nextHouse;
  }

  return Math.min(...prevHouse);
};

// 2025/03/05
// O(n) time complexity
// O(n) space complexity
// Time to complete: 34:17 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution:
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  // States: n houses x 3 colors
  //  1 of 3 colors for each house
  const dp = Array(costs.length).fill().map(() => Array(3).fill(Infinity));

  // Base case: 1 house
  for (let i = 0; i < 3; i++) {
    dp[0][i] = costs[0][i];
  }

  for (let house = 1; house < costs.length; house++) {
    // Basically, for each color used, that color cannot be used immediately again
    dp[house][0] = costs[house][0] + Math.min(dp[house - 1][1], dp[house - 1][2]);
    dp[house][1] = costs[house][1] + Math.min(dp[house - 1][0], dp[house - 1][2]);
    dp[house][2] = costs[house][2] + Math.min(dp[house - 1][0], dp[house - 1][1]);
  }

  return Math.min(...dp[costs.length - 1]);
};