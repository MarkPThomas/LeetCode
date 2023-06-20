// O(n) time complexity
// O(1) space complexity
// Time to complete: 12:00 min
// Patterns: Linked List w/ 2 passes
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
var deleteMiddle = function (head) {
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  const midIndex = Math.floor(length / 2);
  let index = -1;
  node = head;
  let prevNode = null;
  while (node) {
    index++;
    if (index === midIndex) {
      if (prevNode) {
        prevNode.next = node.next;
      } else {
        head = node.next;
      }
    }
    prevNode = node;
    node = node.next;
  }

  return head;
};