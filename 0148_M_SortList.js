// 2025/03/12
// O(n * long(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 11:30 min
// Patterns: Linked List, Divide & Conquer, MergeSort
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
var sortList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const mid = getMid(head);
  const left = sortList(head);
  const right = sortList(mid);

  return merge(left, right);

  function getMid(head) {
    let slow = null;
    let fast = head;
    while (fast && fast.next) {
      slow = !slow ? head : slow.next;
      fast = fast.next.next;
    }
    const mid = slow.next;
    slow.next = null;

    return mid;
  }

  function merge(list1, list2) {
    const sentinel = new ListNode();
    let node = sentinel;
    while (list1 && list2) {
      if (list1.val < list2.val) {
        node.next = list1;
        list1 = list1.next;
      } else {
        node.next = list2;
        list2 = list2.next;
      }
      node = node.next;
    }
    node.next = list1 ? list1 : list2;

    return sentinel.next;
  }
};

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