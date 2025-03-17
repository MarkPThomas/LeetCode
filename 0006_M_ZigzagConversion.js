// O(n) time complexity
// O(1) space complexity (ignoring array for output)
//  where n = # chars in string
// Time to complete: 39:53 min
// Patterns: String, array, math
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (s.length < numRows || numRows === 1) {
    return s;
  }

  const deltaCol = 2 * (numRows - 1);
  const zigzag = [];
  for (let row = 0; row < numRows; row++) {
    let iCol = row;

    // Add first col
    zigzag.push(s[iCol]);

    // Add each following col & diag
    while (iCol < s.length) {
      iCol += deltaCol;
      const iColDiag = iCol - 2 * row;

      // Add diag
      if (0 < row && row < numRows - 1
        && iColDiag < s.length) {
        zigzag.push(s[iColDiag]);
      }

      // Add next col
      if (iCol < s.length) {
        zigzag.push(s[iCol]);
      }
    }
  }

  return zigzag.join('');
};


// O(n * numRows) time complexity
// O(n * numRows) space complexity
//  where n = # chars in string
// Time to complete: 22:02 min
// Patterns: String, array
// Notes w.r.t. solution: Solved in 18 min but had row/col swapped in my mind ;-P
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  // array n x numRows, where n is generated by zigzag
  const zigzag = [];
  let i = 0;
  while (i < s.length) {
    // 2 movements:
    let row = 0;
    //  1. Down until r = numRows, r++
    const colChars = Array(numRows).fill('');
    while (row < numRows && i < s.length) {
      const char = s[i];
      colChars[row] = char;

      row++;
      i++;
    }
    zigzag.push(colChars);

    //  2. Diagonal up, r--, c++ via adding a column for each increment
    row -= 2;
    while (row > 0 && i < s.length) {
      const char = s[i];
      const diagColChars = Array(numRows).fill('');
      diagColChars[row] = char;
      zigzag.push(diagColChars);

      row--;
      i++;
    }
  }

  // concatenate array row-by-row (1-n) to generate string
  const output = [];
  const numCols = zigzag.length;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (zigzag[col][row]) {
        output.push(zigzag[col][row]);
      }
    }
  }

  return output.join('');
};