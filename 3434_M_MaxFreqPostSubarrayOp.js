// 2025/06/07
// O(n) time complexity
// O(n) space complexity
// Time to complete: OT min
// Patterns: Hashmap, 2 Pointer, Greedy
// Notes w.r.t. solution: 45:19 - 96/749, 1:06:14 - 699/749, 1:13:34 - 701/799
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  // add x to all #s in 1+ contiguous #s subset in nums
  // find max freq of k in entire nums after doing this once
  // If subset is entire array, x shifts all #s by same amount
  //  so choose x that the max # of nums = k
  //          i.e. x = numMostFrequent - k
  // If subset is less than entire array, x shifts all subset #s by same amount
  //  so choose x that the resulting numMostFrequent = numMostFrequent outside subset

  // subset shrunk from left or right
  //  least costly num removal is # that occurs least in array
  //  most costly num removal is # that occurs most in array - does it ever make sense?
  //  stop early in any way?
  function getMaxFreq(freqs) {
    let maxFreq = -Infinity;
    for (const count of Object.values(freqs)) {
      maxFreq = Math.max(maxFreq, count);
    }
    return maxFreq === -Infinity ? 0 : maxFreq;
  }

  let maxFreqInner = -Infinity;
  const freqInner = {};
  for (const num of nums) {
    freqInner[num] = (freqInner[num] ?? 0) + 1;
    maxFreqInner = Math.max(maxFreqInner, freqInner[num]);
  }

  // let x = maxFreqInner - k;
  // kFreqInner = maxFreqInner since we can always shift to = k w/ + x
  let maxFreq = maxFreqInner;

  let maxFreqOuter = 0;
  const freqOuter = {};

  let left = 0;
  let right = nums.length;
  while (left <= right) {
    let numRemoved = 0;
    if (nums[left] === nums[right]) {
      // break;
      numRemoved = nums[left];
      left++;
    } else if (nums[left] === k) {
      numRemoved = nums[left];
      left++;
    } else if (nums[right] === k) {
      numRemoved = nums[right];
      right--;
    } else if (freqInner[nums[left]] < freqInner[nums[right]]) {
      numRemoved = nums[left];
      left++;
      // } else {
      // } else if (freqInner[nums[left]] >= freqInner[nums[right]]) {
    } else if (freqInner[nums[left]] > freqInner[nums[right]]) {
      numRemoved = nums[right];
      right--;
    } else { // get ks out sooner

    }

    // Update inner/outer freq counts
    freqInner[numRemoved]--;
    if (!freqInner[numRemoved]) {
      delete freqInner[numRemoved];
    }
    freqOuter[numRemoved] = (freqOuter[numRemoved] ?? 0) + 1;

    // Update inner/outer max freqs
    // maxFreqOuter = Math.max(maxFreqOuter, freqOuter[numRemoved]);
    // if (numRemoved === maxFreqInner && !freqInner[numRemoved]) {
    if (!freqInner[numRemoved]) {
      maxFreqInner = getMaxFreq(freqInner);
    }

    let kFreqOuter = freqOuter[k] ?? 0;
    maxFreq = Math.max(maxFreq, kFreqOuter + maxFreqInner);
  }

  return maxFreq;
};

// ===== Solution =====
// O() time complexity
// O(1) space complexity
// Patterns:
