// 2025/02/07
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:04 min
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
 * @return {number}
 */
var pairSum = function (head) {
  // for i, twin = n - 1 - i
  //  where i <= (n / 2) - 1
  let n = 0;
  const vals = [];
  let node = head;
  while (node) {
    vals.push(node.val);
    n++;
    node = node.next;
  }

  let maxPairSum = 0;
  for (let i = 0; i <= n / 2 - 1; i++) {
    const twin = n - 1 - i;
    const twinSum = vals[i] + vals[twin];
    maxPairSum = Math.max(maxPairSum, twinSum);
  }

  return maxPairSum;
};