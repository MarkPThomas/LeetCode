// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:09 min
// Patterns: Linked list, 2 runners
// Notes w.r.t. solution: Got the best case!

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var hasCycle = function(head) {
  let ptrSlow = head;
  let ptrFast = head;

  while (ptrSlow !== null && ptrFast !== null) {
      ptrSlow = ptrSlow.next;
      ptrFast = ptrFast.next;
      if (ptrFast === null) {
          break;
      } else {
         ptrFast = ptrFast.next;
      }
      if (ptrSlow === ptrFast) {
          return true;
      }
  }
  return false;
};