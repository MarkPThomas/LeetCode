// 2025/05/07
// O(1) time complexity
// O(n) space complexity
// Time to complete: 16:14 min
// Patterns: Design
/**
 * @param {number} n
 */
var TicTacToe = function (n) {
  this.n = n;

  this.playerMoves = Array(2);
  for (let i = 0; i < this.playerMoves.length; i++) {
    this.playerMoves[i] = { rows: {}, cols: {}, diag: 0, diagAnti: 0 };
  }

  // any row that has n by a single player wins
  // any col that has n by a single player wins

  // diag that has n by a single player wins
  // anti-diag that has n by a single player wins
};

/**
* @param {number} row
* @param {number} col
* @param {number} player
* @return {number}
*/
TicTacToe.prototype.move = function (row, col, player) {
  const moves = this.playerMoves[player - 1];

  // Place piece
  moves.rows[row] ??= 0;
  moves.rows[row]++;
  if (moves.rows[row] === this.n) {
    return player;
  }

  moves.cols[col] ??= 0;
  moves.cols[col]++;
  if (moves.cols[col] === this.n) {
    return player;
  }

  if (row === col) {
    moves.diag++;
    if (moves.diag === this.n) {
      return player;
    }
  }

  if (row + col === this.n - 1) {
    moves.diagAnti++;
    if (moves.diagAnti === this.n) {
      return player;
    }
  }

  return 0;
};

/**
* Your TicTacToe object will be instantiated and called as such:
* var obj = new TicTacToe(n)
* var param_1 = obj.move(row,col,player)
*/

// 2025/05/07
// O(4 * n) -> O(n) time complexity
// O(n^2) space complexity
// Time to complete: 31:34 min
// Patterns: Design
// Notes w.r.t. solution: Mostly solved in 13:46, but bugs from being too fast majorly slowed things down:
//  1. using 'this' in a local function vs. passing in a parameter or making the function a class-level function
//  2. +15:33 - error in incrementing diagonals correctly
//  3. +2:25 - error in forgetting it is only on longest diagonals, not any diagonals, derp
/**
 * @param {number} n
 */
var TicTacToe = function (n) {
  this.grid = {};
  this.n = n;
  this.winner = 0;
};

TicTacToe.prototype.isRowValid = function (row, col, player) {
  let isValid = true;
  for (let r = row; r < this.n; r++) {
    if (this.grid[[r, col]] !== player) {
      isValid = false;
      break;
    }
  }

  for (let r = row; r >= 0; r--) {
    if (this.grid[[r, col]] !== player) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

TicTacToe.prototype.isColValid = function (row, col, player) {
  let isValid = true;
  for (let c = col; c < this.n; c++) {
    if (this.grid[[row, c]] !== player) {
      isValid = false;
      break;
    }
  }

  for (let c = col; c >= 0; c--) {
    if (this.grid[[row, c]] !== player) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

TicTacToe.prototype.isDiagValid = function (row, col, player) {
  // Check if on diagonal hitting corners
  if (row !== col) {
    return false;
  }


  let isValid = true;

  let plus = 1;
  while (row + plus < this.n && col + plus < this.n) {
    if (this.grid[[row + plus, col + plus]] !== player) {
      isValid = false;
      break;
    }
    plus++;
  }

  let minus = 1;
  while (row - minus >= 0 && col - minus >= 0) {
    if (this.grid[[row - minus, col - minus]] !== player) {
      isValid = false;
      break;
    }
    minus++;
  }

  return isValid;
}

TicTacToe.prototype.isDiagAntiValid = function (row, col, player) {
  // Check if on anti-diagonal hitting corners
  if (row !== this.n - col - 1) {
    return false;
  }

  let isValid = true;

  let plus = 1;
  while (row + plus < this.n && col - plus < this.n) {
    if (this.grid[[row + plus, col - plus]] !== player) {
      isValid = false;
      break;
    }
    plus++;
  }

  let minus = 1;
  while (row - minus >= 0 && col + minus >= 0) {
    if (this.grid[[row - minus, col + minus]] !== player) {
      isValid = false;
      break;
    }
    minus++;
  }

  return isValid;
}

/**
* @param {number} row
* @param {number} col
* @param {number} player
* @return {number}
*/
TicTacToe.prototype.move = function (row, col, player) {
  // if valid, mark board with player
  if (!this.grid[[row, col]]) {
    this.grid[[row, col]] = player;
  }

  if (!this.winner
    && (this.isRowValid(row, col, player)
      || this.isColValid(row, col, player)
      || this.isDiagValid(row, col, player)
      || this.isDiagAntiValid(row, col, player))
  ) {
    this.winner = player;
  }

  return this.winner;
};

/**
* Your TicTacToe object will be instantiated and called as such:
* var obj = new TicTacToe(n)
* var param_1 = obj.move(row,col,player)
*/