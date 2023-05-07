// 2023
// O(n) time complexity
// O(1) space complexity
// Time to complete: 10 min
// Patterns: Linked list, 2 runners
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head) {
        return false;
    }
    let slow = head;
    let fast = head;
    do {
        if (fast.next === null || fast.next.next === null) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    } while (slow !== fast)

    return true;
};


// 2022
// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:09 min
// Patterns: Linked list, 2 runners
// Notes w.r.t. solution: Got the best case!

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    let ptrSlow = head;
    let ptrFast = head;

    while (ptrSlow !== null && ptrFast !== null) {
        ptrSlow = ptrSlow.next;
        ptrFast = ptrFast.next;
        if (ptrFast === null) {
            break;
        } else {
            ptrFast = ptrFast.next;
        }
        if (ptrSlow === ptrFast) {
            return true;
        }
    }
    return false;
};