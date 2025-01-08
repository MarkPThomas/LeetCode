// 2025/01/07
// O(n) time complexity
// O(h)->O(n) space complexity
//  where n = # nodes, h = max height of tree
// Time to complete: x min
// Patterns: Tree DFS
// Notes w.r.t. solution: Improved solution from prior timed one
/**
 * // Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {_Node} root
 * @return {number}
 */
function diameter(root) {
  let maxDiameter = 0;

  function getMaxHeight(root) {
    if (!root || !root.children.length) {
      return 0;
    }

    let maxHeight = 0;
    let maxHeight2nd = 0;
    for (const child of root.children) {
      const parentHeight = getMaxHeight(child) + 1;
      if (parentHeight > maxHeight) {
        maxHeight2nd = maxHeight;
        maxHeight = parentHeight;
      } else if (parentHeight > maxHeight2nd) {
        maxHeight2nd = parentHeight;
      }
    }

    maxDiameter = Math.max(maxDiameter, maxHeight + maxHeight2nd);

    return maxHeight;
  }

  getMaxHeight(root);
  return maxDiameter;
};

// 2025/01/07
// O(n) time complexity
// O(h)->O(n) space complexity
//  where n = # nodes, h = max height of tree
// Time to complete: 31:01 min
// Patterns: Tree DFS
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {_Node} root
 * @return {number}
 */
var diameter = function (root) {
  // treating any node as root
  // diameter is longest of any children

  function diameterOrDepth(root) {
    if (!root || !root.children.length) {
      return [0, 0];
    }

    let maxHeight = 0;
    let maxHeight2nd = 0;
    let maxDiameter = 0;
    for (const child of root.children) {
      if (!child) {
        continue;
      }

      const [diameter, depth] = diameterOrDepth(child);

      let parentHeight = depth + 1;
      if (parentHeight > maxHeight) {
        maxHeight2nd = maxHeight;
        maxHeight = parentHeight;
      } else if (parentHeight > maxHeight2nd) {
        maxHeight2nd = parentHeight;
      }

      maxDiameter = Math.max(maxDiameter, diameter);
    }

    maxDiameter = Math.max(maxDiameter, maxHeight + maxHeight2nd);

    return [maxDiameter, maxHeight];
  }

  const [diameter, depth] = diameterOrDepth(root);

  return Math.max(diameter, depth);
};