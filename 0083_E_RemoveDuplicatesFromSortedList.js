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
var deleteDuplicates2022 = function (head) {
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
var deleteDuplicates2023 = function (head) {
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

// 2023 Solution
// O(n) time complexity
// O(1) space complexity
// where n = length of the input numbers
// Time to complete: 8:09
// Patterns: 2 pointers, runner technique
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
var deleteDuplicates20240229 = function (head) {
    if (!head || !head.next) {
        return head;
    }

    let ptr1 = head;
    let ptr2 = head.next;

    while (ptr1 && ptr2) {
        if (ptr2.val === ptr1.val) {
            while (ptr2 && ptr2.val === ptr1.val) {
                ptr2 = ptr2.next;
            }

            ptr1.next = ptr2;
        }

        ptr1 = ptr1.next;
        if (ptr1) {
            ptr2 = ptr1.next;
        } else {
            break;
        }
    }

    return head;
};