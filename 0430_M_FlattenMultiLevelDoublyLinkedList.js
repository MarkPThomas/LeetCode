// O(n) time complexity
// O(n) space complexity
// Time to complete: 26:46 min
// Patterns: Linked List
// Notes w.r.t. solution: Wrote out main code in 9:42 min. Remaining time was for debugging. Careful! Draw out cases.

/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  function flattenChild(head) {
    let node = head;
    let tail = node;
    while (node) {
      const nextNode = node.next;
      if (node.child) {
        // get flattened child list
        let [childHead, childTail] = flattenChild(node.child);

        tail = childTail;

        // insert before next
        node.next = childHead;
        if (childHead) {
          childHead.prev = node;
        }

        if (childTail) {
          childTail.next = nextNode;
        }

        if (nextNode) {
          nextNode.prev = childTail;
        }

        node.child = null;
      }

      if (nextNode) {
        tail = nextNode;
      }
      node = nextNode;
    }

    return [head, tail];
  }
  return flattenChild(head)[0];
};