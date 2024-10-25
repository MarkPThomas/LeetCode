// 2024/10/25
// O(n) time complexity
// O(1) space complexity
// Time to complete: 23:16 min
// Patterns: Linked Lists
// Notes w.r.t. solution: Mostly solved in 13:00.
//  Took another 7 min to account for even ending.
//  Then 3 min for minor null assignment error.
//  Would have solved closer to 13 min if I had diagrammed out both cases before starting.
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

  const sentinelEven = new ListNode();
  sentinelEven.next = head.next;

  let odd = head;
  let even = sentinelEven.next;
  while (even) {
    odd.next = even.next;
    even.next = even.next?.next ?? null;

    // Avoid setting odd to null at last step so that we always have a valid odd tail to connect to even list
    if (odd.next) {
      odd = odd.next;
    }
    even = even.next;
  }

  odd.next = sentinelEven.next;

  return head;
};

// MOST CONCISE SOLUTION (not mine):
// var oddEvenList = function (head) {
//     if (head == null) return null;
//     let odd = head;
//     let evenHead = head.next;
//     let even = evenHead;
//     while (even != null && even.next != null) {
//         odd.next = even.next;
//         odd = odd.next;
//         even.next = odd.next;
//         even = even.next;
//     }
//     odd.next = evenHead;
//     return head;
// }

// 2023/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: 1:15:00 min
// Patterns: Linked Lists
// Notes w.r.t. solution: After working out solution, jumped in too fast & then got bogged down in whack-a-mole.
//     Final solution went fast once I reworked from scratch properly :-/
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