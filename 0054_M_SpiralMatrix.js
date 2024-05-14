// O(m * n) time complexity
// O(1) space complexity
// where m = array width, n = array height
// Time to complete: 31:41 min / 22:11 min
// Patterns: 2D Matrix
// Notes w.r.t. solution: Solved in time. Minor issue caused overtime to debug.
//    Lesson for future 2D arrays - use result count to always immediately end loops
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  // Max/min i/j is originally the array but shrinks
  let limits = {
    row: { min: 0, max: matrix.length - 1 },
    col: { min: 0, max: matrix[0].length - 1 }
  }

  // We are done when no movement can be made, i.e. count is reached
  let count = matrix.length * matrix[0].length;

  // start at i = 0, j = 0
  let row = 0;
  let col = 0;
  const path = [matrix[row][col]];

  while (path.length < count) {
    // 4 cases in order:
    //  Move right until max j then (minI--)
    while (path.length < count && col < limits.col.max) {
      col++;
      path.push(matrix[row][col]);
    }
    limits.row.min++;

    //  Move down until max i then (maxJ--)
    while (path.length < count && row < limits.row.max) {
      row++;
      path.push(matrix[row][col]);
    }
    limits.col.max--;

    //  Move left until min j then (maxI--)
    while (path.length < count && limits.col.min < col) {
      col--;
      path.push(matrix[row][col]);
    }
    limits.row.max--;

    //  Move up until min i then (minJ--)
    while (path.length < count && limits.row.min < row) {
      row--;
      path.push(matrix[row][col]);
    }
    limits.col.min++;
  }

  return path;
};


const testCases = [
  {
    input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    expected: [1, 2, 3, 6, 9, 8, 7, 4, 5]
  },
  {
    input: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]],
    expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
  },
];

testCases.forEach((testCase) => {
  let result = spiralOrder(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);