// O(n) time complexity
// O(1) space complexity
// Time to complete: 32:12 min
// Patterns: Linked List - In-Place Reversal
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (k === 1) {
    return head;
  }

  function reverse(prevTail, nextHead) {
    let prev = null;
    let node = prevTail.next;
    while (node !== nextHead) {
      const swap = node.next;
      node.next = prev;
      prev = node;
      node = swap;
    }

    return [prev, prevTail.next];
  }

  const sentinel = new ListNode(null, head);
  let prevTail = sentinel;
  let nextHead = head;

  let count = 0;
  while (nextHead) {
    count++;
    nextHead = nextHead.next;

    if (count % k === 0) {
      const [revHead, revTail] = reverse(prevTail, nextHead);
      prevTail.next = revHead;
      revTail.next = nextHead;

      prevTail = revTail;
    }
  }

  return sentinel.next;
};