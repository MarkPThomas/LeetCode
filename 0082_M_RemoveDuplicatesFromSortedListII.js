// 2025/03/23
// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:31 min
// Patterns: Linked List
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  // When a node is removed, keep it in a variable to check
  let duplicateVal = null;

  const sentinel = new ListNode('a', head);
  let prev = null;
  let node = sentinel;
  while (node) {
    const next = node.next;
    if (next && node.val === next.val) {
      duplicateVal = node.val;
    }

    if (node.val === duplicateVal) {
      if (prev) {
        prev.next = next;
      }
      node.next = null;
      node = next;
    } else {
      prev = node;
      node = node.next;
    }
  }

  return sentinel.next;
};