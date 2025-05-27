// 2024/05/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 30:03 min
// Patterns: Linked List
// Notes w.r.t. solution: Mostly solved in 20 min. Work out cases/diagram more carefully!
/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
  // Case 2a/3a if i (end) === j (start)

  function shouldInsert(node, insertNode) {
    if (node.val <= node.next.val
      && node.val <= insertVal && insertVal <= node.next.val) {
      // Case 1: i < val < j
      return true;
    } else if (node.val > node.next.val
      && (node.val <= insertVal || insertVal <= node.next.val)) {
      // Case 2 & Case 3 both occur at the same location (between max/min val)
      //  @ max/min loc when i > j
      // Case 2: i (end) < val
      // Case 3: val < j (start)
      return true;
    } else if (node.next === head && node.val === node.next.val) {
      // End of linked list @ i ref = j
      // Case 2a or 3a - End/Beginning vals of the list are equal, insert between end & beginning
      return true;
    }

    return false;
  }

  const insertNode = new Node(insertVal);

  if (!head) {
    insertNode.next = insertNode;

    return insertNode;
  }

  let node = head;
  do {
    if (shouldInsert(node, insertNode)) {        // Case 2a/3a
      insertNode.next = node.next;
      node.next = insertNode;

      return head;
    }

    node = node.next;
  } while (node !== head)

  return head;
};


// 2024/05/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 36:03 min
// Patterns: Linked List
// Notes w.r.t. solution: Lost time on some rabbit holes. Diagram more carefull!
//    Also, remember best way to check cycles is just compare a reference. 'Visited' are strategies for > 1D

/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
  const insertNode = { val: insertVal, next: null };

  if (!head) {
    insertNode.next = insertNode;
    return insertNode;
  }

  function insertAndBreak(prev, node, insertVal, head) {
    return (
      // position between 2 values
      (prev.val <= insertVal && insertVal <= node.val)
      // list wraparound encountered & value is between end/start
      || (prev.val > node.val && (prev.val <= insertVal || insertVal <= node.val))
      //  cycle completed
      || (node === head)
    );
  }

  let node = head.next;
  let prev = head;
  while (node) {
    if (insertAndBreak(prev, node, insertVal, head)) {
      prev.next = insertNode;
      insertNode.next = node;

      return head;
    }

    prev = prev.next;
    node = node.next;
  }

  return head;
};