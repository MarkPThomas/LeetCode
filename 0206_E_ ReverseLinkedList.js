// 2024/04/10
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4:52 min
// Patterns: Linked List
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
var reverseList = function (head) {
  let newHead = null;

  while (head) {
    const node = head;
    head = head.next;
    node.next = newHead;
    newHead = node;
  }

  return newHead;
};


// 2023/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 14 min
// Patterns: In-Place Reversal of Linked List
// Notes w.r.t. solution: Remembered it, but was a bit rusty

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
var reverseList2023 = function (head) {
  let currNode = head;
  let prevNode = null;
  while (currNode) {
    let nextNode = currNode.next;
    currNode.next = prevNode;

    prevNode = currNode;
    currNode = nextNode;
  }

  return prevNode;
};

const testCases = [
  {
    input: '',
    expected: ''
  },
];

testCases.forEach((testCase) => {
  // let result = FUT(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);