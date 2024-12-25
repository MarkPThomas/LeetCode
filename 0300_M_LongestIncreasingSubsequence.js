// 2024/12/17
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: DP - Iteration
// Notes w.r.t. solution: After peeking at solution, making tweaks to my prior attempt
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const dp = Array(nums.length).fill(1);
  for (let end = 1; end < nums.length; end++) {
    for (let curr = 0; curr < end; curr++) {
      if (nums[curr] < nums[end]) {
        dp[end] = Math.max(dp[end], dp[curr] + 1);
      }
    }
  }

  let longest = 0;
  for (const length of dp) {
    longest = Math.max(longest, length);
  }


  return longest;
};



// 2024/12/17
// O(n^3 ?) time complexity
// O(n) space complexity
// Time to complete: OT min
// Patterns: DP - Iteration
// Notes w.r.t. solution: Failed attempt. Got up to solving 24/55.
//  I was on the right track, but got bogged down/rushed in adding additional limits & loops rather than
//    seeing how to consolidate them into how 2 nested loops can work.
//  So close!
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let maxLength = 1;
  for (start = 0; start < nums.length - maxLength; start++) {
    let maxIdx = start;
    const dp = Array(nums.length).fill(1);

    while (nums.length - maxIdx + 1 >= maxLength) {
      let length = dp[maxIdx];
      let currMaxIdx = maxIdx;
      let nextMaxIdx = 0;
      for (i = maxIdx + 1; i < nums.length; i++) {
        if (nums[currMaxIdx] < nums[i]) {
          if (!nextMaxIdx) {
            nextMaxIdx = i;
          }
          currMaxIdx = i;
          length++;
        }
        dp[i] = length;
      }
      maxLength = Math.max(maxLength, length);

      // see if another maxIdx is better
      while (nextMaxIdx < nums.length) {
        if (nums[start] < nums[nextMaxIdx] && nums[nextMaxIdx] < nums[maxIdx]) {
          break;
        }
        nextMaxIdx++;
      }

      if (nextMaxIdx === maxIdx || nextMaxIdx === nums.length) {
        // Next max id is unchanged or out of bounds
        break;
      } else {
        maxIdx = nextMaxIdx;
      }
    }
  }

  return maxLength;
};