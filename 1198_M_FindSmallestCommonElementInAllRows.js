// 2025/06/11
// O(m * n) time complexity
// O(m) space complexity
// Time to complete: 22:33 min
// Patterns: Hashmap
// Notes w.r.t. solution: Added binary search optimization for starting row search
/**
 * @param {number[][]} mat
 * @return {number}
 */
var smallestCommonElement = function (mat) {
  // hashmap of num counts (at most once per row)
  // at end, smallest common element is first # in hashmap that occurs row # times
  // Optimize by taking min of first & last # of all rows. Answer is between these, if exists
  let maxFirst = -Infinity;
  let minLast = Infinity;
  for (const row of mat) {
    maxFirst = Math.max(maxFirst, row[0]);
    minLast = Math.min(minLast, row[row.length - 1]);
  }

  if (maxFirst > minLast) {
    return -1;
  }

  function getFirstColIdx(row, num) {
    let min = 0;
    let max = row.length - 1;
    // Get first >=
    while (min < max - 1) {
      const mid = min + Math.floor((max - min) / 2);
      if (row[mid] < num) { // Look right
        min = mid;
      } else { // look left
        max = mid;
      }
    }

    return min;
  }

  const numFreqs = new Set();
  let firstIdx = getFirstColIdx(mat[0], maxFirst);
  for (let col = firstIdx; col < mat[0].length; col++) {
    const num = mat[0][col];
    if (minLast < num) {
      break;
    }
    numFreqs[num] = (numFreqs[num] ?? 0) + 1;
  }

  for (let row = 1; row < mat.length; row++) {
    firstIdx = getFirstColIdx(mat[row], maxFirst);
    for (let col = firstIdx; col < mat[row].length; col++) {
      const num = mat[row][col];
      if (minLast < num) {
        break;
      }
      if (num in numFreqs) {
        numFreqs[num] = (numFreqs[num] ?? 0) + 1;
      }
    }
  }

  for (const [num, count] of Object.entries(numFreqs)) {
    if (count === mat.length) {
      return Number(num);
    }
  }

  return -1;
};

// 2025/06/11
// O(m * n) time complexity
// O(m) space complexity
// Time to complete: 14:56 min
// Patterns: Hashmap
// Notes w.r.t. solution: Added some optimizations to avoid unnecessary calcs, including problem solution clarifing #s unique on each row.
/**
 * @param {number[][]} mat
 * @return {number}
 */
var smallestCommonElement = function (mat) {
  // hashmap of num counts (at most once per row)
  // at end, smallest common element is first # in hashmap that occurs row # times
  // Optimize by taking min of first & last # of all rows. Answer is between these, if exists
  let maxFirst = -Infinity;
  let minLast = Infinity;
  for (const row of mat) {
    maxFirst = Math.max(maxFirst, row[0]);
    minLast = Math.min(minLast, row[row.length - 1]);
  }

  if (maxFirst > minLast) {
    return -1;
  }

  const numFreqs = new Set();
  for (const num of mat[0]) {
    if (maxFirst <= num && num <= minLast) {
      numFreqs[num] = (numFreqs[num] ?? 0) + 1;
    }
  }

  for (let row = 1; row < mat.length; row++) {
    for (const num of mat[row]) {
      if (num in numFreqs) {
        numFreqs[num] = (numFreqs[num] ?? 0) + 1;
      }
    }
  }

  for (const [num, count] of Object.entries(numFreqs)) {
    if (count === mat.length) {
      return Number(num);
    }
  }

  return -1;
};

// 2025/06/11
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 8:38 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[][]} mat
 * @return {number}
 */
var smallestCommonElement = function (mat) {
  // hashmap of num counts (at most once per row)
  // at end, smallest common element is first # in hashmap that occurs row # times
  const numFreqs = {};
  for (let row = 0; row < mat.length; row++) {
    const uniqueNums = new Set(mat[row]); // Ensures we only see each # once
    for (const num of uniqueNums) {
      numFreqs[num] = (numFreqs[num] ?? 0) + 1;
    }
  }

  for (const [num, count] of Object.entries(numFreqs)) {
    if (count === mat.length) {
      return Number(num);
    }
  }

  return -1;
};