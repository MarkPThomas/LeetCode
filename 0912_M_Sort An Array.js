// TODO: For extending non-comparison sorts:
//  1. Consider if radix solution used for bucket sort?
//  2. For all, consider decimal pre-processing? e.g. scale up then back?
//  3. Since bucket sort can be sorted at the end, or skipped if iterated, perhaps extract this out or make
//      conditional e.g. if using radix or not

//  For more generic lib, add in modifications to bucket sort used in problem 347 for sorting by property rather than value
// See problem 2343 for other optimizations

// 2024/05/08
// O(n * log(n)) time complexity
// O(log(n)) space complexity - for recursion or iterative stacks, increasing by a rate of half of the prior iteration
// Time to complete: N/A min
// Patterns: Quick Sort
// Notes w.r.t. solution:
function quickSortRecursive(arr, low, hi) {
  if (low >= hi) {
    return;
  }

  let [s, e] = partition(arr, low, hi);

  quickSortRecursive(arr, low, e);
  quickSortRecursive(arr, s, hi);
}

function quickSortIterative(arr, low, hi) {
  const stack = [[low, hi]];

  while (stack.length) {
    let [low, hi] = stack.pop();
    let [s, e] = partition(arr, low, hi);

    if (e > low) {
      stack.push([low, e]);
    }

    if (s < hi) {
      stack.push([s, hi]);
    }
  }
}

function partition(arr, low, hi) {
  let s = low;
  let e = hi;

  let m = s + Math.floor(Math.random() * (e - s));
  let pivot = arr[m];


  while (s <= e) {
    while (arr[s] < pivot) {
      s++;
    }

    while (arr[e] > pivot) {
      e--;
    }

    if (s <= e) {
      let temp = arr[s];
      arr[s] = arr[e];
      arr[e] = temp;

      s++;
      e--;
    }
  }

  return [s, e];
}


// 2024/05/07
// O(n * log(n)) time complexity
// O(n) space complexity - for helper arrays used for merging @ final iteration
// Time to complete: +27:15 min - merrr
// Patterns: Merge Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  return mergeSortRecursive(nums, 0, nums.length - 1);
  // return mergeSortIterative(nums);
};

function mergeSortRecursive(nums, leftIdx, rightIdx) {
  // Base Case - subdivision has reached a size of 1
  if (leftIdx >= rightIdx) {
    return nums;
  }

  // Get middle
  const mid = Math.floor(leftIdx + 0.5 * (rightIdx - leftIdx));

  // Subdivide each side, then recombine as merged sorted
  mergeSortRecursive(nums, leftIdx, mid);
  mergeSortRecursive(nums, mid + 1, rightIdx);

  // Recombine current separate sorted set
  mergeSorted(nums, leftIdx, mid, rightIdx);

  return nums;
}

var mergeSortIterative = function (nums) {

  // subdivide to lowest pairs (i.e. start with size set to 1)
  // increment back to full array length (i.e. double size w/ each iteration since pairs merged each time)
  for (let size = 1; size < nums.length; size *= 2) {
    // Merge each sorted subsets in row by pairs, by incrementing in pair size
    for (let low = 0; low < nums.length - 1; low += 2 * size) {
      const mid = Math.min(low + size - 1, nums.length - 1);
      const high = Math.min(low + 2 * size - 1, nums.length - 1);

      mergeSorted(nums, low, mid, high);
    }
  }

  return nums;
};

// merge each prev sorted pair in order
function mergeSorted(nums, low, mid, high) {
  // Check if odd # groups (i.e. only low-mid pair)
  if (mid === high) {
    // Only one set, already sorted. Nothing to do here!
    return;
  }

  let length = high - low + 1;
  let mergedNums = [];

  let ptrI = low;
  let ptrJ = mid + 1;

  // Merge sort ararys
  for (let i = 0; i < length; i++) {
    if (ptrI <= mid && (nums[ptrI] <= nums[ptrJ] || high < ptrJ)) {
      mergedNums.push(nums[ptrI]);
      ptrI++;
    } else if (ptrJ <= high) {
      mergedNums.push(nums[ptrJ]);
      ptrJ++;
    }
  }

  // Rewrite back to main array
  for (let i = low; i <= high; i++) {
    nums[i] = mergedNums[i - low];
  }
}

// 2024/05/05
// O(d * (m + n)) time complexity
// O(d * (m + n)) space complexity
//  where m = # of buckets, d = # digits
// Time to complete: 10:17 min
// Patterns: Radix Sort
// Notes w.r.t. solution: 8:20 min for positive #s only.
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  // Radix sort ignores signs
  // Extract negative values
  const negatives = [];
  nums.forEach((num) => {
    if (num < 0) {
      negatives.push(num);
    }
  });

  const positives = [];
  nums.forEach((num) => {
    if (num >= 0) {
      positives.push(num);
    }
  });

  let negativesSorted = radixSort(negatives, 10);
  let positivesSorted = radixSort(positives, 10);

  let result = negativesSorted.reverse().concat(positivesSorted);

  return result;
};

