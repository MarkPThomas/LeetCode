// 2025/07/02
// O() time complexity
// O(1) space complexity
// Time to complete: 41:57 OT min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Never attempted to run code. Was still working out logicl Tricky!
/**
 * @param {number[]} preorder
 * @return {boolean}
 */
var verifyPreorder = function (preorder) {
  // brute force:
  //   build tree, traverse & validate as BST
  // optimized:
  //  if next # <, we are traversing L branch
  //      until we return to node, all vals < node val
  //  if next # >, we are traversing R branch
  //      until we return to node, all vals > node val
  let parentIdx = 0;

  for (let childIdx = 1; childIdx < preorder.length; childIdx++) {
    if (preorder[childIdx] < preorder[childIdx + 1]) { // we are moving right
      if (preorder[parentIdx] < preorder[childIdx + 1]) { // we are backtracking to parent first
        // do nothing w/ parent
      } else { // Move parent down & right
        parentIdx = childIdx;
      }
    } else {    // we are moving left
      if (preorder[childIdx] > preorder[childIdx + 1]) { // Move parent down & left
        parentIdx = childIdx;
      } else { // Move parent down
        parentIdx = childIdx;
      }
    }

    if (parentIdx < 0) {
      return false;
    }
  }

  return true;
};

// ===== Solution =====
/**
 * @param {number[]} preorder
 * @return {boolean}
 */
var verifyPreorder = function (preorder) {
  const numsPrev = [];
  let minLimit = -Infinity;

  for (const num of preorder) {
    while (numsPrev.length && numsPrev[numsPrev.length - 1] < num) {
      minLimit = numsPrev.pop();
    }

    if (num <= minLimit) {
      return false;
    }

    numsPrev.push(num);
  }

  return true;
};