// 2025/04/05
// O(n^2 * log(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 31:20 min
// Patterns: Divide & Conquer
// Notes w.r.t. solution: Finished in 20:00 but had minor bug. Further minor bug went beyond 31:20 (forgot to add min to mid :-P )
/**
 * // Definition for a QuadTree node.
 * function _Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {_Node}
 */
var construct = function (grid) {
  // check 4 grid quadrants for determining leaf, val, children
  // At each level, min/max x & y bounds for check
  // Start w/ initial value found. If any other values are found, prepare to recurse

  // Smartest way to subdivide is probably BFS from the center of each node
  // Brute force is just checking all rows & cols

  function getChildren(rowMin, rowMax, colMin, colMax) {
    let valInit = grid[rowMin][colMin];
    if (rowMin + 1 === rowMax   // Single entry, col is symmetric
      || quadValsSame(rowMin, rowMax, colMin, colMax)) {

      // If all of same value, set val = value, leaf = true & return
      return new _Node(valInit, true);
    } else { // Subdivide
      const rowMid = rowMin + Math.floor((rowMax - rowMin) / 2);
      const colMid = colMin + Math.floor((colMax - colMin) / 2);

      const topLeft = getChildren(rowMin, rowMid, colMin, colMid);
      const topRight = getChildren(rowMin, rowMid, colMid, colMax);
      const botLeft = getChildren(rowMid, rowMax, colMin, colMid);
      const botRight = getChildren(rowMid, rowMax, colMid, colMax);

      return new _Node(1, false, topLeft, topRight, botLeft, botRight);
      // return new _Node(valInit, false, topLeft, topRight, botLeft, botRight);
    }
  }

  function quadValsSame(rowMin, rowMax, colMin, colMax) {
    for (let row = rowMin; row < rowMax; row++) {
      for (let col = colMin; col < colMax; col++) {
        if (grid[row][col] !== grid[rowMin][colMin]) {
          return false;
        }
      }
    }
    return true;
  }

  const root = getChildren(0, grid.length, 0, grid[0].length);
  return root;
};