var radixSort = function (nums, radix) {
  // Establish ranges, break if no sorting needed
  let min = nums[0];
  let max = nums[0];
  nums.forEach((num) => {
    min = Math.min(min, num);
    max = Math.max(max, num);
  });

  if (min === max) {
    return nums;
  }

  // Establish powers, i.e. scale, i.e. # of sorts needed
  let maxPower = 1;
  let range = Math.abs(max - min);
  while (range) {
    range = Math.floor(range / radix);
    maxPower++;
  }

  // Radix sort
  let power = 0;
  while (power <= maxPower) {
    nums = bucketSort(nums, radix, power);
    power++;
  }

  return nums;
}

// Bucket sort changes from other answer:
//  1. Removed initial max/min checks as they are handled higher up. No effects except optimization
//  2. Changed bucket mapping.
//    A more generic bucketSort could have a default callback that is overridden by another function, e.g. radix
//  Note: max/min still needed for default map sorting
//    Perhaps have switch to use these locally? Or require externa check & provide them? etc.
var bucketSort = function (nums, radix, power) {
  // Create & fill buckets
  const buckets = Array(radix).fill(0).map(() => []);

  nums.forEach((num) => {
    const idx = Math.floor(Math.abs(num) / (radix ** power)) % radix;
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

  return nums;
}

// 2024/05/05
// O(m + n) time complexity
// O(m + n) space complexity
//  where m = # of buckets
// Time to complete: 11:01 min
// Patterns: Bucket Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  // Establish ranges, break if no sorting needed
  let min = nums[0];
  let max = nums[0];
  nums.forEach((num) => {
    min = Math.min(min, num);
    max = Math.max(max, num);
  });

  if (min === max) {
    return nums;
  }

  // Create & fill buckets
  const maxNumBuckets = (min, max) => {
    let power = 1;
    let range = max - min;
    while (range) {
      range = Math.floor(range / 10);
      power++;
    }

    return 10 ** power;
  }

  // const numBuckets = maxNumBuckets(min, max);  // Perfect sorting, but large
  const numBuckets = 10;    // Reasonable guess, post-sorting still needed
  const buckets = Array(numBuckets).fill(0).map(() => []);

  nums.forEach((num) => {
    const idx = Math.floor((num - min) * (buckets.length - 1) / (max - min));
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
  nums.sort((a, b) => a - b);

  return nums;
};

// 2024/05/
// O(n + m) time complexity
// O(m) space complexity
// where n = # nums, m = range from 0 (or negative min) to max
// Time to complete: 10:42 min
// Patterns: Counting Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayCountingSort = function (nums) {
  let min = 0;
  let max = -Infinity;
  nums.forEach((num) => {
    min = Math.min(min, num);
    max = Math.max(max, num);
  });

  const counts = Array(max - min + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    counts[nums[i] - min]++;
  }

  let currIdx = 0;
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    while (count) {
      nums[currIdx] = i + min;
      currIdx++;
      count--;
    }
  }

  return nums;
};

// 2024/05/
// O() time complexity
// O() space complexity
// Time to complete:  min
// Patterns: Quick Sort
// Notes w.r.t. solution:

// 2024/05/
// O() time complexity
// O() space complexity
// Time to complete:  min
// Patterns: Merge Sort
// Notes w.r.t. solution:

// 2024/05/04
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 3:17 min
// Patterns: Bubble Sort
// Notes w.r.t. solution: Time limit exceeded X-P
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayBubbleSort = function (nums) {
  for (let endOffset = 0; endOffset < nums.length - 1; endOffset++) {
    for (let startIdx = 0; startIdx < nums.length - 1 - endOffset; startIdx++) {
      if (nums[startIdx] > nums[startIdx + 1]) {
        [nums[startIdx], nums[startIdx + 1]] = [nums[startIdx + 1], nums[startIdx]];
      }
    }
  }

  return nums;
};

// 2024/05/04
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 7:50 min
// Patterns: Selection Sort
// Notes w.r.t. solution: Time limit exceeded X-P
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArraySelectionSort = function (nums) {
  for (let startIdx = 0; startIdx < nums.length - 1; startIdx++) {
    let minIdx = startIdx;
    for (let ptrIdx = startIdx + 1; ptrIdx < nums.length; ptrIdx++) {
      if (nums[ptrIdx] < nums[minIdx]) {
        minIdx = ptrIdx;
      }
    }

    if (startIdx !== minIdx) {
      [nums[startIdx], nums[minIdx]] = [nums[minIdx], nums[startIdx]];
    }
  }

  return nums;
};


// 2024/05/04
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 8:45 min
// Patterns: Insertion Sort
// Notes w.r.t. solution: Time limit exceeded X-P
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayInsertionSort = function (nums) {
  for (let currIdx = 1; currIdx < nums.length; currIdx++) {
    let insertIdx = currIdx;

    while (0 < insertIdx && nums[insertIdx] < nums[insertIdx - 1]) {
      [nums[insertIdx - 1], nums[insertIdx]] = [nums[insertIdx], nums[insertIdx - 1]];
      insertIdx--;
    }
  }

  return nums;
};

// 2024/04/29
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 2:43 min
// Patterns: Heap
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayHeapSort = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] = -nums[i];
  }

  const maxHeap = new MaxHeap(nums);
  for (let i = 0; i < nums.length; i++) {
    nums[i] = -maxHeap.remove();
  }

  return nums;
};

class MaxHeap {
  size = 0;
  items = [];
  comparator = (child, parent) => child > parent;

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