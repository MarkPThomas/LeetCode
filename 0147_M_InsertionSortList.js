// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:32 min
// Patterns: Linked List, Insertion Sort
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
var insertionSortList = function (head) {
  let sorted = null;

  while (head) {
    const place = head;
    head = head.next;
    place.next = null;

    if (!sorted) {
      sorted = place;
    } else {
      let prev = null;
      let curr = sorted;
      while (curr && place.val > curr.val) {
        prev = curr;
        curr = curr.next;
      }

      place.next = curr;

      if (prev) {
        prev.next = place;
      } else {
        sorted = place;
      }
    }
  }

  return sorted;
};