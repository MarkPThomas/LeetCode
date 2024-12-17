// 2024/12/16
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 18:37/OT min
// Patterns: BFS
// Notes w.r.t. solution: I went to OT debugging.
//  I was close, but missed using a 2D 'reachable' matrix instead of visited hashmaps + overlapping leaf nodes.
//  Reading the problem a bit closer (reachable cells) & starting a tad slower would have helped.
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

  function getNeighbors([row, col], reachable, neighbors) {
    for (const [deltaRow, deltaCol] of DIRS) {
      const nextRow = row + deltaRow;
      const nextCol = col + deltaCol;

      if (nextRow < 0 || heights.length <= nextRow
        || nextCol < 0 || heights[0].length <= nextCol) {
        continue;
      }

      if (!reachable[nextRow][nextCol] && heights[nextRow][nextCol] >= heights[row][col]) {
        neighbors.push([nextRow, nextCol]);
      }
    }
  }

  function getReachable(cells) {
    const reachable = Array(heights.length).fill().map(() => Array(heights[0].length).fill(false));

    while (cells.length) {
      const nextCells = [];
      for (let i = 0; i < cells.length; i++) {
        reachable[cells[i][0]][cells[i][1]] = true;
        getNeighbors(cells[i], reachable, nextCells);
      }

      cells = nextCells;
    }

    return reachable;
  }

  const pacific = [];
  const atlantic = [];

  for (let row = 0; row < heights.length; row++) {
    pacific.push([row, 0]);
    atlantic.push([row, heights[0].length - 1]);
  }

  for (let col = 0; col < heights[0].length; col++) {
    pacific.push([0, col]);
    atlantic.push([heights.length - 1, col]);
  }

  const pacificReachable = getReachable(pacific);
  const atlanticReachable = getReachable(atlantic);

  const common = []
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      if (pacificReachable[row][col] && atlanticReachable[row][col]) {
        common.push([row, col]);
      }
    }
  }

  return common;
};