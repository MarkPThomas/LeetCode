// 2024/05/16
// O(n) time complexity
// O(1) space complexity
// Time to complete: 20:15 min
// Patterns: Linked List, 2 Pointers
// Notes w.r.t. solution: Solved main in 10:04, debuggin took to 17:09, final tweaks to final time.
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) {
    return head;
  }

  // Remove last k nodes & append to head
  function getKNodes(head, k) {
    let node = head;
    let kNode = head;
    let count = k;
    let size = 1;
    while (node.next) {
      node = node.next;
      size++;
      if (count) {
        count--;
      } else {
        kNode = kNode.next;
      }
    }

    return [kNode, node, size];
  }

  let [kNode, node, size] = getKNodes(head, k);

  // if k > length, take size, and repeat with k modulus size
  if (k >= size) {
    [kNode, node] = getKNodes(head, k % size);
  }

  node.next = head;
  head = kNode.next;
  kNode.next = null;

  return head;
};