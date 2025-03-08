// 2025/03/07
// O(m * t * n^2) time complexity
// O(t * n) space complexity
//  where m = # houses, n = # colors, t = target # neighborhoods
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-up worked solution w/ state reduction
/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minCost = function (houses, costs, m, n, target) {
  // min cost for each # neighborhoods
  let dpPrev = Array(target + 1).fill().map(    // # Neighborhoods
    () => Array(n).fill(Infinity)           // Color
  );

  // Base Case: 1 house, neighborhoods will be 1
  for (let color = 1; color <= n; color++) {
    if (houses[0] === color) { // House is same color, no cost
      dpPrev[1][color - 1] = 0;
    } else if (houses[0] === 0) { // House is not painted, assign cost
      dpPrev[1][color - 1] = costs[0][color - 1];
    }
  }

  for (let house = 1; house < m; house++) {
    const dp = Array(target + 1).fill().map(    // # Neighborhoods
      () => Array(n).fill(Infinity)           // Color
    );

    for (let hoodCount = 1; hoodCount <= Math.min(target, house + 1); hoodCount++) {
      for (let color = 1; color <= n; color++) {
        if (houses[house] && color !== houses[house]) {
          // House is already painted, of a different color. Nothing to be done
          continue;
        }

        let currMinCost = Infinity;
        // Iterate over all possible colors of prev house
        for (let prevColor = 1; prevColor <= n; prevColor++) {
          if (prevColor !== color) {
            // Prev house has diff color, decrement the neighborhood count
            currMinCost = Math.min(currMinCost, dpPrev[hoodCount - 1][prevColor - 1]);
          } else {
            // Prev house has same color, no change in neighborhood count
            currMinCost = Math.min(currMinCost, dpPrev[hoodCount][prevColor - 1]);
          }
        }

        // If the house is already painted, cost to paint is 0
        const addCost = houses[house] ? 0 : costs[house][color - 1];
        dp[hoodCount][color - 1] = currMinCost + addCost;
      }
    }

    dpPrev = dp;
  }

  const minCost = Math.min(...dpPrev[target]);
  return minCost === Infinity ? -1 : minCost;
};

// 2025/03/07
// O(m * t * n^2) time complexity
// O(m * t * n) space complexity
//  where m = # houses, n = # colors, t = target # neighborhoods
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-up worked solution
/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minCost = function (houses, costs, m, n, target) {
  // min cost for each # neighborhoods
  const dp = Array(m).fill().map(     // House
    () => Array(target + 1).fill().map(   // # Neighborhoods
      () => Array(n).fill(Infinity) // Color
    )
  );

  // Base Case: 1 house, neighborhoods will be 1
  for (let color = 1; color <= n; color++) {
    if (houses[0] === color) { // House is same color, no cost
      dp[0][1][color - 1] = 0;
    } else if (houses[0] === 0) { // House is not painted, assign cost
      dp[0][1][color - 1] = costs[0][color - 1];
    }
  }

  for (let house = 1; house < m; house++) {
    for (let hoodCount = 1; hoodCount <= Math.min(target, house + 1); hoodCount++) {
      for (let color = 1; color <= n; color++) {
        if (houses[house] && color !== houses[house]) {
          // House is already painted, of a different color. Nothing to be done
          continue;
        }

        let currMinCost = Infinity;
        // Iterate over all possible colors of prev house
        for (let prevColor = 1; prevColor <= n; prevColor++) {
          if (prevColor !== color) {
            // Prev house has diff color, decrement the neighborhood count
            currMinCost = Math.min(currMinCost, dp[house - 1][hoodCount - 1][prevColor - 1]);
          } else {
            // Prev house has same color, no change in neighborhood count
            currMinCost = Math.min(currMinCost, dp[house - 1][hoodCount][prevColor - 1]);
          }
        }

        // If the house is already painted, cost to paint is 0
        const addCost = houses[house] ? 0 : costs[house][color - 1];
        dp[house][hoodCount][color - 1] = currMinCost + addCost;
      }
    }
  }

  const minCost = Math.min(...dp[m - 1][target]);
  return minCost === Infinity ? -1 : minCost;
};

