// 2025/02/06
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 18:14 min
// Patterns: BFS
// Notes w.r.t. solution: Note - visited MUST be marked when enqueued, NOT dequeued.
//  This small speed improvement is the difference between TLE & passing. :-P
/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function (maze, entrance) {
  const WALL = '+';
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

  const visited = {};
  const queue = new Queue();
  queue.enqueue([entrance, 0]);
  visited[entrance] = true;

  while (queue.size()) {
    const [[row, col], dist] = queue.dequeue();

    for (const [deltaRow, deltaCol] of DIRS) {
      const nextRow = row + deltaRow;
      const nextCol = col + deltaCol;

      if ([nextRow, nextCol] in visited) {
        continue;
      }

      // Skip OOB
      if (!maze[nextRow] || !maze[nextRow][nextCol]) {
        if (dist) {
          return dist;
        }
      } else if (maze[nextRow][nextCol] !== WALL) {
        queue.enqueue([[nextRow, nextCol], dist + 1]);
        visited[[nextRow, nextCol]] = true;
      }
    }
  }

  return -1;
};