// O(n) time complexity
// O(n) space complexity
// Time to complete: 40:00 min
// Patterns: DP, Recursion
// Notes w.r.t. solution: Solved 90% before giving up and looking at solution.
//    Time includes prior solving & final implementation.
//    I think I would have gotten this with a couple extra minutes of effort, added 2 min for that

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function (n, k) {
  return recursion(n, k);
};

function recursion(n, k) {
  if (n === 1) {
    return 0;
  }

  const kMax = Math.pow(2, n - 1);
  const kMaxHalf = kMax / 2;

  if (k <= kMaxHalf) {
    // Get same k of previous row
    return recursion(n - 1, k);
  } else {
    // Get flipped k of first half that maps to k offsets from center
    return 1 - recursion(n, k - kMaxHalf);
  }
}