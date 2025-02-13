// 2025/02/13
// O() time complexity
// O() space complexity
// Time to complete: xx min
// Patterns: Binary Search + Dynamic Programming
// Notes w.r.t. solution:



// 2025/02/13
// O() time complexity
// O() space complexity
// Time to complete: xx min
// Patterns: Binary Search + Sliding Window
// Notes w.r.t. solution:



// 2025/02/13
// O(n^2 + M) time complexity
// O(M) space complexity
//  where M = max value in nums
// Time to complete: xx min
// Patterns: Bucket Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  // Find max element & create lazy buckets
  let max = 0;
  for (const num of nums) {
    max = Math.max(max, num);
  }
  const distances = Array(max + 1).fill(0);

  // get all combos of distances, in buckets
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const distance = Math.abs(nums[i] - nums[j]);

      distances[distance]++;
    }
  }

  // Find kth smallest
  for (let distance = 0; distance <= max; distance++) {
    k -= distances[distance];

    if (k <= 0) {
      return Number(distance);
    }
  }

  return -1;
};

// 2025/02/13
// O(n^2 + min(n, M)) time complexity
// O(min(n, M)) space complexity
//  where M = max num in nums
// Time to complete: 16:40 min TLE @ 18/19
// Patterns: Brute-ish Force w/ Hashmap counting
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  const distances = {};

  // get all combos of distances
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const distance = Math.abs(nums[i] - nums[j]);

      distances[distance] ??= 0;
      distances[distance]++;
    }
  }

  // Find kth smallest
  const uniqueDistances = Object.keys(distances);
  for (const distance of uniqueDistances) {
    k -= distances[distance];

    if (k <= 0) {
      return Number(distance);
    }
  }

  return -1;
};

// 2025/02/13
// O(n^2 * log(k)) time complexity
// O(k) space complexity
// Time to complete: 10:46 min TLE @ 16/19
// Patterns: Brute Force w/ Priority Queue
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  // brute force
  const distances = new PriorityQueue({ compare: (a, b) => b - a });

  // get all combos of distances
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const distance = Math.abs(nums[i] - nums[j]);

      // add to max heap, keeping heap at size k
      distances.enqueue(distance);
      if (distances.size() > k) {
        distances.dequeue();
      }
    }
  }
  // return root
  return distances.dequeue();
};