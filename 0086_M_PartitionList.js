// 2025/03/23
// O(n) time complexity
// O(1) space complexity
// Time to complete: 6:50 min
// Patterns: Linked List - Two Pointer
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  const sentinelPre = new ListNode();
  const sentinelPost = new ListNode();

  let node = head;
  let pre = sentinelPre;
  let post = sentinelPost;
  while (node) {
    // add node to corresponding sentinel
    if (node.val < x) {
      pre.next = node;
      pre = pre.next;
    } else {
      post.next = node;
      post = post.next;
    }
    node = node.next;
  }
  post.next = null;

  // Join last of pre to first of post
  pre.next = sentinelPost.next;

  return sentinelPre.next;
};