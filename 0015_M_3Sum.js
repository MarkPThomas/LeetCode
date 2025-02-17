// 2025/02/17
// O(n * log(n) + n^2) -> O(n^2) time complexity (n * log(n) for sorting)
// O(n) space complexity (for sorting)
// Time to complete: 33:08 min
// Patterns: 2 Pointer
// Notes w.r.t. solution: 8:20 min for naiive solution, done at 20:06 min but had to debug :-(
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // return twoSum pairs i + j = -k?
  nums.sort((a, b) => a - b);

  const threeSums = {};
  let prevLowest = -Infinity;
  // lowIdx = first/lowest num
  for (let lowIdx = 0; lowIdx < nums.length - 2; lowIdx++) {
    // Skip repeating #s
    if (nums[lowIdx] === prevLowest) {
      continue;
    }
    prevLowest = nums[lowIdx];

    const midIdx = lowIdx + 1;  // Next lowest num
    const highIdx = nums.length - 1;    // Highest num
    const target = -nums[lowIdx];

    // Early skips/ends
    if (nums[highIdx - 1] + nums[highIdx] < target) { // All 2nd & 3rd #s will be too low, try higher 1st
      continue;
    } else if (nums[midIdx] + nums[midIdx + 1] > target) { // All 2nd & 3rd #s will be too high, end early
      break;
    }

    // Add all unique triplets between midIdx & end
    twoSum(nums, target, midIdx, highIdx, threeSums);
  }

  return Object.values(threeSums);
};

function twoSum(nums, target, lowIdx, highIdx, threeSums) {
  let prevLowest = -Infinity;
  let prevHighest = Infinity;
  while (lowIdx < highIdx) {
    // Skip repeating #s
    if (nums[lowIdx] === prevLowest) {
      lowIdx++;
      continue;
    } else if (nums[highIdx] === prevHighest) {
      highIdx--;
      continue;
    }

    const sum = nums[lowIdx] + nums[highIdx];
    if (sum === target) {
      const triplet = [-target, nums[lowIdx], nums[highIdx]];
      if (!(triplet in threeSums)) {
        threeSums[triplet] = triplet;
      }

      // Save prev for skipping recurring #s
      prevLowest = nums[lowIdx];
      prevHighest = nums[highIdx];

      // Contract set inwards
      lowIdx++;
      highIdx--;
    } else if (sum < target) { // Try higher low, since high is maxed
      lowIdx++;
    } else { // sum > target => Try lower high, since low is minimized
      highIdx--;
    }
  }
}