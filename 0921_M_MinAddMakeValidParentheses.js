// 2025/04/23
// O(n) time complexity
// O(1) space complexity
// Time to complete: 21:53 min
// Patterns: Stack(-ish)
// Notes w.r.t. solution: Optimized using open bracket counter instead
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
  // Case A:
  //  Any closing before any opening need equal # of opening before
  // Case B:
  //  Any opening after any opening need equal # of closing after (count in reverse?)
  // It looks like case B is naturally handled by counting
  // Starting at 0, once we have an opening bracket, we can count imbalance
  //  # needed is case A + abs imbalance count

  const OPEN = '(';
  const CLOSE = ')';

  let imbalance = 0;
  let movesNeeded = 0;
  for (const char of s) {
    if (char === OPEN) {
      if (imbalance < 0) {
        // Anytime we ended -, we needed more opening brackets earlier
        movesNeeded += Math.abs(imbalance);
        imbalance = 0;
      }
      imbalance++;
    } else if (char === CLOSE) {
      imbalance--;
    }
  }

  return movesNeeded + Math.abs(imbalance);
};