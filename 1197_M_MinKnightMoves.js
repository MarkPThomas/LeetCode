// 2025/06/19
// O(x + y) time complexity
// O(1) space complexity
// Time to complete: OT 1:20:58 min @ 14/45
// Patterns: Graph BFS
// Notes w.r.t. solution: Close, but a little off. Will look at solution. Probably a little wrong on when to switch to BFS?
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var minKnightMoves = function (x, y) {
  // Move on ortho delta until hit 45 deg intercept (within +/- 1?)
  function moveOrthoX(xPiece, yPiece, x, y) {
    const intercept = x - Math.abs(y);
    const xSign = x < 0 ? -1 : 1;
    let yDelt = 1;

    let steps = 0;
    while (Math.abs(xPiece) < intercept - 1) {
      xPiece += xSign * 2;
      yPiece += yDelt;
      yDelt = yDelt < 0 ? 1 : -1; // Alternate y delt
      steps++;
    }

    return [steps, xPiece];
  }

  function moveOrthoY(xPiece, yPiece, x, y) {
    return moveOrthoX(yPiece, xPiece, y, x);
  }

  // Move on 45 deg ray (within abs delta 4)
  function moveDiag(xPiece, yPiece, x, y) {
    // alt [2, 1], [1, 2]
    // use x/y signs of x, y
    const signX = x < 0 ? -1 : 1;
    const signY = y < 0 ? -1 : 1;
    let twiceX = true;
    let steps = 0;
    while (Math.abs(x - xPiece) > 4 && Math.abs(y - yPiece) > 4) {
      if (twiceX) {
        xPiece += signX * 2;
        yPiece += signY * 1;
      } else {
        xPiece += signX * 1;
        yPiece += signY * 2;
      }

      twiceX = !twiceX;
      steps++;
    }

    return [steps, xPiece, yPiece];
  }

  let stepsOrtho = 0;
  let xOrtho = 0;
  let yOrtho = 0;
  if (Math.abs(x) > Math.abs(y)) {        // Move on x-axis
    [stepsOrtho, xOrtho] = moveOrthoX(0, 0, x, y);
  } else if (Math.abs(x) < Math.abs(y)) { // Move on y-axis
    [stepsOrtho, yOrtho] = moveOrthoY(0, 0, x, y);
  }
  const [stepsDiag, xDiag, yDiag] = moveDiag(xOrtho, yOrtho, x, y);
  let steps = stepsOrtho + stepsDiag;

  // Once within abs delta 4, do local BFS
  const DIRS = [
    [-2, -1], [-2, 1], [2, -1], [2, 1],
    [-1, -2], [-1, 2], [1, -2], [1, 2]
  ];

  // only allow deltas in correct quadrant direction
  function isInBounds(row, col) {
    if (x < 0 && y < 0) { // --
      return row <= 1 && col <= 1;
    } else if (x < 0) {   // -+
      return row <= 1 && col >= -1;
    } else if (y < 0) {   // +-
      return row >= -1 && col <= 1;
    } else {              // ++
      return row >= -1 && col >= -1;
    }
  }

  const visited = {};
  visited[[xDiag, yDiag]];

  let moves = [[xDiag, yDiag]];
  while (moves.length) {
    const nextMoves = [];
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      if (move[0] === x && move[1] === y) {
        return steps;
      }

      for (const dir of DIRS) {
        const nextX = move[0] + dir[0];
        const nextY = move[1] + dir[1];
        const nextMove = [nextX, nextY];

        if (!visited[nextMove]) {
          nextMoves.push(nextMove);
          visited[nextMove] = true;
        }
      }
    }
    moves = nextMoves;
    steps++;
  }
};

// 2025/06/19
// O(x * y) time complexity
// O(x * y) space complexity
// Time to complete: 25:14 min
// Patterns: Graph BFS
// Notes w.r.t. solution:
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var minKnightMoves = function (x, y) {
  // row: col
  // -2: -1/+1
  // +2: -1/+1
  // -1/+1: -2
  // -1/+1: +2
  // BFS from origin doing all of these moves, unvisited?
  const DIRS = [
    [-2, -1], [-2, 1], [2, -1], [2, 1],
    [-1, -2], [-1, 2], [1, -2], [1, 2]
  ];

  function isInBounds(row, col) {
    if (x < 0 && y < 0) { // --
      return row <= 1 && col <= 1;
    } else if (x < 0) {   // -+
      return row <= 1 && col >= -1;
    } else if (y < 0) {   // +-
      return row >= -1 && col <= 1;
    } else {              // ++
      return row >= -1 && col >= -1;
    }
  }

  const visited = {};
  let steps = 0;
  let moves = [[0, 0]];
  while (moves.length) {
    const nextMoves = [];
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      if (move[0] === x && move[1] === y) {
        return steps;
      }

      for (const dir of DIRS) {
        const nextX = move[0] + dir[0];
        const nextY = move[1] + dir[1];
        const nextMove = [nextX, nextY];

        if (!visited[nextMove] && isInBounds(...nextMove)) {
          nextMoves.push(nextMove);
          visited[nextMove] = true;
        }
      }
    }
    moves = nextMoves;
    steps++;
  }
};