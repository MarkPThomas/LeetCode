// 2025/05/13
// O(max(m, n)) time complexity
// O(1) space complexity
// where m = length of list 1, n = length of list 2
// Time to complete: 23:31 min
// Patterns: Linked List
// Notes w.r.t. solution: Initially failed due to misreading example, which is symmetric. Read carefully, DO NOT reverse lists!
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  // sum, carrying remainders, building output list
  let remainder = 0;
  let dummyHead = { next: null };
  let prevNode = dummyHead;

  while (l1 || l2 || remainder) {
    const l1Val = l1 ? l1.val : 0;
    const l2Val = l2 ? l2.val : 0;

    let sum = l1Val + l2Val + remainder;

    remainder = sum >= 10 ? 1 : 0;
    if (remainder) {
      sum -= 10;
    }

    prevNode.next = { val: sum, next: null };
    prevNode = prevNode.next;

    l1 = l1?.next;
    l2 = l2?.next;
  }

  return dummyHead.next;
};