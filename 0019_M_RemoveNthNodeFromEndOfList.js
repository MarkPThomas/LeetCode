// O(n) time complexity
// O(1) space complexity
// Time to complete: 19 min
// Patterns: Linked List, 2 Pointers
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let lastNode = head;
  for (let i = 0; i < n; i++) {
    lastNode = lastNode.next;
  }

  let nthNode = head;
  let prevNode = null;
  while (lastNode !== null) {
    lastNode = lastNode.next;

    prevNode = nthNode;
    nthNode = nthNode.next;
  }

  if (prevNode === null) {
    // remove head
    prevNode = head;
    head = head.next;
    prevNode.next = null;
  } else {
    // remove other nodes
    prevNode.next = nthNode.next;
    nthNode.next = null;
  }
  return head;
};