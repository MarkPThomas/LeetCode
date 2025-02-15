// 2025/02/14
// O(n * log(s)) time complexity
//  where n = # elements in array, s = sum of array
// O(1) space complexity
// Time to complete: NA min
// Patterns: Binary Search
// Notes w.r.t. solution: Worked solution
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
  function minSubarraysRequired(nums, maxSumAllowed) {
    let leftSum = 0;
    let splitsRequired = 0;

    for (const num of nums) {
      if (leftSum + num <= maxSumAllowed) {
        leftSum += num;
      } else { // Count new split & reset sum
        leftSum = num;
        splitsRequired++;
      }
    }

    return splitsRequired + 1;
  }

  let sumNums = 0;
  let maxNum = -Infinity;
  for (const num of nums) {
    sumNums += num;
    maxNum = Math.max(maxNum, num);
  }

  let left = maxNum;
  let right = sumNums;
  let minLargestSplitSum = 0;
  while (left <= right) {
    const maxSumAllowed = left + Math.floor((right - left) / 2);

    if (minSubarraysRequired(nums, maxSumAllowed) <= k) { // Move left & update max subarray sum
      right = maxSumAllowed - 1;
      minLargestSplitSum = maxSumAllowed;
    } else {    // Move right
      left = maxSumAllowed + 1;
    }
  }

  return minLargestSplitSum;
};


// 2025/02/14
// O() time complexity
// O(1) space complexity
// Time to complete: 55:33 min
// Patterns: Binary Search
// Notes w.r.t. solution: Attempted. Timed out before writing any workable code. Was sort of on the right track.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
  // What to subdivide:
  //  sum of subarray is always less by subdividing since #s >= 0
  //  to minimize largest sum, subdivide subarray with current largest sum for each further subdivision

  // Where to subdivide:
  //  BS can be used to find this? Or, linear scan?

  // Subdivision locations: k - 1: index partition
  // After initial sum, we only need to sum one side of a partition, can calc other side from result
  // Bucket sort by sum for better placement efficiency? w/ pointer to max sum bucket?

  // Use BS to find next max sum?

  // What about buckets for k? Smaller sums.
  // Initialize buckets of equal-sized divisions of original nums

  // What is monotonically increasing?
  //  - Sum within each subdivision
  //  - Shifting further subdivision changes relative L/R sums
  //  - Shift L or R or stay at position? Based on smallest max sum

  function subdivide(left, right, sum, nums) {

    // Guess subdivision at middle
    const mid = left + Math.floor((right - left) / 2);

    // Check subdivided sum
    let leftSum = 0;
    for (let i = left; i < mid; i++) {
      leftSum += nums[i];
    }
    const rightSum = sum - leftSum;

    if (leftSum === rightSum) {
      // Shift either direction & one of the sums will increase
      return mid;
    } else if (leftSum < rightSum) {
      // Try increasing leftSum

    } else {
      // Try increasing rightSum

    }
  }


  // k = 1
  let maxSum = 0;
  for (const num of nums) {
    maxSum += num;
  }
  const sums = Array(maxSum + 1);
  sums[maxSum] = [[0, nums.length - 1]];
  k--;

  while (k) {
    let [left, right] = sums[maxSum].pop();
    while (left < right) {

    }

    k--;
  }

  return maxSum;
};