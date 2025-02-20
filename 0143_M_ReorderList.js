// 2025/02/20
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Linked List
// Notes w.r.t. solution: Reworked prior solution w/ briefer/cleaner code
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head.next) {
    return head;
  }

  // Split list in half
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next?.next;
  }

  // Reverse second half
  let prevR = null;
  let nodeR = slow;
  while (nodeR) {
    const next = nodeR.next;
    nodeR.next = prevR;

    prevR = nodeR;
    nodeR = next;
  }

  // Split reversed half back as every other node
  let first = head;
  let second = prevR;
  while (second.next) {
    const firstNext = first.next;
    first.next = second;
    first = firstNext;

    const secondNext = second.next;
    second.next = first;
    second = secondNext;
  }

  return head;
};

// 2025/02/20
// O(n) time complexity
// O(1) space complexity
// Time to complete: 31:45 min
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head.next) {
    return head;
  }


  // Split list in half
  // +1 for odd #
  let slowPrev = null;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slowPrev = slow;
    slow = slow.next;
    fast = fast.next?.next;
  }
  slowPrev.next = null;

  // Reverse second half
  let prevR = null;
  let nodeR = slow;
  while (nodeR) {
    const next = nodeR.next;
    nodeR.next = prevR;

    prevR = nodeR;
    nodeR = next;
  }

  // Split reversed half back as every other node
  let prevI = null;
  let nodeI = prevR;

  let prev = null;
  let node = head;
  while (node || nodeI) {
    prev = node;
    if (node) {
      node = node.next;
    }

    prevI = nodeI;
    nodeI = nodeI.next;

    if (prev) {
      prev.next = prevI;
    }
    if (node) {
      prevI.next = node
    }
  }

  return head;
};