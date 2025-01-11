// 2025/01/10
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: LIS
// Notes w.r.t. solution: Worked through solution
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  let first = Infinity;
  let second = Infinity;

  for (const num of nums) {
    if (num <= first) {
      first = num;
    } else if (num <= second) {
      second = num;
    } else {
      return true;
    }
  }

  return false;
};

// 2025/01/10
// O() time complexity
// O(1) space complexity
// Time to complete: 4:23 min
// Patterns: Recursion
// Notes w.r.t. solution: 3:23 TLE @ 76/84
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  // To avoid TLE, as a cheeky workaround to many redundant #s, just check that there are even enough unique #s
  const uniqueNums = new Set();
  for (let i = 0; i < nums.length; i++) {
    uniqueNums.add(nums[i]);
  }

  if (uniqueNums.size < 3) {
    return false;
  }

  function increasingNum(startIdx, lastNum, numsCheck) {
    if (!numsCheck) {
      return true;
    }

    for (let i = startIdx; i < nums.length; i++) {
      if (lastNum < nums[i]) {
        if (increasingNum(i + 1, nums[i], numsCheck - 1)) {
          return true;
        }
      }
    }

    return false;
  }

  return increasingNum(0, -Infinity, 3);
};

// 2025/01/10
// O() time complexity
// O(1) space complexity
// Time to complete: 14:09 min @ 70/84
// Patterns: Single pass brute force
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  // check for monotic series
  // keep first as min, third as max > min, second as min < any < max
  let first = nums[0];
  let second = null;
  let third = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > first) {
      if (nums[i] > third) {
        second = third;     // Either -Inf or prev max
        third = nums[i];    // New max

        if (second !== -Infinity) {
          return true;
        }
      } else {
        second = nums[i];
        return true;
      }
    } else {
      if (third !== -Infinity) {
        second = third;
        // Look ahead to see if there is one more > than both
        for (let j = i + 1; j < nums.length; j++) {
          if (nums[j] > second) {
            return true;
          }
        }
      }

      // If not, reset
      first = nums[i];
      second = null;
      third = -Infinity;
    }
  }


  return second !== null && second !== -Infinity;
};