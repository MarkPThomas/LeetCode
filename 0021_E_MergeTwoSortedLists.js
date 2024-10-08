// 2024/08/27
// O(n + m) time complexity
// O(n + m) space complexity
// where n = length of list 1, m = length of list 2
// Time to complete: 8:15 min
// Patterns: list structure, recursion
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null && list2 === null) {
    return null;
  }
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }

};

// 2024/04/20
// O(n + m) time complexity
// O(1) space complexity
// where n = length of list 1, m = length of list 2
// Time to complete: 12:33 min
// Patterns: list structure, 2 pointer
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const sentinel = { next: null };

  let prev = sentinel;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      prev.next = list1;
      list1 = list1.next;
    } else {
      prev.next = list2;
      list2 = list2.next;
    }
    prev = prev.next;
  }

  prev.next = list1 ? list1 : list2;

  return sentinel.next;
};


// 2024/04/15
// O(n + m) time complexity
// O(1) space complexity
// where n = length of list 1, m = length of list 2
// Time to complete:  25:18 min
// Patterns: list structure, 2 pointer
// Notes w.r.t. solution: Dumb mistakes. Overall concept was correct.
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (!list1) {
    return list2;
  } else if (!list2) {
    return list1;
  }

  let pre = null;
  let curr1 = list1.val <= list2.val ? list1 : list2;
  let curr2 = list2.val < list1.val ? list1 : list2;

  const head = curr1;

  while (curr1 && curr2) {
    while (curr1 && curr1.val <= curr2.val) {
      pre = curr1;
      curr1 = curr1.next;
    }

    pre.next = curr2;

    if (!curr1) {
      break;
    }

    while (curr2 && curr2.val < curr1.val) {
      pre = curr2;
      curr2 = curr2.next;
    }

    pre.next = curr1;
  }

  return head;
};

// 2023
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