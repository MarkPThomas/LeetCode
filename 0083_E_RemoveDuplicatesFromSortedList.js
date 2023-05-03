// 2023
// O(n) time complexity
// O(1) space complexity
// Time to complete: 3 min
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
var deleteDuplicates = function (head) {
    if (!head) {
        return head;
    }

    let prevNode = head;
    let nextNode = head.next;
    while (nextNode) {
        if (prevNode.val === nextNode.val) {
            prevNode.next = nextNode.next;
        } else {
            prevNode = prevNode.next;
        }
        nextNode = nextNode.next;
    }
    if (prevNode.val === head.val) {
        head.next = null;
    }

    return head;
};

// 2022
// O(N) time complexity
// O(1) space complexity
// Time to complete: 12:57 min (basically finished in 6:00 but got tripped up on minor linked list call)
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
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