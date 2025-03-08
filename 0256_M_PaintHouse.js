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
// Notes w.r.t. solution: Bottom-Up
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const numColors = costs[0].length;
  const numHouses = costs.length;
  // States: n houses x 3 colors
  //  1 of 3 colors for each house
  const dp = Array(numHouses).fill().map(() => Array(numColors).fill(Infinity));

  // Base case: 1 house
  for (let color = 0; color < numColors; color++) {
    dp[0][color] = costs[0][color];
  }

  for (let house = 1; house < numHouses; house++) {
    // Basically, for each color used, that color cannot be used immediately again
    dp[house][0] = costs[house][0] + Math.min(dp[house - 1][1], dp[house - 1][2]);
    dp[house][1] = costs[house][1] + Math.min(dp[house - 1][0], dp[house - 1][2]);
    dp[house][2] = costs[house][2] + Math.min(dp[house - 1][0], dp[house - 1][1]);
  }

  return Math.min(...dp[numHouses - 1]);
};



// ===== Worked Solutions =====

// O(n) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-Down
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const numColors = 3;
  const numHouses = costs.length;
  const memo = Array(costs.length).fill().map(() => Array(numColors));

  function paintCost(house, color) {
    // Base case: @ last house, no additional costs to consider
    if (house === numHouses - 1) {
      return costs[house][color];
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

// O(n) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const numColors = costs[0].length;
  const numHouses = costs.length;
  const dp = Array(numHouses).fill().map(() => Array(numColors).fill(Infinity));

  // Base Case: @ 1st house, no prev costs to consider
  for (let color = 0; color < numColors; color++) {
    dp[0][color] = costs[0][color];
  }

  for (let house = 1; house < numHouses; house++) {
    // Basically, for each color used, that color cannot be used immediately again
    dp[house][0] = costs[house][0] + Math.min(dp[house - 1][1], dp[house - 1][2]);
    dp[house][1] = costs[house][1] + Math.min(dp[house - 1][0], dp[house - 1][2]);
    dp[house][2] = costs[house][2] + Math.min(dp[house - 1][0], dp[house - 1][1]);
  }

  return Math.min(...dp[numHouses - 1]);
};

// O(n) time complexity
// O(1) space complexity
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up w/ State Reduction
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  // Base Case: @ 1st house, no prev costs to consider
  let prevHouse = [...costs[0]];

  for (let house = 1; house < costs.length; house++) {
    const nextHouse = [...prevHouse];

    // Basically, for each color used, that color cannot be used immediately again
    nextHouse[0] = costs[house][0] + Math.min(prevHouse[1], prevHouse[2]);
    nextHouse[1] = costs[house][1] + Math.min(prevHouse[0], prevHouse[2]);
    nextHouse[2] = costs[house][2] + Math.min(prevHouse[0], prevHouse[1]);

    prevHouse = nextHouse;
  }

  return Math.min(...prevHouse);
};