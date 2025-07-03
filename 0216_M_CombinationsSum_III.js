// 2025/01/08
// O() time complexity
// O(1) space complexity
// Time to complete: 33:25+ min
// Patterns:  Backtracking
// Notes w.r.t. solution: Peeked to finish & I was very close!
//  Would have probably worked it out with another 10-15 min of fiddling. :-/
//  Backtracking was a bit muddled, would have probably been OK working on more slowly & organized.
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const maxNum = 10;
  // const skipped = Array(maxNum + 1).fill(false);
  const results = [];

  function backtrack(nextNum, sum, sums) {
    // Check & continue if needed
    if (sums.length === k && sum === n) {
      results.push([...sums]);
      return;
    } else {
      for (let i = nextNum + 1; i < maxNum; i++) {
        // Try
        sum += i;
        sums.push(i);

        backtrack(i, sum, sums);

        // Undo
        sum -= sums.pop();
      }
    }
  }

  backtrack(0, 0, []);

  return results;
};