// 2025/03/06
// O(n * k) time complexity w/ optimization
// O(k) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-down worked solution
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
  const numColors = costs[0].length;
  const numHouses = costs.length;
  const memo = Array(numHouses).fill().map(() => Array(numColors));

  function paintCost(house, color) {
    // Base case: At last house, no additional costs to consider
    if (house === numHouses - 1) {
      return costs[house][color];
    }

    if (memo[house][color]) {
      return memo[house][color];
    }

    let minAddCost = Infinity;
    for (let nextColor = 0; nextColor < numColors; nextColor++) {
      if (color === nextColor) {
        continue; // Skip matching color for adjacent house
      }

      minAddCost = Math.min(minAddCost, paintCost(house + 1, nextColor));
    }

    const currMinCost = costs[house][color] + minAddCost;

    memo[house][color] = currMinCost;
    return currMinCost;
  }

  let minCost = Infinity;
  for (let color = 0; color < numColors; color++) {
    minCost = Math.min(minCost, paintCost(0, color));
  }
  return minCost;
};

// 2025/03/06
// O(n * k) time complexity w/ optimization
// O(k) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Added bottom-up case
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
  // States: n houses x 3 colors
  //  1 of 3 colors for each house
  const dp = Array(costs.length).fill().map(() => Array(costs[0].length).fill(Infinity));

  // Base case: 1 house
  for (let i = 0; i < costs[0].length; i++) {
    dp[0][i] = costs[0][i];
  }

  for (let house = 1; house < costs.length; house++) {
    // Basically, for each color used, that color cannot be used immediately again
    let minPrevColor = Infinity;
    let minPrevCost = Infinity;
    let min2ndPrevCost = Infinity;
    for (let color = 0; color < costs[0].length; color++) {
      if (dp[house - 1][color] < minPrevCost) {
        min2ndPrevCost = minPrevCost;
        minPrevCost = dp[house - 1][color];
        minPrevColor = color;
      } else if (dp[house - 1][color] < min2ndPrevCost) {
        min2ndPrevCost = dp[house - 1][color];
      }
    }

    for (let color = 0; color < costs[0].length; color++) {
      dp[house][color] = costs[house][color] + ((color !== minPrevColor) ? minPrevCost : min2ndPrevCost);
    }
  }

  return Math.min(...dp[costs.length - 1]);
};

// 2025/03/05
// O(n * k) time complexity w/ optimization
// O(k) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Added optimization to prior solution based on editorial hints
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
  // States:
  //  1 of k colors for each house
  // Basically, for each col of costs, that col cannot be used immediately again
  // Base case: 1st house
  let prevHouse = [...costs[0]];

  for (let house = 1; house < costs.length; house++) {
    const nextHouse = [...prevHouse];

    let minPrevColor = Infinity;
    let minPrevCost = Infinity;
    let min2ndPrevCost = Infinity;
    for (let color = 0; color < costs[0].length; color++) {
      if (prevHouse[color] < minPrevCost) {
        min2ndPrevCost = minPrevCost;
        minPrevCost = prevHouse[color];
        minPrevColor = color;
      } else if (prevHouse[color] < min2ndPrevCost) {
        min2ndPrevCost = prevHouse[color];
      }
    }

    for (let color = 0; color < costs[0].length; color++) {
      nextHouse[color] = costs[house][color] + ((color !== minPrevColor) ? minPrevCost : min2ndPrevCost);
    }

    prevHouse = nextHouse;
  }

  return Math.min(...prevHouse);
};

// 2025/03/05
// O(n * k^2) time complexity
// O(k) space complexity
// Time to complete: 45:42 min (37:17 Paint House 1 + 8:25 min refactoring to k states)
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Converted Paint House I reduced state to generic k states
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
  // States:
  //  1 of k colors for each house
  // Basically, for each col of costs, that col cannot be used immediately again
  // Base case: 1st house
  let prevHouse = [...costs[0]];

  for (let house = 1; house < costs.length; house++) {
    const nextHouse = [...prevHouse];

    for (let nextColor = 0; nextColor < costs[0].length; nextColor++) {
      let minPrevCost = Infinity;
      for (let prevColor = 0; prevColor < costs[0].length; prevColor++) {
        if (prevColor !== nextColor) {
          minPrevCost = Math.min(minPrevCost, prevHouse[prevColor]);
        }
      }
      nextHouse[nextColor] = costs[house][nextColor] + minPrevCost;
    }

    prevHouse = nextHouse;
  }

  return Math.min(...prevHouse);
};