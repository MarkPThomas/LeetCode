// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:00 min
// Patterns: Linked List w/ 2 Pointers
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
  let nodeSlow = head;
  let nodeFast = head;
  let prevNode = null;
  while (nodeSlow) {
    if (!nodeFast || !nodeFast.next) {
      if (!prevNode) {
        head = nodeSlow.next;
      } else {
        prevNode.next = nodeSlow.next;
      }
      break;
    }
    prevNode = nodeSlow;
    nodeSlow = nodeSlow.next;
    nodeFast = nodeFast.next?.next;
  }

  return head;
};