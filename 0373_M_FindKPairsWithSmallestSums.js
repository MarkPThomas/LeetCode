// 2025/04/04
// O(min(k * log(k), m * n * log(m * n)) time complexity
// O(min(k, m * n)) space complexity
//  where m = length nums1, n = length nums2, k = # pairs sought
// Time to complete: 33:30 min
// Patterns: Heap
// Notes w.r.t. solution: Lost time not carefully checking edge cases.
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const smallestPairs = [];
  // [num1, num2, sum]
  const maxSums = new PriorityQueue((a, b) => b[2] - a[2]);
  for (let i1 = 0; i1 < nums1.length; i1++) {
    let sum = nums1[i1] + nums2[0];
    if (maxSums.size() === k && maxSums.front()[2] < sum) {
      break;
    }

    let i2 = 0;
    while (i2 < Math.min(nums2.length, k) &&
      (maxSums.size() < k || maxSums.front()[2] > sum)) {

      if (maxSums.size() === k && maxSums.front()[2] > sum) {
        maxSums.dequeue();
      }
      maxSums.enqueue([nums1[i1], nums2[i2], sum]);

      i2++;
      sum = nums1[i1] + nums2[i2];
    }
  }

  while (maxSums.size()) {
    const [num1, num2, _] = maxSums.dequeue()
    smallestPairs.push([num1, num2]);
  }


  return smallestPairs;
};

// ==== Solution ====
// O(min(k * log(k), m * n * log(m * n)) time complexity
// O(min(k, m * n)) space complexity
//  where m = length nums1, n = length nums2, k = # pairs sought
// Patterns: Heap
// Notes w.r.t. solution: Note similarity to Dijkstra's Alg
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const smallestPairs = [];
  const visitedPairs = {};

  // [sum, num1, num2]
  const minSums = new PriorityQueue((a, b) => a[0] - b[0]);
  minSums.enqueue([nums1[0] + nums2[0], 0, 0])
  visitedPairs[[0, 0]] = true;

  while (k > 0 && minSums.size()) {
    const [_, i1, i2] = minSums.dequeue();
    smallestPairs.push([nums1[i1], nums2[i2]]);

    const i1Next = i1 + 1;
    if (i1Next < nums1.length && !([i1Next, i2] in visitedPairs)) {
      minSums.enqueue([nums1[i1Next] + nums2[i2], i1Next, i2]);
      visitedPairs[[i1Next, i2]] = true;
    }

    const i2Next = i2 + 1;
    if (i2Next < nums2.length && !([i1, i2Next] in visitedPairs)) {
      minSums.enqueue([nums1[i1] + nums2[i2Next], i1, i2Next]);
      visitedPairs[[i1, i2Next]] = true;
    }

    k--;
  }

  return smallestPairs;
};