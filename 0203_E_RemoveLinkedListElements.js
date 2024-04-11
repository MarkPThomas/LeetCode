// 2024/04/11
// O(n) time complexity
// O(1) space complexity
// Time to complete: 14:14 min
// Patterns: Linked List
// Notes w.r.t. solution: Got bogged down in minor mistakes of handling head, then prev. Moved too fast!
//  Otherwise, closer to 3-4 min.
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
var removeElements = function (head, val) {
    if (!head) {
        return null;
    }

    let prev = null;
    let curr = head;
    while (curr) {
        if (curr.val === val) {
            if (curr === head) {
                head = head.next;
                curr.next = null;
                curr = head;
            } else if (prev) {
                prev.next = curr.next;
                curr = curr.next;
            }
        } else {
            prev = curr;
            curr = curr.next;
        }
    }

    return head;
};

// 2023/05
// O(N) time complexity
// O(1) space complexity
// Time to complete: 7 min
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements2023 = function (head, val) {
    if (!head) {
        return head;
    }
    let prevNode = head;
    let currNode = head.next;
    while (currNode) {
        if (currNode.val === val) {
            prevNode.next = currNode.next;
            currNode = currNode.next;
        } else {
            prevNode = prevNode.next;
            currNode = currNode.next;
        }
    }
    return head.val === val ? head.next : head;
};

// 2022
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
var removeElements2022 = function (head, val) {
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