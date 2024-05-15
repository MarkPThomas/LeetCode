// 2024/05/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 36:03 min
// Patterns: Linked List
// Notes w.r.t. solution: Lost time on some rabbit holes. Diagram more carefull!
//    Also, remember best way to check cycles is just compare a reference. 'Visited' are strategies for > 1D

/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
  const insertNode = { val: insertVal, next: null };

  if (!head) {
    insertNode.next = insertNode;
    return insertNode;
  }

  function insertAndBreak(prev, node, insertVal, head) {
    return (
      // position between 2 values
      (prev.val <= insertVal && insertVal <= node.val)
      // list wraparound encountered & value is between end/start
      || (prev.val > node.val && (prev.val <= insertVal || insertVal <= node.val))
      //  cycle completed
      || (node === head)
    );
  }

  let node = head.next;
  let prev = head;
  while (node) {
    if (insertAndBreak(prev, node, insertVal, head)) {
      prev.next = insertNode;
      insertNode.next = node;

      return head;
    }

    prev = prev.next;
    node = node.next;
  }

  return head;
};