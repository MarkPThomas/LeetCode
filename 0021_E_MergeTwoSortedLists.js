// O(N) time complexity
// O(1) space complexity
// Time to complete: Too long
// Patterns: list structure, 2 pointer, sentry node
// Notes w.r.t. solution: I was on the right track but got bogged down. Having paper to sketch/visualize would have helped.


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

 function ListNode(val, next) {
  let node = {};
  node.val = (val===undefined ? 0 : val)
  node.next = (next===undefined ? null : next)
  return node;
}

/**
* @param {ListNode} list1
* @param {ListNode} list2
* @return {ListNode}
*/
var mergeTwoLists = function(list1, list2) {
  let sentryNode = ListNode(-1);
  let ptrNode = sentryNode;

  // Splice lists
  while (list1 && list2) {
      if (list1.val <= list2.val) {
          ptrNode.next = list1; // Build list
          list1 = list1.next; // Advance pointer on list1
      } else {
          ptrNode.next = list2; // Build list
          list2 = list2.next; // Advance pointer on list2
      }
      ptrNode = ptrNode.next; // Move to end of new list
  }

  // if any linked list remains, append it;
  ptrNode.next = list1 ? list1 : list2;

  return sentryNode.next;
};