// 2025/07/02
// Constructor
//   O(n) -> O(1) time complexity (n if input is n vs. fixed n = 2)
//   O(n) -> O(1) space complexity (n if input is n vs. fixed n = 2)
// hasNext
//   O(1) time complexity
//   O(1) space complexity
// next
//   O(n) -> O(1) time complexity (n amortizing to 1 if input is n vs. fixed n = 2)
//   O(1) space complexity
// where n = # vectors
// Time to complete: Didn't time
// Patterns: Design, 2 Pointers, Queue
// Notes w.r.t. solution: Solved extension question directly. Refactored prev solution to use queue.
/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
var ZigzagIterator = function ZigzagIterator(v1, v2) {
  this.vectors = [[v1, 0], [v2, 0]];
  this.vectorIdxQueue = new Queue();

  // Below can be refactored out into a re-initialize function
  for (let i = 0; i < this.vectors.length; i++) {
    if (this.vectors[i][0].length) {
      this.vectorIdxQueue.enqueue(i);
    }
  }
};


/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function hasNext() {
  return !!this.vectorIdxQueue.size();
};

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function next() {
  if (!this.hasNext()) {
    return;
  }

  const vectorIdx = this.vectorIdxQueue.dequeue();
  let [vector, idx] = this.vectors[vectorIdx];
  const val = vector[idx];

  idx++;
  this.vectors[vectorIdx] = [vector, idx];
  if (idx < vector.length) {
    this.vectorIdxQueue.enqueue(vectorIdx);
  }

  return val;
};

/**
 * Your ZigzagIterator will be called like this:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
*/

// 2025/07/02
// Constructor
//   O(n) -> O(1) time complexity (n if input is n vs. fixed n = 2)
//   O(n) -> O(1) space complexity (n if input is n vs. fixed n = 2)
// hasNext
//   O(1) time complexity
//   O(1) space complexity
// next
//   O(1) time complexity
//   O(1) space complexity
// where n = # vectors
// Time to complete: 33:26 min
// Patterns: Design, 2 Pointers
// Notes w.r.t. solution: Solved extension question directly.
/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
var ZigzagIterator = function ZigzagIterator(v1, v2) {
  this.vectors = [[v1, 0], [v2, 0]];


  this.vectorIdx = 0;
  this.numHasNext = 0;
  this.vectorsHaveNext = [];

  // Below can be refactored out into a re-initialize function
  for (let i = 0; i < this.vectors.length; i++) {
    if (this.vectors[i][0].length) {
      this.vectorsHaveNext.push(i);
      this.numHasNext++;
    }
  }
};


/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function hasNext() {
  return this.numHasNext;
};

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function next() {
  if (!this.hasNext()) {
    return;
  }

  const nextIdx = this.vectorsHaveNext[this.vectorIdx];
  let [vector, idx] = this.vectors[nextIdx];
  const val = vector[idx];

  idx++;
  this.vectors[nextIdx] = [vector, idx];
  if (idx >= vector.length) {
    this.vectorsHaveNext.splice(this.vectorIdx, 1);
    this.numHasNext--;
  }

  if (this.hasNext()) {
    this.vectorIdx = (this.vectorIdx + 1) % this.numHasNext;
  }

  return val;
};

/**
 * Your ZigzagIterator will be called like this:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
*/