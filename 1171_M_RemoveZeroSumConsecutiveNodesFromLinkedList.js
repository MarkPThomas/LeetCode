// 2024/10/26
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA
// Patterns: Linked List, Prefix sum, Hashmap
// Notes w.r.t. solution: Worked out single pass where hashmap is updated for removals as we go
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
var removeZeroSumSublists = function (head) {
  const sentinel = new ListNode(null, head);

  let visited = { 0: sentinel }
  let node = sentinel.next;
  let sum = 0;

  while (node) {
    sum += node.val;

    if (visited.hasOwnProperty(sum)) {
      let remove = null;
      let repeat = visited[sum].next;

      // Detach sequence & advance past
      visited[sum].next = node.next;
      node.next = null;
      node = visited[sum].next;

      // Remove sequence from hash table
      const triggerSum = sum;
      while (repeat) {
        sum += repeat.val;
        remove = repeat;
        repeat = repeat.next;

        if (sum && sum !== triggerSum) {
          delete visited[sum];
        }
      }
    } else {
      visited[sum] = node;
      node = node.next;
    }
  }

  return sentinel.next;
};


// 2024/10/26
// O(m * n) -> O(n) time complexity
// O(n) space complexity
//  where n = # nodes, m = # passes on LL, which is < n & decreasing with each pass, so , n < m * n < n^2
// Time to complete: 29:31 (22:00)
// Patterns: Linked List, Prefix sum, Hashmap
// Notes w.r.t. solution: Mostly solved in 21:00.
//  Had minor console.log read bug that took time to work out.
//  Remainder of tweaks took about a minute.
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
var removeZeroSumSublists = function (head) {
  const sentinel = new ListNode(null, head);

  let remove = false;
  do {
    let visited = { 0: sentinel }
    let node = sentinel.next;
    let sum = 0;
    remove = false;

    while (node) {
      sum += node.val;

      if (visited.hasOwnProperty(sum)) {
        remove = true;

        visited[sum].next = node.next;
        node.next = null;

        break;
      } else {
        visited[sum] = node;
        node = node.next;
      }
    }
  } while (remove)

  return sentinel.next;
};


// 2023/04
// O() time complexity
// O(1) space complexity
// Time to complete: xx min 11:19-
// Patterns:
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
var removeZeroSumSublists = function (head) {
  let nodesRemoved = false;

  do {
    nodesRemoved = false;
    let node = head;
    let prevNode = null;
    let sumPrev = null;
    let sumEnd = head;
    let runningSum = 0;
    while (node && node.next) {
      // console.log('node.val: ', node.val)
      // console.log('node.next.val: ', node.next.val)
      if (node.val === -1 * node.next.val) {
        // Remove adjacent nodes
        console.log('Remove adjacent nodes')
        console.log('head: ', head)
        console.log('prevNode: ', prevNode)
        nodesRemoved = true;
        if (!prevNode) {
          head = node.next.next;
        } else {
          prevNode.next = node.next.next;
        }
        node = node.next.next;
        // } else if (runningSum + node.val === -1 * node.next.val) {
        //     // Remove prior running sum, inclusive
        // nodesRemoved = true;
        //     if (!sumPrev) {
        //         head = node.next.next;
        //     } else {
        //         sumPrev.next = node.next.next;
        //     }
        //     prevNode = sumPrev;
        //     runningSum = 0;
        //     sumEnd = sumPrev;
        //     node = node.next.next;
      } else {
        if (sumPrev === null) {
          sumPrev = prevNode;
        }
        runningSum += node.val;
        sumEnd = node;
        prevNode = node;
        node = node.next;
      }
    }
  } while (nodesRemoved)

  return head;
};