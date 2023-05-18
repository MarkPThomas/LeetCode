// O(n*log(n) + m*log(k)) time complexity
// O(1) space complexity
// where n = length of initial array, m = # items added later, k = k as in top k defined below
// Time to complete: 1 min to solve, 41 min to make heap initially,longer to debug small mistakes
// Patterns: Heap
// Notes w.r.t. solution: Learn Python to use for problems that need heaps! :-P C# doesn't even seem to have this data structure.

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.kthLargestDescending = new MinHeap(k);
  this.kthLargestDescending.build(nums);    // T: O(n*log(n)), S: O(1) since modified in place
};

/**
* @param {number} val
* @return {number}
*/
KthLargest.prototype.add = function (val) {   // T: O(log(k)), S: O(1) since modified in place
  // Only add value if it within the top k
  if (this.kthLargestDescending.size() < this.kthLargestDescending.capacity) {
    this.kthLargestDescending.insert(val);
  } else if (val > this.kthLargestDescending.peek()) {
    // Remove root first as structure as implemented is enforcing size & value would be dropped
    this.kthLargestDescending.removeRoot();
    this.kthLargestDescending.insert(val);
  }
  return this.kthLargestDescending.peek();
};

/**
* Your KthLargest object will be instantiated and called as such:
* var obj = new KthLargest(k, nums)
* var param_1 = obj.add(val)
*/

class MinHeap {
  constructor(capacity) {
    this.capacity = capacity;
    this.values = [];
  }

  build(nums) {
    this.values = nums;
    const lastParentIndex = Math.floor(nums.length / 2) - 1;
    for (let i = lastParentIndex; i >= 0; i--) {
      this._heapifyDown(i);
    }
    while (this.values.length > this.capacity) {
      this.removeRoot();
    }
  }

  insert(val) {
    this.values.push(val);
    this._heapifyUp();
    if (this.values.size > this.capacity) {
      this.values.pop();
    }
  }

  peek() {
    return this.values[0];
  }

  size() {
    return this.values.length;
  }

  removeRoot() {
    if (this.values.length === 0) {
      return;
    }

    const swap = this._swap(0, this.values.length - 1);
    this.values.pop();
    this._heapifyDown(0);

    return swap;
  }

  _heapifyUp() {
    let currentIndex = this.values.length - 1;
    let swapChildIndex = currentIndex;
    do {
      let parentIndex = Math.floor((currentIndex - 1) / 2);
      if (parentIndex < 0) {
        break;
      }

      swapChildIndex = this._swapChildIndex(parentIndex, currentIndex);

      if (parentIndex === swapChildIndex) {
        break;
      }
      this._swap(parentIndex, swapChildIndex);
      currentIndex = parentIndex;
    } while (currentIndex >= 0)
  }

  _heapifyDown(index = 0) {
    let currentIndex = index;
    let swapChildIndex = currentIndex;
    do {
      let leftChildIndex = 2 * currentIndex + 1;
      if (leftChildIndex < this.size()) {
        swapChildIndex = this._swapChildIndex(swapChildIndex, leftChildIndex);
      }

      let rightChildIndex = 2 * currentIndex + 2;
      if (rightChildIndex < this.size()) {
        swapChildIndex = this._swapChildIndex(swapChildIndex, rightChildIndex);
      }

      if (currentIndex === swapChildIndex) {
        break;
      }
      this._swap(currentIndex, swapChildIndex);
      currentIndex = swapChildIndex;
    } while (currentIndex < this.size());
  }

  _swapChildIndex(parentIndex, childIndex) {
    return this._shouldSwap(parentIndex, childIndex) ? childIndex : parentIndex;
  }

  _shouldSwap(parentIndex, childIndex) {
    return (this.values[parentIndex] > this.values[childIndex]);
  }

  _swap(i, j) {
    if (j >= this.size()) {
      return;
    }
    if (j > this.values.length - 1) {
      this.values.push(Infinity);
    }
    const swap = this.values[i];
    this.values[i] = this.values[j];
    this.values[j] = swap;
    return swap;
  }
}



const testCases = [
  {
    input: {
      initialize: [3, [4, 5, 8, 2]],
      add: [[3], [5], [10], [9], [4]]
    },
    expected: [4, 5, 5, 8, 8]
  },
  {
    input: {
      initialize: [2, [0]],
      add: [[-1], [1], [-2], [-4], [3]]
    },
    expected: [-1, 0, 0, 0, 1]
  },
  {
    input: {
      initialize: [7, [-10, 1, 3, 1, 4, 10, 3, 9, 4, 5, 1]],
      add: [[3], [2], [3], [1], [2], [4], [5], [5], [6], [7], [7], [8], [2], [3], [1], [1], [1], [10], [11], [5], [6], [2], [4], [7], [8], [5], [6]]
    },
    expected: [3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7]
  },
];

testCases.forEach((testCase) => {
  let size = testCase.input.initialize[0];
  let nums = testCase.input.initialize[1];
  let kthLargest = new KthLargest(size, nums);
  for (let i = 0; i < testCase.input.add.length; i++) {
    let item = testCase.input.add[i][0];
    let expected = testCase.expected[i];
    let result = kthLargest.add(item);

    let pass = result === expected;
    console.log(`Input: ${item}\nExpected: ${expected}\nResult: ${result}\nPass: ${pass}\n`);
  }
});