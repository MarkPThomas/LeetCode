// 2025/06/02
// O(n * log(k)) time complexity
// O(k) space complexity
// Time to complete: 1:07:55 OT min (gave up & looked at answer)
// Patterns: 2 Heaps
// Notes w.r.t. solution: Was on the right track!
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
  // if k is odd, we just need middle val (k // 2 idx)
  // if k is even, we need middle - 1 & middle + 1 (k // 2 idx & k // 2 + 1 idx)

  // min heap for left-half idxs to remove from window
  // min heap for right-half idxs added & shifted to left-half?
  //      gets middle + 1, other idx is this - 1
  //      inclusive of middle # for odd k
  function getMedian() {
    return k % 2
      ? maxOfMin.front()
      : (maxOfMin.front() + minOfMax.front()) / 2;
  }

  // Create initial window & median
  const maxOfMin = new PriorityQueue((a, b) => b - a);
  for (let i = 0; i < k; i++) {
    maxOfMin.enqueue(nums[i]);
  }

  // Balance between heaps
  const minOfMax = new PriorityQueue((a, b) => a - b);
  for (let i = 0; i < Math.floor(k / 2); i++) { // limit makes minOfMax = maxOfMin + 1 if k is odd
    minOfMax.enqueue(maxOfMin.dequeue());
  }

  const medians = [getMedian()];

  const visited = {}; // To track vals still in heaps that are not reached
  for (let i = k; i < nums.length; i++) {

    // Handle outgoing
    const numOut = nums[i - k];
    visited[numOut] = (visited[numOut] ?? 0) + 1;

    // Track balancing with val placement & any reachable removals
    // balance subtract for maxOfMin side, add for minOfMax side
    let balance = numOut <= maxOfMin.front() ? -1 : 1;

    // Handle incoming
    // balance reverse increments for incoming vs. outgoing
    const numIn = nums[i];
    if (maxOfMin.size() === 0 || numIn <= maxOfMin.front()) {
      maxOfMin.enqueue(numIn);
      balance++;
    } else {
      minOfMax.enqueue(numIn);
      balance--;
    }

    // Balance heaps if needed
    if (balance < 0) {  // Too many in maxOfMin
      maxOfMin.enqueue(minOfMax.dequeue());
    } else if (balance > 0) {  // Too many in minOfMax
      minOfMax.enqueue(maxOfMin.dequeue());
    }

    // Remove any reachable vals outside of window
    while (visited[maxOfMin.front()]) {
      visited[maxOfMin.dequeue()]--;
    }
    while (visited[minOfMax.front()]) {
      visited[minOfMax.dequeue()]--;
    }

    medians.push(getMedian());
  }

  return medians;
};