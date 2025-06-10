// 2025/06/10
// O(n) time complexity
// O(n) space complexity
// Time to complete: 2:38 min
// Patterns: Linked List, Stack
// Notes w.r.t. solution: Linear time, linear space
/**
 * // This is the ImmutableListNode's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function ImmutableListNode() {
 *    @ return {void}
 *    this.printValue = function() { // print the value of this node.
 *       ...
 *    };
 *
 *    @return {ImmutableListNode}
 *    this.getNext = function() { // return the next node.
 *       ...
 *    };
 * };
 */

/**
 * @param {ImmutableListNode} head
 * @return {void}
 */
var printLinkedListInReverse = function (head) {
  // linear time, linear space complexity solution
  const nodes = [];
  while (head) {
    nodes.push(head);
    head = head.getNext();
  }

  while (nodes.length) {
    const node = nodes.pop();
    node.printValue();
  }
};

// 2025/06/10
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 9:42 min
// Patterns: Linked List
// Notes w.r.t. solution: Constant Space solution
/**
 * // This is the ImmutableListNode's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function ImmutableListNode() {
 *    @ return {void}
 *    this.printValue = function() { // print the value of this node.
 *       ...
 *    };
 *
 *    @return {ImmutableListNode}
 *    this.getNext = function() { // return the next node.
 *       ...
 *    };
 * };
 */

/**
 * @param {ImmutableListNode} head
 * @return {void}
 */
var printLinkedListInReverse = function (head) {
  // constant space complexity solution
  // Get length of list
  // Repeat, but print on last #, decrement #
  function getMaxCount(head) {
    let count = 0;
    let node = head;
    while (node) {
      count++;
      node = node.getNext();
    }

    return count;
  }

  function printAtCount(count) {
    let node = head;
    while (node) {
      count--;
      if (!count) {
        node.printValue();
        return;
      }
      node = node.getNext();
    }
  }

  let maxCount = getMaxCount(head);
  while (maxCount) {
    printAtCount(maxCount);
    maxCount--;
  }
};