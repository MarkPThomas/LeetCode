// O(N) time complexity
// O(1) space complexity
// Time to complete: 12:20 min (8:30 min but had to debug)
// Patterns: Sentinel node (not used here, but see solution: https://leetcode.com/problems/remove-linked-list-elements/solution/)
// Notes w.r.t. solution: I did not use a sentinel node but still have the same time-space complexity

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
 var removeElements = function(head, val) {
  let node = head;

  while (node) {
      // Reset node link to next node that does not match val, stopping at the end
      while (node.next && node.next.val === val) {
          node.next = node.next.next;
      }
      node = node.next;
  }

  // Check head
  if (head && head.val === val) {
      head = head.next;
  }
  return head;
};

// Test later
// const testCases = [
// { input: '',
//   expected: ''},
// ];

// testCases.forEach((testCase) => {
//   // let result = FUT(testCase.input); // insert function name here
//   let pass = result === testCase.expected;
//   console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
//   }
// );