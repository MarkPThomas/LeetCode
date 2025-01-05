// 2025/01/05
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 30:00 min
// Patterns: BFS
// Notes w.r.t. solution:
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  const MINE = 'M';
  const EXPLODED = 'X';
  const BLANK = 'B';
  const EMPTY = 'E';

  const DIRS = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
  function checkAdj(row, col, visited) {
    const adj = [];
    let numMines = 0;
    for (const [adjRow, adjCol] of DIRS) {
      const nextRow = row + adjRow;
      const nextCol = col + adjCol;

      if (nextRow < 0 || board.length <= nextRow
        || nextCol < 0 || board[0].length < nextCol) {
        continue;
      }

      if (visited && visited[nextRow][nextCol]) {
        continue;
      }

      const adjValue = board[nextRow][nextCol];
      if (adjValue === MINE) {
        numMines++;
      } else if (adjValue === EMPTY) {
        adj.push([nextRow, nextCol]);
      }
    }

    return [numMines, adj];
  }

  const [clickRow, clickCol] = click;
  const clickVal = board[clickRow][clickCol];

  // if click on mine, mark & return
  if (clickVal === MINE) {
    board[clickRow][clickCol] = EXPLODED;
    return board;
  }

  // if already clicked, return
  if (clickVal !== EMPTY) {
    return board;
  }

  // if empty:
  //  if at least 1 adj mine, reveal digit for # adj mines & return
  let [clickNumMines, adj] = checkAdj(clickRow, clickCol);
  if (clickNumMines) {
    board[clickRow][clickCol] = clickNumMines.toString();
    return board;
  }

  //  else, mark B & iterate over all reachable empty squares & return
  board[clickRow][clickCol] = BLANK;

  const visited = Array(board.length).fill().map(() => Array(board[0].length).fill(false));
  visited[clickRow][clickCol] = true;

  while (adj.length) {
    const nextAdj = [];

    while (adj.length) {
      const [row, col] = adj.pop();
      if (visited[row][col]) {
        continue;
      }
      visited[row][col] = true;

      const [numMines, nextEmpty] = checkAdj(row, col, visited);
      if (numMines) {
        board[row][col] = numMines.toString();
        //  if an empty square is adjacent to mines, do not proceed to neighbors after marking mine count
      } else {
        board[row][col] = BLANK;
        nextAdj.push(...nextEmpty);
      }
    }
    adj = nextAdj;
  }


  return board;
};

// 2024/12/19
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