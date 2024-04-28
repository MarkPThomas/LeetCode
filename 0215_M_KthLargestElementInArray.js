// 2024/04/28
// O(n * log(k)) time complexity
// O(1) space complexity
// where n = # items, k = kth largest
// Time to complete: 1:10 min
// Patterns: Heap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const maxHeap = new MaxHeap(nums);

  let kth = 0;
  for (let i = 0; i < k; i++) {
    kth = maxHeap.remove();
  }

  return kth;
};


// 2024/04/28
// O(n * k) time complexity
// O(k) space complexity
// Time to complete: 10:21 min
// Patterns: Hashmap
// Notes w.r.t. solution: w/o heap, with k passes & hash map check for top kth element.
//  This is too slow for LeetCode. Heaps are required for speed.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const kthLargest = {};

  let lastMax = -Infinity;
  for (let i = 0; i < k; i++) {
    let max = -Infinity;
    let iMax = 0;

    for (let j = 0; j < nums.length; j++) {
      let num = nums[j]
      if (max <= num && !kthLargest.hasOwnProperty(j)) {
        max = num;
        iMax = j;
      }
    }

    kthLargest[iMax] = max;
    lastMax = max;
  }

  return lastMax;
};

class MaxHeap {
  size = 0;
  items = [];

  constructor(items = []) {
    if (Array.isArray(items)) {
      this.items = [...items];
    } else {
      this.items = [items];
    }
    this.size = this.items.length;

    const lastParentIndex = Math.floor(this.size / 2) - 1;

    for (let i = lastParentIndex; 0 <= i; i--) {
      this.heapifyDown(i);
    }
  }

  insert(score) {
    const targetIndex = this.items.push(score) - 1;
    this.size++;

    this.heapifyUp(targetIndex);

    return this.size;
  }

  remove() {
    let val = this.items[0];

    this.swap(0, this.size - 1);
    this.size--;
    this.heapifyDown(0);

    return val;
  }

  heapifyDown(startIndex = this.size - 1) {
    let targetIndex = Math.min(Math.max(0, startIndex), this.size - 1);

    while (targetIndex < this.size - 1) {
      let swapIndex = targetIndex;
      swapIndex = this.considerChildSwap(swapIndex, 1, targetIndex);
      swapIndex = this.considerChildSwap(swapIndex, 2, targetIndex);

      if (swapIndex === targetIndex) {
        break;
      } else {
        this.swap(targetIndex, swapIndex);
        targetIndex = swapIndex;
      }
    }
  }

  considerChildSwap(swapIndex, childNumber, targetIndex) {
    const childIndex = 2 * targetIndex + childNumber;

    return (childIndex <= this.size - 1 && this.shouldSwap(childIndex, swapIndex))
      ? childIndex
      : swapIndex;
  }

  heapifyUp(startIndex = this.size - 1) {
    let targetIndex = Math.min(Math.max(0, startIndex), this.size - 1);
    let parentIndex = this.getParentIndex(targetIndex);

    while (parentIndex >= 0 && this.shouldSwap(targetIndex, parentIndex)) {
      this.swap(targetIndex, parentIndex);

      targetIndex = parentIndex;
      parentIndex = this.getParentIndex(targetIndex);
    }
  }

  shouldSwap(indexChild, indexParent) {
    return this.items[indexChild] > this.items[indexParent];
  }

  swap(i, j) {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
}