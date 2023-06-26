// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:00 min w/ array queue, 11:00 w/ linked list queue
// Patterns: Hash map, queue
// Notes w.r.t. solution:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var anagramMappings = function (nums1, nums2) {
  const indices = {};
  for (let i = 0; i < nums2.length; i++) {
    if (!indices[nums2[i]]) {
      indices[nums2[i]] = new QueueLL();
    }
    indices[nums2[i]].enqueue(i);
  }

  const mapping = [];
  for (let i = 0; i < nums1.length; i++) {
    let numIndices = indices[nums1[i]];
    const val = numIndices.dequeue();
    mapping.push(val);
  }
  return mapping;
};

class Node {
  val;
  next;
  constructor(val) {
    this.val = val;
  }
}

class QueueLL {
  head = null;
  tail = null;

  enqueue(val) {
    const node = new Node(val);
    if (this.tail) {
      this.tail.next = node;
      this.tail = this.tail.next;
    } else {
      this.head = node;
      this.tail = node;
    }
  }

  dequeue() {
    let removedNode = this.head;
    if (removedNode) {
      this.head = this.head.next;
      return removedNode.val;
    }
  }
}