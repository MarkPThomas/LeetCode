// O(n) time complexity
// O(1) space complexity
// where n = length of linked list
// Time to complete: 26:00 min
// Patterns: Linked Lists
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
var swapPairs = function (head) {
  if (!head || head.next === null) {
    return head;
  }

  let count = 0;
  let node = head;
  let prevNode = null;
  while (node) {
    if (count % 2 === 0) {
      const { root, tail, nextNode } = reverseKNodes(node, 2);
      if (!prevNode) {
        head = root;
      } else {
        prevNode.next = root;
      }
      tail.next = nextNode;
      prevNode = tail;
      node = nextNode;
      count += 2;
    } else {
      prevNode = node;
      node = node.next;
      count++;
    }
  }
  return head;
};

function reverseKNodes(root, k) {
  let prevNode = null;
  let node = root;
  let count = 0;
  while (count < k && node) {
    let nextNode = node.next;
    node.next = prevNode;

    prevNode = node;
    node = nextNode;
    count++;
  }

  return { root: prevNode, tail: root, nextNode: node }
}