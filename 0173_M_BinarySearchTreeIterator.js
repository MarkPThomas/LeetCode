// 2024/09/25
// Initialize
//    O(1) time complexity
//    O(1) space complexity
// Next
//    O(1) time complexity (amortized/average, O(h) worst-case)
//    O(h) space complexity
// HasNext
//    O(1) time complexity
//    O(1) space complexity
// where h = depth of the BST
// Time to complete: 8:08 min
// Patterns: BST, Inorder Traverse
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this.prev = -Infinity;
  this.node = root;
  this.nodes = [];
};

/**
* @return {number}
*/
BSTIterator.prototype.next = function () {
  // Get leftmost node
  while (this.node) {
    this.nodes.push(this.node);
    this.node = this.node.left;
  }

  // Process
  this.node = this.nodes.pop();
  let val = this.node.val;

  // Try right branch
  this.node = this.node.right;

  return val;
};

/**
* @return {boolean}
*/
BSTIterator.prototype.hasNext = function () {
  return this.node || this.nodes.length;
};

/**
* Your BSTIterator object will be instantiated and called as such:
* var obj = new BSTIterator(root)
* var param_1 = obj.next()
* var param_2 = obj.hasNext()
*/