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

    for (let nextColor = 0; nextColor < costs[0].length; nextColor++) {
      nextHouse[nextColor] = costs[house][nextColor]
        + ((nextColor !== minPrevColor) ? minPrevCost : min2ndPrevCost);
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