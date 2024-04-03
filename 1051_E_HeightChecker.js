// 2024/04/02
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 5:00 min
// Patterns: Bubble Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
  const sort = (arr) => {
    for (let endOffset = 0; endOffset < arr.length - 1; endOffset++) {
      for (let i = 0; i < arr.length - endOffset - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = temp;
        }
      }
    }

    return arr;
  }

  const expected = sort([...heights]);

  let mismatches = 0;
  for (let i = 0; i < expected.length; i++) {
    if (heights[i] !== expected[i]) {
      mismatches++;
    }
  }

  return mismatches;
};

// 2024/04/02
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 3:40 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
  const expected = [...heights].sort((a, b) => a - b);

  let mismatches = 0;
  for (let i = 0; i < expected.length; i++) {
    if (heights[i] !== expected[i]) {
      mismatches++;
    }
  }

  return mismatches;
};