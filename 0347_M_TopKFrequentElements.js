// 2024/05/05
// O(m + n) time complexity (for sort)
// O(n) space complexity  (for count hashmap)
// Time to complete: N/A min
// Patterns: Bucket Sort
// Notes w.r.t. solution: Reworked problem integrating bucket sort. Made alteration to allow sorting on sub-element.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  })

  let countsKeys = Object.entries(counts);
  countsKeys = bucketSort(countsKeys, (a) => a[1]);

  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(countsKeys[countsKeys.length - 1 - i][0])
    i++;
  }

  return topKs;
};

var bucketSort = function (nums, getVal = null) {
  if (!getVal) {
    getVal = (a) => a;
  }

  // Establish ranges, break if no sorting needed
  let min = getVal(nums[0]);
  let max = getVal(nums[0]);
  nums.forEach((num) => {
    const val = getVal(num)
    min = Math.min(min, val);
    max = Math.max(max, val);
  });

  if (min === max) {
    return nums;
  }

  // Create & fill buckets
  const numBuckets = 10;    // Reasonable guess, post-sorting still needed
  const buckets = Array(numBuckets).fill(0).map(() => []);

  nums.forEach((num) => {
    const idx = Math.floor((getVal(num) - min) * (buckets.length - 1) / (max - min));
    buckets[idx].push(num);
  });

  // Merge buckets
  let ptr = 0;
  for (const vals of Object.values(buckets)) {
    let valsLength = vals.length;
    while (valsLength) {
      nums[ptr] = vals[vals.length - valsLength];
      ptr++;
      valsLength--;
    }
  }

  // Sort result for mildly disordered list
  nums.sort((a, b) => getVal(a) - getVal(b));

  return nums;
};

// 2024/04/29
// O(n * log(n)) time complexity (for sort)
// O(n) space complexity  (for count hashmap)
// Time to complete: 5:05 min
// Patterns: Heap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  });

  const maxHeap = new MaxHeap(Object.entries(counts), (child, parent) => child[1] > parent[1]);

  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(maxHeap.remove()[0]);
    i++;
  }

  return topKs;
};

class MaxHeap {
  size = 0;
  items = [];
  comparator = (child, parent) => a > b;

  constructor(items = [], comparator = null) {
    if (comparator) {
      this.comparator = comparator;
    }

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
    return this.comparator(this.items[indexChild], this.items[indexParent]);
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

// 2024/04/04
// O(n * log(n)) time complexity (for sort)
// O(n) space complexity (for sort)
// Time to complete: 12:20 min
// Patterns: Hash Map, Sorting Algorithms
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  })

  const countsKeys = Object.entries(counts);
  countsKeys.sort((a, b) => a[1] - b[1]);


  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(countsKeys[countsKeys.length - 1 - i][0])
    i++;
  }

  return topKs;
};