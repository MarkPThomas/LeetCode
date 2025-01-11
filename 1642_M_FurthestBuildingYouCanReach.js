// 2025/01/09
// O(n * log^2(n)) time complexity
// O(n) space complexity
//  where n = # buildings
// Time to complete: xx min
// Patterns: Binary Search
// Notes w.r.t. solution: Worked LeetCode solution.


// 2025/01/09
// O(n * log(n)) time complexity
// O(n) space complexity
//  where n = # buildings
// Time to complete: xx min
// Patterns: Priority Queue (Max)
// Notes w.r.t. solution: W/ Bricks. Worked LeetCode solution.
/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
  const bricksUsed = new PriorityQueue({ compare: (a, b) => b - a });

  for (let i = 0; i < heights.length - 1; i++) {
    const climb = heights[i + 1] - heights[i];

    if (climb <= 0) {
      // Nothing is needed to advance
      continue;
    }

    // Use bricks for climb
    bricksUsed.enqueue(climb);
    bricks -= climb;

    if (bricks < 0) {
      // We are out of bricks & ladders, so are at furthers we can reach
      if (ladders === 0) {
        return i;
      }

      // Not enough bricks. Swap out largest used set w/ a ladder
      bricks += bricksUsed.dequeue();
      ladders--;
    }
  }

  // We reached the end
  return heights.length - 1;
};

// 2024/12/10
// O(n * log(L)) time complexity
// O(L) space complexity
//  where n = # buildings, L = # ladders <= n
// Time to complete: Overtime :-(
// Patterns: Priority Queue (Min)
// Notes w.r.t. solution: W/ Ladders. Was on the right track, but took too long.
//    More careful laying out of strategy in advance would have helped.
//    Also simple code outline before writing full code - would have avoided mistakes from unnecessary complexity/redundancy.
/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
  const laddersUsed = new PriorityQueue({ compare: (a, b) => a - b });

  for (let i = 0; i < heights.length - 1; i++) {
    const climb = heights[i + 1] - heights[i];

    if (climb <= 0) {
      // Nothing is needed to advance
      continue;
    } else if (ladders) {
      // Use ladders if available
      laddersUsed.enqueue(climb);
      ladders--;
    } else {
      // No ladders remaining
      const smallestLadder = laddersUsed.front();
      if (!smallestLadder || climb < smallestLadder) {
        // Use bricks
        bricks -= climb;
      } else {
        // Swap ladder for bricks
        bricks -= laddersUsed.dequeue();
        laddersUsed.enqueue(climb);
      }

      if (bricks < 0) {
        // We didn't have enough bricks to move forward
        return i;
      }
    }
  }

  // We reached the end
  return heights.length - 1;
};