// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:53 min
// Patterns: Linked List
// Notes w.r.t. solution: Would have solved in 6:43 but had to work out case of cycle @ head
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
  let fast = head;
  let slow = head;
  let cycleConfirmed = false;

  while (fast && slow) {
    slow = slow.next;
    fast = fast.next;
    if (!cycleConfirmed && fast) {
      fast = fast.next;
    }

    if (fast && fast === slow) {
      if (fast === head || cycleConfirmed) {
        return fast;
      } else {
        cycleConfirmed = true;
        fast = head;
      }
    }
  }

  return null;
};

// O(n) time complexity
// O(1) space complexity
// Time to complete: 30 min
// Patterns: Linked List
// Notes w.r.t. solution: Had to cheat & look at algorithm again.
//    Subtle details of algorithm throw it off. Study it more & retry.

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