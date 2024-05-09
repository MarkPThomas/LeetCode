// 2024/05/09
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4:25 min
// Patterns: Linked List, Fast & Slow Pointers
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
var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast?.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
};