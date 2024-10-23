// 2024/10/18
// O(n) time complexity
// O(1) space complexity
// Time to complete: x min
// Patterns: Linked List w/ 2 Pointers
// Notes w.r.t. solution: Just working out simplest/optimal solution.
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
var deleteMiddle = function (head) {
  let slow = head;
  let fast = head;
  let prev = null;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next?.next;
  }

  if (!prev) {
    head = slow.next;
  } else {
    prev.next = slow.next;
  }

  return head;
};


// 2024/10/18
// O(n) time complexity
// O(1) space complexity
// Time to complete: 15:02 min
// Patterns: Linked List w/ 2 passes
// Notes w.r.t. solution: Solved in 8:40 but had some funny math handling for mid node
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
var deleteMiddle = function (head) {
  // Traverse to get length
  let curr = head;
  let numNodes = 0;
  while (curr) {
    numNodes++;
    curr = curr.next;
  }

  // Traverse to calculated mid-node
  let numMid = Math.ceil(numNodes / 2) + (numNodes % 2 ? 0 : 1);

  const sentinel = new ListNode(-1, head);
  let prev = sentinel;
  curr = prev.next;
  while (curr) {
    numMid--;
    if (numMid) {
      prev = curr;
      curr = curr.next;
    } else {
      prev.next = curr.next;
      curr.next = null;

      return sentinel.next;
    }
  }

  return sentinel.next;
};

// 2023/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:00 min
// Patterns: Linked List w/ 2 Pointers
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
var deleteMiddle = function (head) {
  let nodeSlow = head;
  let nodeFast = head;
  let prevNode = null;
  while (nodeSlow) {
    if (!nodeFast || !nodeFast.next) {
      if (!prevNode) {
        head = nodeSlow.next;
      } else {
        prevNode.next = nodeSlow.next;
      }
      break;
    }
    prevNode = nodeSlow;
    nodeSlow = nodeSlow.next;
    nodeFast = nodeFast.next?.next;
  }

  return head;
};

// 2023/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: 12:00 min
// Patterns: Linked List w/ 2 passes
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
var deleteMiddle = function (head) {
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  const midIndex = Math.floor(length / 2);
  let index = -1;
  node = head;
  let prevNode = null;
  while (node) {
    index++;
    if (index === midIndex) {
      if (prevNode) {
        prevNode.next = node.next;
      } else {
        head = node.next;
      }
    }
    prevNode = node;
    node = node.next;
  }

  return head;
};