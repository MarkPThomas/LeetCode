// 2025/03/21
// O(n) time complexity
// O(1) space complexity
// Time to complete: 25:32 min
// Patterns: Linked List Reversal
// Notes w.r.t. solution: Lost time misreading the problem (was looking for node vals instead of node counts!)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const sentinel = new ListNode(null, head);
  let count = 0;

  // Get left
  let preNode = sentinel;
  while (preNode.next && count < left - 1) {
    preNode = preNode.next;
    count++;
  }

  // Continue to right, reversing nodes along the way
  let prevNode = preNode.next;
  let nextNode = prevNode?.next;

  while (nextNode && count < right - 1) {
    const nextTmp = nextNode.next;
    nextNode.next = prevNode;
    prevNode = nextNode;
    nextNode = nextTmp;
    count++;
  }

  // Connect head/tails of reversed segment
  preNode.next.next = nextNode;
  preNode.next = prevNode;

  return sentinel.next;
};