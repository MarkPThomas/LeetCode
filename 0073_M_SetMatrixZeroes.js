// 2024/11/11
// O(m * n) time complexity
// O(1) space complexity
// Time to complete: 26:133 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let baseRowHasZero = false;
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][0] === 0) {
      baseRowHasZero = true;
      break;
    }
  }

  let baseColHasZero = false;
  for (let col = 0; col < matrix[0].length; col++) {
    if (matrix[0][col] === 0) {
      baseColHasZero = true;
      break;
    }
  }

  // Mark outer edges
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0;
        matrix[0][col] = 0;
      }
    }
  }

  // 2nd pass transfers edge marks
  for (let row = 1; row < matrix.length; row++) {
    if (matrix[row][0] === 0) {
      for (let col = 1; col < matrix[0].length; col++) {
        matrix[row][col] = 0;
      }
    }
  }

  for (let col = 1; col < matrix[0].length; col++) {
    if (matrix[0][col] === 0) {
      for (let row = 1; row < matrix.length; row++) {
        matrix[row][col] = 0;
      }
    }
  }

  // Update edges last
  if (baseRowHasZero) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][0] = 0;
    }
  }

  if (baseColHasZero) {
    for (let col = 0; col < matrix[0].length; col++) {
      matrix[0][col] = 0;
    }
  }
};

// 2024/11/11
// O(m * n) time complexity
// O(m + n) space complexity
// Time to complete: 5:03 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const rowsZero = {};
  const colsZero = {};

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === 0) {
        rowsZero[row] = true;
        colsZero[col] = true;
      }
    }
  }

  for (const row of Object.keys(rowsZero)) {
    for (let col = 0; col < matrix[0].length; col++) {
      matrix[row][col] = 0;
    }
  }

  for (const col of Object.keys(colsZero)) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][col] = 0;
    }
  }
};