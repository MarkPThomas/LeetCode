// 2024/11/13
// O(m + n) time complexity
// O(n) space complexity
//  where n = the length of the longer list, m is the length of the shorter list
// Time to complete: 28:50 min
// Patterns: Linked Lists
// Notes w.r.t. solution: Done as challenge of no reversing linked lists - Better to use stack
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  function getLength(list) {
    let length = 0;
    let node = list;
    while (node) {
      length++;
      node = node.next;
    }

    return length;
  }

  function getNum(list) {
    let num = '';

    let node = list;
    while (node) {
      num += node.val;
      node = node.next;
    }

    return num;
  }

  const length1 = getLength(l1);
  const length2 = getLength(l2);

  let long = length1 >= length2 ? l1 : l2;
  const short = length1 >= length2 ? l2 : l1;

  const numLong = getNum(long);
  const tensLong = numLong.length;

  const numShort = getNum(short);
  const tensShort = numShort.length;

  // Get powers of each
  let numSumDigits = Array(tensLong);
  let remainder = 0;
  let deltaIShort = tensLong - tensShort;
  for (let i = numLong.length - 1; i >= 0; i--) {
    const num1 = Number(numLong[i]);
    const num2 = (i >= deltaIShort ? Number(numShort[i - deltaIShort]) : 0);
    const sum = num1 + num2 + remainder;
    remainder = Math.floor(sum / 10);

    numSumDigits[i] = sum % 10;
  }

  const numSum = (remainder ? '1' : '') + numSumDigits.join('');
  const tensSum = numSum.length;

  // Determine head remainder node
  if (tensSum > tensLong) {
    const dummy = new ListNode(1, long);
    long = dummy;
  }

  let sumI = 0;
  let node = long;
  while (node && sumI < numSum.length) {
    node.val = Number(numSum[sumI])
    node = node.next;
    sumI++;
  }

  return long;
};

// 2024/11/13
// O(n + m) time complexity
// O(1) space complexity
//  where n = the length of the longer list, m is the length of the shorter list
// Time to complete: 14:05 min
// Patterns: Linked Lists
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  function reverseList(list) {
    let prev = null;
    let node = list;
    while (node) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return prev;
  }

  function getLength(list) {
    let length = 0;

    let node = list;
    while (node) {
      length++;
      node = node.next;
    }

    return length;
  }

  // Reverse lists
  l1 = reverseList(l1);
  l2 = reverseList(l2);

  // Get longer list
  let length1 = getLength(l1);
  let length2 = getLength(l2);
  const long = length1 >= length2 ? l1 : l2;
  const short = length1 >= length2 ? l2 : l1;

  // Add nodes, carry remainder forward, placing result in longer list
  let remainder = 0;

  let nodeLPrev = null;
  let nodeL = long;
  let nodeS = short;
  while (nodeS) {
    const sum = nodeL.val + nodeS.val + remainder;
    remainder = Math.floor(sum / 10);
    nodeL.val = sum % 10;

    nodeLPrev = nodeL;
    nodeL = nodeL.next;
    nodeS = nodeS.next;
  }

  while (nodeL) {
    const sum = nodeL.val + remainder;
    remainder = Math.floor(sum / 10);
    nodeL.val = sum % 10;

    nodeLPrev = nodeL;
    nodeL = nodeL.next;
  }

  // Add extra node at end if remainder at end
  if (remainder) {
    nodeLPrev.next = new ListNode(remainder);
  }

  // Reverse & return longer list
  return reverseList(long);

  // === No Reverse ===
  // 1 loop to get lengths for offsets
  // Update values in each node of the longer list
  //
};