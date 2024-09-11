// O(n) time complexity
// O(n) space complexity
// Time to complete: +36:10 min
// Patterns:
// Notes w.r.t. solution: Didn't record time setting up console debugs.
//   22:28 min to solve 99%. Remaining time was finding problem and then (timed) resolving it.
//   Problem was left branch needs to be disconnected to avoid infinite loops of revisiting visted nodes.
//   Solution is to first make connections as if a singly linked list, then re-traverse to attach the other direction,
//     since no treee traversal needs to be done at that point.
/**
 * // Definition for a _Node.
 * function _Node(val, left, right) {
 *      this.val = val;
 *      this.left = left;
 *      this.right = right;
 *  };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var treeToDoublyList = function (root) {
  if (!root) {
    return root;
  }

  const dummyNode = { val: null, right: null };

  // traverse BST in order
  let prevNode = dummyNode;
  let node = root;

  const nodes = [root];
  while (nodes.length) {
    node = nodes.pop();

    // Get left-most node from current node
    while (node.left) {
      const nodeTempLeft = node.left;
      node.left = null;
      nodes.push(node);

      node = nodeTempLeft;
    }

    // Connect node & advance
    prevNode.right = node;
    prevNode = node;

    // Save right node to process next
    if (node.right) {
      nodes.push(node.right);
    }
  }

  // Connect prev/left
  prevNode = dummyNode;
  node = dummyNode.right;
  while (node.right) {
    prevNode = node;
    node = node.right;
    node.left = prevNode;
  }

  // connect last node to head
  const head = dummyNode.right;
  dummyNode.right = null;
  node.right = head;
  head.left = node;

  return head;
};