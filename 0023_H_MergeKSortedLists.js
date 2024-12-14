// 2024/12/13
// O(n * log(k)) time complexity
// O(1) space complexity
// where n = # nodes, k = # linked lists
// Time to complete: 15:52 min
// Patterns: Linked List, Divide & Conquer
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
  function mergeLists(listA, listB) {
    if (!listB) {
      return listA;
    }

    const sentinel = new ListNode();

    let node = sentinel;
    while (listA && listB) {
      if (listA.val <= listB.val) {
        node.next = listA;
        listA = listA.next;
      } else {
        node.next = listB;
        listB = listB.next;
      }
      node = node.next;
    }

    if (listA) {
      node.next = listA;
    } else if (listB) {
      node.next = listB;
    }

    return sentinel.next;
  }

  if (!lists.length) {
    return null;
  }

  let delta = 1;
  while (delta < lists.length) {
    for (let i = 0; i < lists.length; i += 2 * delta) {
      lists[i] = mergeLists(lists[i], lists[i + delta]);
    }
    delta *= 2;
  }

  return lists[0];
};

// 2024/12/12
// O(n * log(k)) time complexity
// O(k) space complexity
// where n = # nodes, k = # linked lists
// Time to complete: 6:49 min
// Patterns: Linked List, Priority Queue
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