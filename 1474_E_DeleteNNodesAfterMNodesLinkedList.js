// O(n) time complexity
// O(1) space complexity
// Time to complete: 19 min (wrong method), 9 min (right method)
// Patterns: Linked Lists
// Notes w.r.t. solution: Was unnclear about handling remainder nodes. This required working a different solution.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var deleteNodes = function (head, m, n) {
  let node = head;
  let prevNode = null;
  let counterM = 1;
  let counterN = 1;
  while (node) {
    if (counterM % m === 0) {
      prevNode = node;
      while (node && counterN % (n + 1)) {
        node = node.next;
        prevNode.next = node;
        counterN++;
      }
      if (node) {
        node = node.next;
        prevNode.next = node;
      }
      counterM = 1;
      counterN = 1;
      prevNode = prevNode.next;
    } else {
      prevNode = node;
      node = node.next;
      counterM++;
    }
  }
  return head;
};