// 2025/03/07
// O(m * t * n^2) time complexity
// O(m * t * n) space complexity
//  where m = # houses, n = # colors, t = target # neighborhoods
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-down worked solution
/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minCost = function (houses, costs, m, n, target) {
  // min cost for each # neighborhoods
  const memo = Array(m).fill().map(     // House
    () => Array(target + 1).fill().map(   // # Neighborhoods
      () => Array(n + 1).fill(null) // Color
    )
  );

  function paintCost(house, hoodCount, prevColor) {
    // Base Case: All houses traversed, no additional cost if valid
    if (house === m) {
      return hoodCount === target ? 0 : Infinity;
    }

    // Base Case: Too many neighborhoods
    if (hoodCount > target) {
      return Infinity;
    }

    if (memo[house][hoodCount][prevColor] !== null) {
      return memo[house][hoodCount][prevColor];
    }

    let currMinCost = Infinity;
    if (houses[house]) {
      // House is already painted
      const color = houses[house];
      const newHoodCount = hoodCount + (color !== prevColor ? 1 : 0);
      currMinCost = paintCost(house + 1, newHoodCount, color);
    } else {
      // Get min cost for painting house w/ any color & resulting neighborhood count
      for (let color = 1; color <= n; color++) {
        const newHoodCount = hoodCount + (color !== prevColor ? 1 : 0);
        const minAddCost = paintCost(house + 1, newHoodCount, color);
        const totalCost = costs[house][color - 1] + minAddCost;

        currMinCost = Math.min(currMinCost, totalCost);
      }
    }

    memo[house][hoodCount][prevColor] = currMinCost;
    return currMinCost;
  }

  const minCost = paintCost(0, 0, 0);
  return minCost === Infinity ? -1 : minCost;
};

// 2025/03/06
// O() time complexity
// O() space complexity
// Time to complete: OT (59:00) min
// Patterns: Dynamic Programming
// Notes w.r.t. solution:
/**
 * @param {number[]} houses
 * @param {number[][]} costs
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var mincosts = function (houses, costs, m, n, target) {
  // min costs for each # neighborhoods
  const dp = Array(m + 1).fill().map(     // House
    () => Array(target + 1).fill().map( // # Neighborhoods
      () => Array(n + 1).fill(Infinity)     // Color
    )
  );

  // Base Case: costss nothing to paint for 0 neighborhoods
  for (let house = 0; house <= m; house++) {
    for (let color = 0; color <= n; color++) {
      dp[house][0][color] = 0;
    }
  }

  for (let house = 0; house <= m; house++) {
    //  Case 1. House is painted -> skip
    if (houses[house] !== 0) {
      // costss nothing for houses already painted. Keep costs @ prior house
      for (let color = 1; color <= n; color++) {
        for (let currTarget = 1; currTarget <= target; currTarget++) {
          dp[house][target][color] = dp[house - 1][target][color];
        }
      }
      continue;
    }

    for (let currTarget = 1; currTarget <= target; currTarget++) {
      let sameNeighorhood = true;
      //  Case 2. Same neighborhood -> use prev house's color
      if (sameNeighborhod) {
        const color = houses[house - 1];
        houses[house] = color;
        dp[house][target][color] = dp[house - 1][target][color];
        dp[house][target][color] += costs[house][color - 1];
      } else {
        //  Case 3. Diff neighborhood -> use min color of all but prev
        const colorPrev = houses[house - 1];
        let colorMin = Infinity;
        let costsMin = Infinity;
        for (let color = 1; color <= n; color++) {
          if (color === colorPrev) {
            continue;
          } else if (costs[house][color] < costsMin) {
            costsMin = costs[house][color];
            colorMin = color;
          }
        }

        dp[house][target][colorMin] += costsMin;
      }
    }
  }

  return Math.min(...dp[m][target]);
};