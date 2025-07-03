// 2025/04/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 20:10 min
// Patterns: Binary Tree
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {_Node} p
 * @param {_Node} q
 * @return {_Node}
 */
var lowestCommonAncestor = function (p, q) {
  // Base case:
  // lca is p || q if val == p || q

  // we are always starting at 1 valid
  // look at left & right children for the other
  // return valid if p || q, else, traverse to parents & check side branches as we go higher
  // lca is first node where both children, or 1 child & itself, are valid

  // DFS post-order (i.e. check both branches for p & q, check self upon return)
  // DFS pre-order - earlier potential termination at cost of more code/logic
  function hasChild(node, val) { //
    if (!node) {
      return false;
    } else if (node.val === val) {
      return true;
    }

    return hasChild(node.left, val) || hasChild(node.right, val);
  }

  const parentsP = {};

  if (hasChild(p, q.val)) {
    return p;
  } else if (hasChild(q, p.val)) {
    return q;
  } else { // Search up to first mutual parent
    while (p.parent) {
      p = p.parent;
      parentsP[p.val] = p.val;
    }

    while (q.parent) {
      q = q.parent;
      if (q.val in parentsP) {
        return q;
      }
    }

    return null;
  }
};