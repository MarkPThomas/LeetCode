// 2025/02/17
// O(n * log(n) + n * log(M) + M) time complexity
// O(n + M + S) -> O(n + M) space complexity
//  where n = # nums, M = max distance, S = Sort Time/Space = n
// Time to complete: NA min
// Patterns: Binary Search + Dynamic Programming
// Notes w.r.t. solution: Worked solution
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  function countMaxDistancePairs(nums, maxDistance, prefixCounts, valCounts) {
    let count = 0;

    let index = 0;
    while (index < nums.length) {
      const val = nums[index];
      const valCount = valCounts[val];

      const valMaxOffset = Math.min(val + maxDistance, prefixCounts.length - 1);
      const largerPairs = prefixCounts[valMaxOffset] - prefixCounts[val];
      const equalPairs = valCount * (valCount - 1) / 2;
      count += largerPairs * valCount + equalPairs;

      while (index + 1 < nums.length && nums[index] === nums[index + 1]) {
        index++;
      }
      index++;
    }

    return count;
  }

  nums.sort((a, b) => a - b);

  let maxNum = nums[nums.length - 1];
  let prefixCountSize = maxNum + 1;
  let prefixCounts = Array(prefixCountSize);
  let valCounts = Array(prefixCountSize).fill(0);

  // Compute prefix & value counts
  let prefixIdx = 0;
  for (let val = 0; val < prefixCountSize; val++) {
    while (prefixIdx < nums.length && nums[prefixIdx] <= val) {
      prefixIdx++;
    }
    prefixCounts[val] = prefixIdx;
  }
  for (const num of nums) {
    valCounts[num]++;
  }

  // Binary search to find kth smallest distance
  let low = 0;
  let high = maxNum;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    // Count pairs w/ distance <= mid
    const count = countMaxDistancePairs(nums, mid, prefixCounts, valCounts);

    if (count < k) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};

// 2025/02/13
// O(n * log(n) + n * log(M)) time complexity
// O(S) -> O(n) space complexity
//  where n = # nums, M = max distance, S = Sort Time/Space = n
// Time to complete: NA min
// Patterns: Binary Search + Sliding Window
// Notes w.r.t. solution:  Worked solution
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  function countMaxDistancePairs(nums, maxDistance) {
    let count = 0;

    // Slinky sliding window
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
      // For each window slide increment
      // Adjust left side to maintain window of distances <= max
      while (nums[right] - nums[left] > maxDistance) {
        left++;
      }

      count += right - left;
    }

    return count;
  }


  nums.sort((a, b) => a - b);

  // Low is 2 adjacent equal elements
  let low = 0;
  // High is delta of first/last element
  let high = nums[nums.length - 1] - nums[0];
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    // Sliding Window: Count pairs w/ distance <= mid
    const count = countMaxDistancePairs(nums, mid);

    if (count < k) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};

// 2025/02/13
// O(n^2 + M) time complexity
// O(M) space complexity
//  where M = max value in nums (can be > n)
// Time to complete: NA min
// Patterns: Bucket Sort
// Notes w.r.t. solution:  Worked solution
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