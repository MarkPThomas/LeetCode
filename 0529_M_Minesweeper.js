// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: OT min
// Patterns: BFS
// Notes w.r.t. solution: Lost time initially marking squares IP rather than using an auxillary array for visited.
//    Also, for some reason got TLE. Example solution had minor rearrangement that passed in time.
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  const DIRS = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

  const [rowClick, colClick] = click;
  const clickValue = board[rowClick][colClick];

  if (clickValue === 'M') {
    board[rowClick][colClick] = 'X';
  } else if (clickValue === 'E') {
    const visited = Array(board.length).fill().map(() => Array(board[0].length).fill(false));

    let queue = [click];
    while (queue.length) {
      const [row, col] = queue.pop();

      let mines = 0;
      let adjCells = [];
      for (const [deltRow, deltCol] of DIRS) {
        const adjRow = row + deltRow;
        const adjCol = col + deltCol;

        if (adjRow < 0 || board.length <= adjRow
          || adjCol < 0 || board[0].length <= adjCol) {
          continue;
        }

        if (board[adjRow][adjCol] === 'M') {
          mines++;
        } else if (board[adjRow][adjCol] === 'E') {
          adjCells.push([adjRow, adjCol]);
        }
      }

      if (mines) {
        board[row][col] = mines.toString();
      } else {
        board[row][col] = 'B';

        for (const [adjRow, adjCol] of adjCells) {
          if (!visited[adjRow][adjCol]) {
            visited[adjRow][adjCol] = true;
            queue.push([adjRow, adjCol]);
          }
        }
      }
    }
  }

  return board;
};