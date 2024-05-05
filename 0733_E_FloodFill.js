// 2024/05/05
// O(n) time complexity
// O(n) space complexity
// Time to complete: 4:45 min refactor from 13:54 min recursion solution
// Patterns: Graph - DFS Preorder, Iteration
// Notes w.r.t. solution:
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill_DFS = function (image, sr, sc, color) {
  const oldColor = image[sr][sc];
  if (oldColor === color) {
    return image;
  }

  const toVisit = [[sr, sc]];
  while (toVisit.length) {
    const [row, col] = toVisit.pop();

    if (image[row][col] === oldColor) {
      // color pixel
      image[row][col] = color;

      // check if neighboring pixels should be colored
      if (row > 0) {
        toVisit.push([row - 1, col]);
      }
      if (row < image.length - 1) {
        toVisit.push([row + 1, col]);
      }
      if (col > 0) {
        toVisit.push([row, col - 1]);
      }
      if (col < image[0].length - 1) {
        toVisit.push([row, col + 1]);
      }
    }
  }

  return image;
};

// 2024/05/05
// O(n) time complexity
// O(n) space complexity
// Time to complete: 4:45 min refactor from 13:54 min recursion solution
// Patterns: Graph - BFS, Iteration
// Notes w.r.t. solution:
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill_BFS = function (image, sr, sc, color) {
  const oldColor = image[sr][sc];
  if (oldColor === color) {
    return image;
  }

  const toVisit = [[sr, sc]];
  while (toVisit.length) {
    const [row, col] = toVisit.shift();

    if (image[row][col] === oldColor) {
      // color pixel
      image[row][col] = color;

      // check if neighboring pixels should be colored
      if (row > 0) {
        toVisit.push([row - 1, col]);
      }
      if (row < image.length - 1) {
        toVisit.push([row + 1, col]);
      }
      if (col > 0) {
        toVisit.push([row, col - 1]);
      }
      if (col < image[0].length - 1) {
        toVisit.push([row, col + 1]);
      }
    }
  }

  return image;
};

// 2024/05/05
// O(n) time complexity
// O(n) space complexity
// Time to complete: 13:54 min
// Patterns: Graph - DFS Preorder, Recursion
// Notes w.r.t. solution:
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill_recurse = function (image, sr, sc, color) {
  const isInBounds = (image, row, col) => {
    return ((0 <= row && row < image.length)
      && (0 <= col && col < image[0].length));
  }

  const fillSearch = (image, row, col, newColor, oldColor) => {
    if (isInBounds(image, row, col) && image[row][col] === oldColor) {
      // color pixel
      image[row][col] = newColor;

      // check if neighboring pixels should be colored
      fillSearch(image, row + 1, col, newColor, oldColor);
      fillSearch(image, row - 1, col, newColor, oldColor);
      fillSearch(image, row, col + 1, newColor, oldColor);
      fillSearch(image, row, col - 1, newColor, oldColor);
    }
  }

  const oldColor = image[sr][sc];

  if (oldColor !== color) {
    fillSearch(image, sr, sc, color, oldColor);
  }

  return image;
};