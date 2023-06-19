// O(n) time complexity
// O(1) space complexity
// Time to complete: 1:15:00 min
// Patterns: Linked Lists
// Notes w.r.t. solution: After working out solution, jumped in too fast & then got bogged down in whack-a-mole.
//      Final solution went fast once I reworked from scratch properly :-/

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
var oddEvenList = function (head) {
  if (!head) {
    return head;
  }

  // create odd list, even list, then append even list to odd list
  let evenHead = null;
  let lastEvenNode = null;

  let oddNode = head;
  let lastOddNode = null;
  while (oddNode) {
    const evenNode = oddNode.next;
    if (evenNode) {
      if (!evenHead) {
        evenHead = evenNode;
        lastEvenNode = evenHead;
      } else {
        lastEvenNode.next = evenNode;
        lastEvenNode = lastEvenNode.next;
      }

      if (evenNode.next) {
        oddNode.next = evenNode.next;
        evenNode.next = null;
      } else {
        oddNode.next = null;
      }
    }
    lastOddNode = oddNode;
    oddNode = oddNode.next;
  }

  if (lastOddNode && evenHead) {
    lastOddNode.next = evenHead;
  }

  return head;
};