// 2025/05/16
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 13:24 min
// Patterns: Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  // smoothing is determined by original image
  //  & is not affected by prev smoothin on the same run
  // average value + all 8 directions adjacent, if in bounds

  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];

  function getSmoothedValue(row, col) {
    let sum = img[row][col];
    let count = 1;

    for (const [rowDelt, colDelt] of DIRS) {
      const rowNext = row + rowDelt;
      const colNext = col + colDelt;

      if (rowNext < 0 || img.length <= rowNext
        || colNext < 0 || img[0].length <= colNext) {
        continue;
      }

      sum += img[rowNext][colNext];
      count++;
    }

    return Math.floor(sum / count);
  }

  const smoothedImg = [];
  for (let row = 0; row < img.length; row++) {

    const smoothedRow = [];
    for (let col = 0; col < img[0].length; col++) {
      const smoothedCell = getSmoothedValue(row, col);
      smoothedRow.push(smoothedCell);
    }
    smoothedImg.push(smoothedRow);
  }

  return smoothedImg;
};