// 2025/06/20
// O(n * m) time complexity
// O(1) space complexity
//  where n = # arrays, m = avg array length
// Time to complete: 12:03 min
// Patterns: Greedy
// Notes w.r.t. solution:
/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
  // subtract smallest first # from largest last #
  // If these occur in the same array,
  //  track 2 lowest & 2 highest, by array
  //  return max of the cross-subtractions
  let min = {
    val: Infinity,
    idx: -1
  }

  let min2nd = {
    val: Infinity,
    idx: -1
  }

  let max = {
    val: -Infinity,
    idx: -1
  }

  let max2nd = {
    val: -Infinity,
    idx: -1
  }

  for (let i = 0; i < arrays.length; i++) {
    const first = arrays[i][0];
    if (first < min.val) {
      min2nd.val = min.val;
      min2nd.idx = min.idx;

      min.val = first;
      min.idx = i;
    } else if (first < min2nd.val) {
      min2nd.val = first;
      min2nd.idx = i;
    }

    const last = arrays[i][arrays[i].length - 1];
    if (last > max.val) {
      max2nd.val = max.val;
      max2nd.idx = max.idx;

      max.val = last;
      max.idx = i;
    } else if (last > max2nd.val) {
      max2nd.val = last;
      max2nd.idx = i;
    }
  }

  if (min.idx !== max.idx) {
    return max.val - min.val;
  } else {
    return Math.max(
      max.val - min2nd.val,
      max2nd.val - min.val
    );
  }
};

// ===== Solutions =====
/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
  let maxDelta = -Infinity;
  let minVal = Infinity;
  let maxVal = -Infinity;
  for (let i = 0; i < arrays.length; i++) {
    const minValCurr = arrays[i][0];
    const maxValCurr = arrays[i][arrays[i].length - 1];

    if (minVal !== Infinity && maxVal !== -Infinity) {
      maxDelta = Math.max(maxDelta,
        Math.max(
          Math.abs(maxValCurr - minVal),
          Math.abs(maxVal - minValCurr)
        ));
    }

    minVal = Math.min(minVal, minValCurr);
    maxVal = Math.max(maxVal, maxValCurr);
  }

  return maxDelta;
};