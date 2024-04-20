// O(n*log(n)) time complexity
// O(n) space complexity
// where n = # of scores
// Time to complete: 10 min
// Patterns: Sorting.
// Notes w.r.t. solution:  Brute force solution. Optimal uses heaps.
/**
 * @param {number[][]} items
 * @return {number[][]}
 */
var highFive = function (items) {
  const numberOfScores = 5;

  const orderedScores = [];
  items.forEach((item) => {
    if (!orderedScores[item[0]]) {
      orderedScores[item[0]] = [];
    }
    orderedScores[item[0]].push(item[1]);
  });

  const results = [];
  Object.keys(orderedScores).forEach((key) => {
    const maxScores = orderedScores[key].sort((a, b) => b - a); // O (n*log(n))

    let totalScore = 0;
    for (let i = 0; i < numberOfScores; i++) {
      totalScore += maxScores[i];
    }

    const topFiveAverage = Math.floor(totalScore / numberOfScores);

    results.push([key, topFiveAverage]);
  });

  results.sort((a, b) => a[0] - b[0]);  // O(m*log(m))

  return results;
};

// With heaps...
// O(n*log(n)) time complexity
// O(n) space complexity
// where n = # of scores
// Time to complete: N/A
// Patterns: Heaps
// Notes w.r.t. solution: Should do these problems in Python.
/**
 * @param {number[][]} items
 * @return {number[][]}
 */
var highFive = function (items) {
  const numberOfScores = 5;

  const heapedScores = {};
  const heapedIds = new MaxHeap();
  const results = {};

  items.forEach((item) => {
    if (!heapedScores[item[0]]) {
      heapedScores[item[0]] = new MaxHeap(item[1]);
    } else {
      heapedScores[item[0]].insert(item[1]);
    }

    if (!results[item[0]]) {
      results[item[0]] = -1;
      heapedIds.insert(-1 * item[0]);
    }
  });

  Object.keys(heapedScores).forEach((key) => {
    let totalScore = 0;
    for (let i = 0; i < numberOfScores; i++) {
      totalScore += heapedScores[key].remove();
    }

    const topFiveAverage = Math.floor(totalScore / numberOfScores);

    results[key] = topFiveAverage;
  });

  const resultsSorted = [];
  while (heapedIds.size) {
    const id = Math.abs(heapedIds.remove());
    resultsSorted.push([id, results[id]]);
  }

  return resultsSorted;
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