// 2024/04/27
// O(n) time complexity
// O(n) space complexity
// Time to complete: 11:40 min
// Patterns: Hashmap
// Notes w.r.t. solution: Create a queue from a linked list to optimize further
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var anagramMappings = function (nums1, nums2) {
  const indices = {};
  for (let i1 = 0; i1 < nums1.length; i1++) {
    const num1 = nums1[i1]
    if (!indices[num1]) {
      indices[num1] = [];
    }
    indices[num1].push(i1);
  }

  const mapping = Array(nums1.length);
  for (let i2 = 0; i2 < nums2.length; i2++) {
    const i1 = indices[nums2[i2]].shift();
    mapping[i1] = i2;
  }

  return mapping;
}


// 2023/06
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