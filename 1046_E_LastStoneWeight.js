// 2024/11/26
// O(n^2 * log(n)) time complexity
// O(n) space complexity
// Time to complete: 12:19 min
// Patterns: Sort
// Notes w.r.t. solution: Brute force.
//    Can get better time complexity by sorting once outside the loop & then inserting back in order T: O(n^2)
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  let val1 = 0;
  let val2 = 0;
  while (stones.length) {
    stones.sort((a, b) => a - b)
    val1 = stones.pop();
    if (!val1) {
      break;
    }

    val2 = stones.pop();
    if (!val2) {
      break;
    }

    val1 -= val2;
    if (val1) {
      stones.push(val1);
    }
  }

  return val1 === null ? 0 : val1;
};

// 2024/11/26
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 12:19 min (w/ pre-made Heap)
// Patterns: Heap
// Notes w.r.t. solution:
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const maxHeap = new Heap((a, b) => b - a, stones);

  let val1 = 0;
  let val2 = 0;
  while (maxHeap.size()) {
    val1 = maxHeap.removeRoot();
    if (val1 === null) {
      break;
    }

    val2 = maxHeap.removeRoot();
    if (val2 === null) {
      break;
    }

    val1 -= val2;
    if (val1) {
      maxHeap.insert(val1);
    }
  }

  return val1 === null ? 0 : val1;
};

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

    return item ?? null;
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