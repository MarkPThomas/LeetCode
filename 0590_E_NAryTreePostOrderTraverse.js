// 2024/08/20
// O(n) time complexity
// O(d) -> O(n) space complexity
// where n = # nodes, d = max depth of tree
// Time to complete: 31:25 min (finished @ 24 min but had to debug)
// Patterns: N-Ary Tree, Post-order traversal
// Notes w.r.t. solution: Iterative solution
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  const result = [];
  if (!root) {
    return result;
  }

  const stack = [{ node: root, isVisited: false }];
  while (stack.length) {
    let currPair = stack.pop();

    if (!currPair.node) {
      continue;
    }

    if (currPair.isVisited) {
      result.push(currPair.node.val);
    } else {
      currPair.isVisited = true;
      stack.push(currPair);

      const children = currPair.node.children;
      for (let i = children.length - 1; 0 <= i; i--) {
        const child = children[i];

        if (child) {
          stack.push({ node: child, isVisited: false });
        }
      }
    }
  }

  return result;
};

// 2024/08/20
// O(n) time complexity
// O(d) -> O(n) space complexity
// where n = # nodes, d = max depth of tree
// Time to complete: 5:17 min
// Patterns: N-Ary Tree, Post-order traversal
// Notes w.r.t. solution: Recursive solution
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  const result = [];

  function getPostOrder(node) {
    if (node) {
      if (node.children) {
        for (const child of node.children) {
          getPostOrder(child);
        }
      }

      if (node.val !== null) {
        result.push(node.val);
      }
    }
  }

  getPostOrder(root);

  return result;
};
