// 2024/04/16
// O(n) time complexity
// O(1) space complexity
// Time to complete: 10 min
// Patterns: Linked Lists, Sentinel Head
// Notes w.r.t. solution: Lost a lot of time w/o Sentinel at first, handling initial null for PrevNode.
//    Spent +11 min futzing with this before realizing sentinel might be better.
//    Time includes up to infinite loop bug + time to implement sentinel node.
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
  let prevNode = { next: head };

  while (prevNode) {
    let keep = m;
    while (keep && prevNode) {
      prevNode = prevNode.next;
      keep--;
    }

    if (prevNode) {
      let nextNode = prevNode.next;
      let skip = n;
      while (skip && nextNode) {
        nextNode = nextNode.next;
        skip--;
      }

      prevNode.next = nextNode;
    }
  }

  return head;
};



// 2023/06
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
var deleteNodes2023 = function (head, m, n) {
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
