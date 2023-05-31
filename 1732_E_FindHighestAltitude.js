// O(n) time complexity
// O(1) space complexity
// Time to complete: 2 min
// Patterns: Prefix Sum
// Notes w.r.t. solution:

/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let maxAltitude = 0;
  let currentAltitude = 0;
  gain.forEach((delta) => {
    currentAltitude += delta;
    maxAltitude = Math.max(maxAltitude, currentAltitude);
  });

  return maxAltitude;
};
