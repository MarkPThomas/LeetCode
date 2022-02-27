// O(N) time complexity
// O(1) space complexity
// Time to complete: 12:57 min (basically finished in 6:00 but got tripped up on minor linked list call)
// Patterns: Lin
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
 var deleteDuplicates = function(head) {
  let currentNode = head;
  while (currentNode && currentNode.next) {
      if (currentNode.val === currentNode.next.val) {
          currentNode.next = currentNode.next.next;
      } else {
          currentNode = currentNode.next;
      }
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