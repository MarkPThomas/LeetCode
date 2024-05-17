// 2025/05/17
// O(n) time complexity
// O(n) space complexity
// Time to complete: 20:03 min
// Patterns: Linked List, Hashmap
// Notes w.r.t. solution: Initially went to stopping at 30 min due to working around a bug.
//    This bug turned out to just be choosing to use an object rather than Map() for the hashmap.
//    I looked this up, fixed the technicality, and it worked.
//    Time listed is assuming that technical assumption error wasn't made. Don't do this again!
//    For hashmaps with objects as keys, use Map.set/get/has. Objects stringify keys, so [Object object] is the key.
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  // keep hashmap of node indices for each node, the node itself & its random pointer target index
  //      if there is a target
  const random = {}
  const nodesToClones = new Map();

  // copy lists w/o random pointers
  let n = 0;
  let headClone = null;
  let prevClone = null;
  let node = head;
  while (node) {
    const nodeClone = { val: node.val, next: null, random: null }
    random[n] = node.random;
    nodesToClones.set(node, nodeClone);

    if (!headClone) {
      headClone = nodeClone;
      prevClone = headClone;
    } else {
      prevClone.next = nodeClone;
      prevClone = prevClone.next;
    }

    node = node.next;
    n++;
  }

  // run through hashmap on a 2nd pass, use n_rand to look up target, and associate node with it
  n = 0;
  let nodeClone = headClone;
  while (nodeClone) {
    const randomNode = random[n];
    if (randomNode) {
      const randomClone = nodesToClones.get(randomNode);
      nodeClone.random = randomClone;
    }

    nodeClone = nodeClone.next;
    n++;
  }

  return headClone;
};
