// 2024/11/12
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 27:54 min
// Patterns: BFS
// Notes w.r.t. solution: Solved in 23:48, but had bugs:
//  Forgot to check out of bounds
//  Forgot I had to process as queue - even without data structure, use array swap & for loop reference to mimic
//  Forgot to check visited in processing IN ADDITION TO adding to queue in case a redundant tile is in the queue,
//    in order to preserve BFS property of first arrival is shortest path
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function (rooms) {
  const EMPTY = 2147483647;
  const GATE = 0;

  function addNeighbors(row, col, neighbors) {
    const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    for (const [deltRow, deltCol] of DIRS) {
      const nextRow = row + deltRow;
      const nextCol = col + deltCol;

      if (nextRow < 0 || rooms.length <= nextRow
        || nextCol < 0 || rooms[0].length <= nextCol) {
        continue;
      }

      if (rooms[nextRow][nextCol] === EMPTY) {
        neighbors.push([nextRow, nextCol]);
      }
    }
  }

  // Find all gates
  const gates = [];
  for (let row = 0; row < rooms.length; row++) {
    for (let col = 0; col < rooms[0].length; col++) {
      if (rooms[row][col] === GATE) {
        gates.push([row, col]);
      }
    }
  }

  // Starting from each gate
  let emptyRooms = [];
  for (const [row, col] of gates) {
    addNeighbors(row, col, emptyRooms);
  }

  //  BFS outwards
  //  Stop when a visited square has been reached, or no other valid tiles remain
  let dist = 1;
  while (emptyRooms.length) {
    const nextEmptyRooms = [];
    for (let i = 0; i < emptyRooms.length; i++) {
      const [row, col] = emptyRooms[i];

      if (rooms[row][col] !== EMPTY) {
        continue;
      }

      // Mark each valid tile with the BFS step
      rooms[row][col] = dist;

      // Get neighboring tiles for next step
      addNeighbors(row, col, nextEmptyRooms);
    }

    dist++;
    emptyRooms = nextEmptyRooms;
  }
};