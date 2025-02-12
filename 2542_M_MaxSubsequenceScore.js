// O(n * log(n) + k * log(k)) -> O(n * log(n)) time complexity
// O(n + k) - O(n) space complexity
// Time to complete: NA min
// Patterns:  Priority Queue
// Notes w.r.t. solution: Worked Solution
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function (nums1, nums2, k) {
  // Get pairs sorted descending of nums2
  // This way, min is at k - 1, then at every later num2 checked
  const numPairs = [];
  for (let i = 0; i < nums1.length; i++) {
    numPairs.push([nums1[i], nums2[i]]);
  }
  numPairs.sort((a, b) => b[1] - a[1]);

  // Get max score from kth max min sum
  let sum = 0;
  const maxNums = new PriorityQueue({ compare: (a, b) => a - b })
  for (let j = 0; j < k; j++) {
    sum += numPairs[j][0];
    maxNums.enqueue(numPairs[j][0]);
  }
  let maxScore = sum * numPairs[k - 1][1];

  // For each greater min, check new potential score, swapping least num w/ curr
  for (let j = k; j < nums2.length; j++) {
    // Swap smallest # w/ curr
    sum += (numPairs[j][0] - maxNums.dequeue());
    maxNums.enqueue(numPairs[j][0]);

    maxScore = Math.max(maxScore, sum * numPairs[j][1]);
  }

  return maxScore;
};


// O() time complexity
// O(1) space complexity
// Time to complete: 35:46 @ 17/28 min
// Patterns:  Priority Queue
// Notes w.r.t. solution: 23:58 @ 17/28
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function (nums1, nums2, k) {
  // max score = max of nums1 sum * max nums2 min of corresponding elements
  // PQ of nums1 val & nums2 val, as a max heap of min size k?

  // min does not matter beyond 1 min

  let sum1 = 0;
  // Prioritize choosing max of nums2 to maximize min
  const pq2 = new PriorityQueue({ compare: (a, b) => a[1] - b[1] });
  for (let i = 0; i < nums2.length; i++) {
    sum1 += nums1[i];
    pq2.enqueue([i, nums2[i]]);

    if (pq2.size() >= k) {
      sum1 -= nums1[pq2.dequeue()[0]];
    }
  }

  return sum1 * pq2.front()[1];
};