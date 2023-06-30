// O(n) time complexity
// O(1) space complexity
// Time to complete: 30 min
// Patterns: Linked List
// Notes w.r.t. solution: Had to cheat & look at algorithm again. Subtle details of algorithm throw it off. Study it more & retry.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      break;
    }
  }

  if (!fast || !fast.next) {
    return null;
  }

  fast = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};