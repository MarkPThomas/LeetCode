// 2025/06/27
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: OT 30:14 min
// Patterns: 2 Pointer
// Notes w.r.t. solution: Tripped up on all interior subsequences, 2^n ;-P
//  Skimmed solution & mostly solved except for handling numerical overflow for large n.
//  Looked at solution for pre-compute handling of this.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var numSubseq = function (nums, target) {
  const modulo = 10 ** 9 + 7;

  function updatePowers(delta, powers) {
    if (delta > powers.length) {
      for (let i = powers.length; i <= delta; i++) {
        powers[i] = (powers[i - 1] * 2) % modulo;
      }
    }
  }

  nums.sort((a, b) => a - b);

  const powers = [];
  powers[0] = 1;

  // 2 ptr, 1 @ min, 1 @ max
  let numSubs = 0;
  let right = nums.length - 1;
  for (let left = 0; left <= right; left++) {
    // Find corresponding max
    while (right >= left && nums[right] + nums[left] > target) {
      right--;
    }

    if (left > right) { // Single # is still too large to be a min
      break;
    }

    // Update 2^n powers - pre-compute to the size needed, if needed
    const delta = right - left;
    updatePowers(delta, powers);
    numSubs = (numSubs + powers[delta]) % modulo;
  }

  return numSubs % modulo;
};