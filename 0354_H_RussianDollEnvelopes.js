// 2025/07/14
// O() time complexity
// O() space complexity
// Time to complete: 46:19 min TLE @ 85/87
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Need to optimize further - perhaps binary search?
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  // If we sort by width, then for each width we can:
  //  1. find the next width (linear scan or binary search)
  //  2. Add to count
  // We can do the same for height separately
  // We could get a set of possibilities by width, and then cull them by height
  // Earlier envelopes limit later ones,
  //  and the smallest envelope might not result in the most Russian dolled envelopes
  //  => DP, varying by starting envelope (width or height -> )

  const envelopesByWidth = [];
  for (let i = 0; i < envelopes.length; i++) {
    envelopesByWidth.push([i, envelopes[i][0]]);
  }
  envelopesByWidth.sort((a, b) => a[1] - b[1]);

  const memo = {};

  function dp(iStart) {
    if (iStart in memo) {
      return memo[iStart];
    }

    const idx = envelopesByWidth[iStart][0];
    const [width, height] = envelopes[idx];

    let maxEnvelopes = 1;
    // Optimize w/ Binary Search?
    for (let iNext = iStart + 1; iNext < envelopesByWidth.length; iNext++) {
      const idxNext = envelopesByWidth[iNext][0];
      const [widthNext, heightNext] = envelopes[idxNext];
      if (width < widthNext && height < heightNext) {
        // Either take this idx, or skip it
        maxEnvelopes = Math.max(maxEnvelopes, dp(iNext) + 1);
      }
    }
    memo[iStart] = maxEnvelopes;

    return memo[iStart];
  }

  let maxEnvelopes = 0;
  for (let i = 0; i < envelopesByWidth.length; i++) {
    maxEnvelopes = Math.max(maxEnvelopes, dp(i));
  }
  return maxEnvelopes;
};

// ===== Solution =====
// O(n * log(n)) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming, LIS, Binary Search
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  function lengthOfLIS(nums) {
    const sub = [];

    for (const num of nums) {
      if (!sub.length || num > sub[sub.length - 1]) { // add # if > than last #
        sub.push(num);
      } else { // Get idx of first subNum >= num & reduce val to num
        const idxNextGreaterOrEqual = binarySearch(num, sub);
        sub[idxNextGreaterOrEqual] = num;
      }
    }

    return sub.length;
  }

  function binarySearch(num, sub) {
    let left = 0;
    let right = sub.length - 1;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (sub[mid] == num) {
        return mid;
      }

      if (sub[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  // Sort by width increasing, then by height decreasing
  //  Height decreasing means we always deal with valid values
  //      & stop as soon as they are no longer valid.
  //  Also constrains envelopes such that 2 envelopes = in width can never
  //      be in the same increasing subsequence
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1]; // Decreasing height for equal width
    } else {
      return a[0] - b[0]; // Increasing width
    }
  });

  const heights = Array(envelopes.length);
  for (let i = 0; i < envelopes.length; i++) {
    heights[i] = envelopes[i][1];
  }

  return lengthOfLIS(heights);
};