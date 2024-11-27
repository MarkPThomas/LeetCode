// 2024/11/27
// O(m * (n + log(m))) time complexity
// O(m) space complexity
// Time to complete: 13:45 min
// Patterns: Sort
// Notes w.r.t. solution:
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
var kWeakestRows = function (mat, k) {
  function ranking(rowA, rowB) {
    const [i, soldiersI] = rowA;
    const [j, soldiersJ] = rowB;

    if (soldiersI < soldiersJ
      || (soldiersJ === soldiersI && i < j)) {
      return 1;
    } else {
      return -1;
    }
  }

  const queue = []
  for (let row = 0; row < mat.length; row++) {
    let soldiers = 0;
    for (let col = 0; col < mat[0].length; col++) {
      if (mat[row][col] === 1) {
        soldiers++;
      }
    }
    queue.push([row, soldiers]);
  }
  queue.sort(ranking);

  const kWeakest = [];
  for (let i = 0; i < k; i++) {
    kWeakest.push(queue.pop()[0]);
  }

  return kWeakest;
};

// 2024/11/27
// O(m * log(n * k)) time complexity
// O(k) space complexity
// Time to complete:
// Patterns: Heap + Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
var kWeakestRows = function (mat, k) {
  function ranking(rowA, rowB) {
    const [i, strengthI] = rowA;
    const [j, strengthJ] = rowB;

    if (strengthI < strengthJ
      || (strengthJ === strengthI && i < j)) {
      return 1;
    } else {
      return -1;
    }
  }

  function numSoldiers(row) {
    let left = 0;
    let right = row.length;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);

      if (row[mid] === 1) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  const queue = new MyPriorityQueue(ranking);

  for (let row = 0; row < mat.length; row++) {
    // T: O(log(n))
    const soldiers = numSoldiers(mat[row]);

    // // T: O(n) - less optimized solution
    // let soldiers = 0;
    // for (let col = 0; col < mat[0].length; col++) {
    //     if (mat[row][col] === 1) {
    //         soldiers++;
    //     }
    // }

    const rowStrength = [row, soldiers];
    queue.enqueue(rowStrength);
    if (queue.size() > k) {
      queue.dequeue();
    }
  }

  const kWeakest = [];
  for (let i = k - 1; i >= 0; i--) {
    kWeakest[i] = queue.dequeue()[0];
  }

  return kWeakest;
};

class MyPriorityQueue {
  constructor(comparator) {
    this.queue = new Heap(comparator);
  }

  size() {
    return this.queue.size();
  }

  enqueue(item) {
    this.queue.insert(item);
  }

  dequeue() {
    return this.queue.removeRoot();
  }
}

class Heap {
  constructor(comparator, nums) {
    this.comparator = comparator;
    this.nums = nums ?? [];
    this.build();
  }

  size() {
    return this.nums.length;
  }

  build() {
    for (let i = Math.floor(this.nums.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  peek() {
    return this.nums[0];
  }

  insert(val) {
    if (this.nums.length === this.sizeLimit) {
      if (!this.shouldSwap(this.nums[0], val)) {
        return;
      } else {
        this.nums[0] = val;
        this.heapifyDown(0);
      }
    } else {
      this.nums.push(val);
      this.heapifyUp(this.nums.length - 1);
    }
  }

  removeRoot() {
    this.swap(0, this.nums.length - 1);
    const item = this.nums.pop();

    this.heapifyDown(0);

    return item;
  }

  heapifyUp(targetIndex) {
    while (targetIndex) {
      const parentIndex = this.getParentIndex(targetIndex);
      if (this.shouldSwap(targetIndex, parentIndex)) {
        this.swap(targetIndex, parentIndex);
        targetIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(targetIndex) {
    while (targetIndex < this.nums.length) {
      let swapIndex = targetIndex;
      swapIndex = this.getSwapIndex(1, targetIndex, swapIndex);
      swapIndex = this.getSwapIndex(2, targetIndex, swapIndex);

      if (swapIndex === targetIndex) {
        break;
      }

      this.swap(swapIndex, targetIndex);
      targetIndex = swapIndex;
    }
  }

  getSwapIndex(childNum, targetIndex, swapIndex) {
    const childIdx = targetIndex * 2 + childNum;

    return childIdx < this.nums.length
      && this.shouldSwap(childIdx, swapIndex) ? childIdx : swapIndex;
  }

  shouldSwap(childIdx, parentIdx) {
    return this.comparator(this.nums[childIdx], this.nums[parentIdx]) <= 0;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    const temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
}