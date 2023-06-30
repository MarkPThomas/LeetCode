// O(n) time complexity
// O(n) space complexity
// Time to complete: 15 min
// Patterns: Hash Map
// Notes w.r.t. solution: Hash map in JavaScript returns a match for any stored node if a cycle exists, and node values are not unique.
// The closest approximation here can only be done by adding a new property to nodes as they are visited and checking for this property.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let node = head;
  while (node) {
    if (node.visited) {
      return node;
    }
    node.visited = true;
    node = node.next;
  }
  return null;
};