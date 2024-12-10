// 2024/12/10
// O(n * log(L)) time complexity
// O(L) space complexity
//  where n = # buildings, L = # ladders <= n
// Time to complete: Overtime :-(
// Patterns: Priority Queue
// Notes w.r.t. solution:
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