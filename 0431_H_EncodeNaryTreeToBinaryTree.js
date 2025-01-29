// 2025/01/28
// O(n) time complexity
// O(h) space complexity
//  where n = # nodes, h = height of binary tree
// Time to complete: 1:07:22 min
// Patterns: N-ary Tree DFS Pre-order, Binary Tree DFS In-order
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

class Codec {
  constructor() {
  }

  /**
   * @param {_Node|null} root
   * @return {TreeNode|null}
   */
  // Encodes an n-ary tree to a binary tree.
  encode = function (root) {
    // binary tree has 2 branches. What can they mean from an n-ary tree?
    // Nary tree children only matter in terms of order
    // left branch = 1st child of a new row
    // right branch = 2+ children of a new row, i.e. siblings
    function encodeChildSiblings(currNodeRow) {
      if (!currNodeRow.length) {
        return null;
      }

      const firstNode = currNodeRow.pop();
      const bNode = new TreeNode(firstNode.val);
      const siblings = currNodeRow;

      let firstNodeChildren = [];
      for (let i = firstNode.children.length - 1; i >= 0; i--) {
        firstNodeChildren.push(firstNode.children[i]);
      }

      bNode.left = encodeChildSiblings(firstNodeChildren);
      bNode.right = encodeChildSiblings(siblings);

      return bNode;
    }

    return root ? encodeChildSiblings([root]) : null;
  };

  /**
   * @param {TreeNode|null} root
   * @return {_Node|null}
   */
  // Decodes your binary tree to an n-ary tree.
  decode = function (root) {

    function decodeChildSiblings(node) {
      if (!node) {
        return null;
      }

      // process next row (left)
      const nChildren = decodeChildSiblings(node.left) ?? [];

      // finish current node
      const nNode = new Node(node.val, nChildren);

      // process siblings (right) & return all as next children set
      const nSiblings = decodeChildSiblings(node.right);
      return nSiblings ? [nNode, ...nSiblings] : [nNode];
    }

    // first child = root.left
    // other children = root.right
    return root ? decodeChildSiblings(root)[0] : null;
  };
}

/*
* Your Codec object will be instantiated and called as such:
* codec = Codec()
* codec.decode(codec.encode(root))
*/