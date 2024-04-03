// 2024/04/03
// O(n + m) time complexity
// O(1) space complexity
// where n = length of list A, m = length of list B
// Time to complete: 7:00 min
// Patterns: 2-pointer, Linked List
// Notes w.r.t. solution:
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let nodeA = headA;
    let nodeB = headB;

    while (nodeA !== nodeB) {
        nodeA = (nodeA !== null) ? nodeA.next : headB;
        nodeB = (nodeB !== null) ? nodeB.next : headA;
    }

    return nodeA;
};

// 2023
// O(n + m) time complexity
// O(1) space complexity
// Time to complete: 6 min
// Patterns: 2-pointer, Linked List
// Notes w.r.t. solution:
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode2023 = function (headA, headB) {
    let ptrA = headA;
    let ptrB = headB;
    while (ptrA !== ptrB) {
        ptrA = ptrA === null ? headB : ptrA.next;
        ptrB = ptrB === null ? headA : ptrB.next;
    }
    return ptrA;
};

// 2022
// O(n*m) time complexity for brute force, O(n+m) time complexity for other 2 solutions
// O(1) space complexity for O(n*m) brute force, O(m+n) for O(m+n) queue case, O(m) for hash case. O(1) for 2-pointer case
// Time to complete:
//    Brute Force: 13:15 min for O(n*m) brute force,
//    Queue Case: 21 min till debug (7:45 min extra), 31 min after debug (17:45 min extra) for O(2m+2n) = O(m+n)
//    Hash Case: Looked at solution, also hash table w/ JS was working funny. Not worth it here?
//    2-Pointer Case: Looked at solution
// Patterns: 2-pointer
// Notes w.r.t. solution:
//    Hash table operates similar to queue except each list needs only be traversed once
//    2-pointer case really innovative! Remember this one

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNodeBruteSol = function (headA, headB) {
    // It appears that the lists merge rather than cross at intersection
    // Intersection must be determined by next reference & not val!

    // Brute force solution O(n*m)
    let nodeA = headA;
    let nodeB = headB;
    while (nodeA) {
        while (nodeB) {
            if (nodeA === nodeB) {
                return nodeA;
            } else {
                nodeB = nodeB.next;
            }
        }
        nodeA = nodeA.next;
        nodeB = headB;
    }

    return null;
};

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNodeImprovedSol = function (headA, headB) {
    // It appears that the lists merge rather than cross at intersection
    // Intersection must be determined by next reference & not val!

    // improved solution w/ array queue
    let nodeA = headA;
    let nodeB = headB;
    if (!nodeA || !nodeB) {
        return null;
    }
    if (nodeA === nodeB) {
        return nodeA;
    }

    let queueA = [nodeA];
    let queueB = [nodeB];

    // get tail nodes to start
    while (nodeA.next) {
        queueA.push(nodeA.next);
        nodeA = nodeA.next;
    }
    while (nodeB.next) {
        queueB.push(nodeB.next);
        nodeB = nodeB.next;
    }

    // Work backwards through linked lists until division is found
    let indexA = queueA.length - 1;
    let indexB = queueB.length - 1;
    while (indexA >= 0 && indexB >= 0) {
        if (queueA[indexA] === queueB[indexB]) {
            indexA--;
            indexB--;
            // if one lists terminates early here, that is where the intersection occurs
            if (indexA < 0 && 0 <= indexB) {
                indexB++;
                return queueB[indexB];
            } else if (indexB < 0 && 0 <= indexA) {
                indexA++;
                return queueA[indexA];
            }
        } else {
            indexA++;
            return queueA[indexA];
        }
    }

    return null;
};

/**
* @param {ListNode} headA
* @param {ListNode} headB
* @return {ListNode}
*/
var getIntersectionNodeBestSol = function (headA, headB) {
    // best solution O(n+m) w/ O(1) space complexity
    let pA = headA;
    let pB = headB;

    while (pA !== pB) {
        pA = (pA === null) ? headB : pA.next;
        pB = (pB === null) ? headA : pB.next;
    }
    return pA;
};