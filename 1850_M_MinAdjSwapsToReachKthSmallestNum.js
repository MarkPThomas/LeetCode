// yyymmdd
// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:

// ==== Solution
// O(n^2) time complexity
// O(n) space complexity
// Patterns: Geeedy, 2 Pointer
/**
 * @param {string} num
 * @param {number} k
 * @return {number}
 */
var getMinSwaps = function (num, k) {

  function nextPermutation(nums) {
    let i = nums.length - 1;
    while (i > 0 && nums[i] <= nums[i - 1]) {
      i--;
    }

    if (i > 0) {
      let j = nums.length - 1;
      while (j > i && nums[j] <= nums[i - 1]) {
        j--;
      }
      swap(i - 1, j, nums);
    }

    reverse(i, nums.length - 1, nums);
  }

  function reverse(start, end, nums) {
    while (start < end) {
      swap(start, end, nums);
      start++;
      end--;
    }
  }

  const swap = (start, end, nums) => [nums[end], nums[start]] = [nums[start], nums[end]];

  const digitsWonderful = num.split('');
  for (let i = 1; i <= k; i++) { // get next permutation k times to get kth wonderful (next val > curr val)
    nextPermutation(digitsWonderful);
  }

  const digitsSwap = num.split('');

  let numSwaps = 0;
  for (let i = 0; i < digitsSwap.length; i++) {
    if (digitsSwap[i] === digitsWonderful[i]) { // skip matching digits
      continue;
    }

    // Get index of next matching int or end
    // Greedy because for each mismatched position,
    //  we are pulling the next matching digit to the current mismatched position
    let j = i + 1;
    while (digitsWonderful[i] !== digitsSwap[j] && j < digitsSwap.length) {
      j++;
    }

    while (i < j) { // Swap each adjacent pair working back to first diff int
      swap(j, j - 1, digitsSwap);
      j--;

      numSwaps++;
    }
  }

  return numSwaps;
};