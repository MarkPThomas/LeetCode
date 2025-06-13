// 2025/06/13
// O(m * n * k) time complexity
// O(1) space complexity
//  where m =  # rows in mat1, n = # cols in mat1, k = # cols in mat2
// Time to complete: 16:40/29:01 min
// Patterns: Matrix, math
// Notes w.r.t. solution: Solved in 16:40, but added sparse row/col optimization.
/**
 * @param {number[][]} mat1
 * @param {number[][]} mat2
 * @return {number[][]}
 */
var multiply = function (mat1, mat2) {
  // for each row of mat1
  //      multiply each element by the corresponding row of mat2
  //      mat2 element corresponds to the row of mat1
  // work out sparse calc next?
  // skip any mat2 cols that are all 0s
  // skip any mat1 rows that are all 0s;
  const sparseRows = [];
  for (let row = 0; row < mat1.length; row++) {
    let isSparse = true;
    for (let col = 0; col < mat1[0].length; col++) {
      if (mat1[row][col] !== 0) {
        isSparse = false;
      }
    }
    sparseRows[row] = isSparse;
  }

  const sparseCols = [];
  for (let col = 0; col < mat2[0].length; col++) {
    let isSparse = true;
    for (let row = 0; row < mat2.length; row++) {
      if (mat2[row][col] !== 0) {
        isSparse = false;
      }
    }
    sparseCols[col] = isSparse;
  }

  const result = [];
  for (let row = 0; row < mat1.length; row++) {
    const resultRow = [];
    if (sparseRows[row]) {
      for (let col = 0; col < mat1[0].length; col++) {
        resultRow.push(0);
      }
    } else {
      for (let col2 = 0; col2 < mat2[0].length; col2++) {
        let result = 0;
        if (!sparseCols[col2]) {
          for (let col1 = 0; col1 < mat1[0].length; col1++) {
            result += mat1[row][col1] * mat2[col1][col2];
          }
        }

        resultRow.push(result);
      }
    }

    result.push(resultRow);
  }
  return result;
};

// ===== Solutions =====
// O(m * n * k) time complexity
// O(m * k + n * k) space complexity
//  where m =  # rows in mat1, k = # cols in mat1, n = # cols in mat2
// Patterns: Matrix, math
/**
 * @param {number[][]} mat1
 * @param {number[][]} mat2
 * @return {number[][]}
 */
var multiply = function (mat1, mat2) {
  function compressMatrix(matrix) {
    const compressedMatrix = [];

    matrix.forEach((rowVals, rowIdx) => {
      const compressedRow = [];
      rowVals.forEach((val, colIdx) => {
        if (val) {
          compressedRow.push([val, colIdx]);
        }
      });
      compressedMatrix.push(compressedRow);
    });

    return compressedMatrix;
  }

  const m = mat1.length;
  const n = mat2[0].length;
  const result = Array(m).fill().map(() => Array(n).fill(0));

  const compMat1 = compressMatrix(mat1);
  const compMat2 = compressMatrix(mat2);
  for (let row1 = 0; row1 < m; row1++) {
    for (const [val1, col1] of compMat1[row1]) {
      for (const [val2, col2] of compMat2[col1]) {
        result[row1][col2] += val1 * val2;
      }
    }
  }

  return result;
};