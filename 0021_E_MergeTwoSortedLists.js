// O(n + m) time complexity
// O(1) space complexity
// where n = length of list 1, m = length of list 2
// Time to complete: 14 min
// Patterns: list structure, 2 pointer
// Notes w.r.t. solution: 2023 solution is slightly faster by avoiding instantiating more data structures,
//    although it isn't quite as readable due to less abstraction.
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 2023 Solution
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }

  let ptr1 = list1;
  let ptr2 = list2;
  let head;
  if (list1.val <= list2.val) {
    head = ptr1;
    ptr1 = ptr1.next;
  } else {
    head = ptr2;
    ptr2 = ptr2.next;
  }

  let current = head;
  while (ptr1 || ptr2) {
    if (ptr1 === null) {
      current.next = ptr2;
      break;
    }
    if (ptr2 === null) {
      current.next = ptr1;
      break;
    }
    if (ptr1.val <= ptr2.val) {
      current.next = ptr1;
      ptr1 = ptr1.next;
    } else {
      current.next = ptr2;
      ptr2 = ptr2.next;
    }

    current = current.next;
  }
  return head;
};

// 2022 Solution
// O(n + m) time complexity
// O(1) space complexity
// where n = length of list 1, m = length of list 2
// Time to complete: Too long
// Patterns: list structure, 2 pointer, sentry node
// Notes w.r.t. solution: I was on the right track but got bogged down. Having paper to sketch/visualize would have helped.
function ListNode(val, next) {
  let node = {};
  node.val = (val === undefined ? 0 : val)
  node.next = (next === undefined ? null : next)
  return node;
}

/**
* @param {ListNode} list1
* @param {ListNode} list2
* @return {ListNode}
*/
var mergeTwoLists_2022 = function (list1, list2) {
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