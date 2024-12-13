// 2024/12/12
// O(n * log(k)) time complexity
// O(k) space complexity
// where n = # nodes, k = # linked lists
// Time to complete: 6:49 min
// Patterns: Priority Queue, Linked List
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const pq = new PriorityQueue({ compare: (a, b) => a.val - b.val });

  for (const list of lists) {
    if (list) {
      pq.enqueue(list);
    }
  }

  const sentinel = new ListNode();
  let tail = sentinel;
  while (pq.size()) {
    const node = pq.dequeue();

    tail.next = node;
    tail = node;

    if (node.next) {
      pq.enqueue(node.next);
    }
  }

  return sentinel.next;
};