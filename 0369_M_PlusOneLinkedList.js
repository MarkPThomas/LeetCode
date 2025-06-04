// 2025/06/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 13:42 min
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
var plusOne = function (head) {
  function reverse(node) {
    let prev = null;
    while (node) {
      const nodeNext = node.next;
      node.next = prev;

      prev = node;
      node = nodeNext;
    }

    return prev;
  }

  // reverse to process
  head = reverse(head);

  // get & carry a remainder
  let remainder = 1;
  let node = head;
  while (remainder && node) {
    const sum = node.val + remainder;
    if (sum < 10) {
      node.val = sum;
      remainder = 0;
    } else {
      node.val = 0;
    }

    if (!node.next && remainder) {
      node.next = new ListNode(0);
    }
    node = node.next;
  }

  // reverse to return
  return reverse(head);
};