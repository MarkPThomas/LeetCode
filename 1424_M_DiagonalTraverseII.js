// 2025/06/04
// O(m * n) time complexity
// O(m) space complexity
//  where m = # rows, n = # cols
// Time to complete: 1:16:06 min
// Patterns: Stacks
// Notes w.r.t. solution:
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function (nums) {
  // first # of each diagonal is:
  //  1st number of each nums row
  //  Any number of last nums row
  // travel by row-- & col++
  // check bounds & undefined

  // track each row, length & last idx
  // remove rows when last idx hit
  // continue lowest row working up, starting at last idx hit + 1

  const output = [];

  let prevRows = [];
  // 1. Start @ 1st number of each nums row
  for (let row = 0; row < nums.length; row++) {
    output.push(nums[row][0]);

    const prevRowsNext = [];
    if (nums[row].length > 1) {
      prevRowsNext.push([row, 1]);
    }

    while (prevRows.length) {
      let [rowIdx, colIdx] = prevRows.pop();
      output.push(nums[rowIdx][colIdx]);

      colIdx++;
      if (colIdx < nums[rowIdx].length) {
        prevRowsNext.push([rowIdx, colIdx]);
      }

    }

    prevRows = prevRowsNext.reverse();
  }

  // 2. Start @ any number of last nums row
  // 3. Start @ colDiag still within bounds
  // => start @ last row, work each col to max col, increment back up rows
  while (prevRows.length) {
    const prevRowsNext = [];

    while (prevRows.length) {
      let [row, col] = prevRows.pop()
      output.push(nums[row][col]);

      col++;
      if (nums[row].length > col) {
        prevRowsNext.push([row, col]);
      }
    }

    prevRows = prevRowsNext.reverse();
  }

  return output;
};

// 2025/06/04
// O(m * n) time complexity
// O(m) space complexity
//  where m = # rows, n = # cols
// Time to complete: 28:05 min
// Patterns: Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function (nums) {
  // first # of each diagonal is:
  //  1st number of each nums row
  //  Any number of last nums row
  // travel by row-- & col++
  // check bounds & undefined

  // track each row, length & last idx
  // remove rows when last idx hit
  // continue lowest row working up, starting at last idx hit + 1

  const output = [];
  const rows = []; // rowIdx, colIdx
  function traverseDiagonal(row, col) {
    while (row >= 0) {
      const val = nums[row][col];
      if (val !== undefined) {
        output.push(val);
        if (rows[row] < col) {
          rows[row] = col;
        }
      }

      row--;
      col++;
    }
  }

  let maxCol = 0;
  for (const row of nums) {
    maxCol = Math.max(maxCol, row.length);
  }

  // 1. Start @ 1st number of each nums row
  for (let row = 0; row < nums.length; row++) {
    traverseDiagonal(row, 0);
  }

  // 2. Start @ any number of last nums row
  // 3. Start @ colDiag still within bounds
  // => start @ last row, work each col to max col, increment back up rows
  let rowStart = nums.length - 1;
  for (let col = 1; col < maxCol; col++) {
    traverseDiagonal(rowStart, col);

    if (rows[rowStart] >= nums[rowStart].length) {
      rowStart--;
    }
  }


  return output;
};