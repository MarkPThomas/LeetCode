// 2025/03/12
// O(n * long(n)) time complexity
// O(n) space complexity
// Time to complete: 8:50 min
// Patterns: Linked List, PQ, Sorting
// Notes w.r.t. solution: Passes, but doesn't satisfy extra credit aim of O(1) space (i.e. sort in place)
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
var sortList = function (head) {
  const vals = new PriorityQueue((a, b) => a[1] - b[1]);

  let node = head;
  while (node) {
    vals.enqueue([node, node.val]);
    node = node.next;
  }

  const sentinel = new ListNode();
  node = sentinel;
  while (vals.size()) {
    node.next = vals.dequeue()[0];
    node = node.next;
  }
  node.next = null;

  return sentinel.next;
};