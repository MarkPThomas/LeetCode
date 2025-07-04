// 2025/07/03
// O(m * n * max(m, n)) time complexity
// O(m * n) space complexity
// Time to complete: 30:47 min
// Patterns: Matrix BFS
// Notes w.r.t. solution:
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
var shortestDistance = function (maze, start, destination) {
  // BFS
  // For each kick, count tiles
  // Maze I went by fewest kicks, so ball immediately went to wall
  // Maze II goes by distance, so make this turn-based, tracking ball position
  // for each turn:
  //      ball has direction & total tile count
  //      ball advances in direction unless wall is next
  //      if wall is next, add all viable directions to kick
  //          this includes excluding the prev direction
  // Visited should still be tracked for each kick position
  const WALL = 1;
  const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  function isInBounds(row, col) {
    return 0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length;
  }

  let count = 0;
  const visited = {};
  let moves = [[start, [0, 0]]];
  while (moves.length) {
    const nextMoves = [];

    for (let i = 0; i < moves.length; i++) {
      const [[row, col], dir] = moves[i];

      const rowRoll = row + dir[0];
      const colRoll = col + dir[1];
      if (!isInBounds(rowRoll, colRoll)
        || maze[rowRoll][colRoll] === WALL
        || (row === start[0] && col === start[1])) { // Ball is stopped

        if (row === destination[0] && col === destination[1]) {
          return count;
        } else if (visited[[row, col]]) {
          continue;
        }
        visited[[row, col]] = true;

        // Kick in all viable directions
        for (const [rowDelt, colDelt] of DIRS) {
          // Ignore prev direction
          if (rowDelt === -dir[0] && colDelt === -dir[1]) {
            continue;
          }

          // Try any other direction, keep only those that aren't blocked by wall
          const rowKick = row + rowDelt;
          const colKick = col + colDelt;
          if (isInBounds(rowKick, colKick) && maze[rowKick][colKick] !== WALL) {
            nextMoves.push([[rowKick, colKick], [rowDelt, colDelt]]);
          }
        }
      } else { // Let ball keep rolling
        nextMoves.push([[rowRoll, colRoll], dir]);
      }
    }

    moves = nextMoves;
    count++;
  }

  return -1;
};