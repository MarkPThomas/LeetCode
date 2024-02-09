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