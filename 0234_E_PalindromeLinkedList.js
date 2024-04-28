// 2024/04/28
// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:00/29:26/31:43 min
// Patterns:
// Notes w.r.t. solution: 17 min to solve, 29:26 min to finish debug , 31:43 min to reform original list.
// Split list @ middle cost a lot of debugging time. Learn this better.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  function splitList(head) {
    if (!head) {
      return head;
    }

    let mid = null;
    let prev = head;
    let slow = head;
    let fast = head;
    while (fast) {
      slow = slow.next;
      fast = fast.next?.next;

      if (!fast) {
        head = slow;
        if (prev) {
          prev.next = null;
        }
        break;
      } else if (!fast.next) {
        mid = slow;
        slow = slow.next;
        break;
      }

      prev = slow;
    }
    head = slow;

    return [head, prev, mid];
  } // T: O(n)

  function reverseList(head) {
    if (!head) {
      return head;
    }

    let prev = null;
    let next = head;

    while (next) {
      head = next;
      next = next.next;
      head.next = prev;
      prev = head;
    }

    return head;
  } // T: O(n)

  function arePalindromes(head1, head2) {
    if (!head1 || !head2) {
      return false;
    }

    while (head1 && head2) {
      if (head1.val !== head2.val) {
        return false;
      }
      head1 = head1.next;
      head2 = head2.next;
    }

    return true;
  } // T: O(n)

  let [head2, tail, midNode] = splitList(head);
  if (!head2) {
    return true;
  }

  head2 = reverseList(head2);

  const result = arePalindromes(head, head2);

  head2 = reverseList(head2);

  if (midNode) {
    tail.next = midNode;
    midNode.next = head2;
  } else {
    tail.next = head2;
  }

  return result;
};