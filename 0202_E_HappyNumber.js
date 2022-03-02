// O(n) time complexity (for int to digit conversion)
// O(n) space complexity (for hash map)
// Time to complete: 11:07 min
// Patterns: Hash map, linked list cycles, runner technique
// Notes w.r.t. solution:
//    Can have time O(log(n)) if using numerical method to parse number.
//    Can have space O(1) if using the runner technique to detect the loop.

/**
 * @param {number} n
 * @return {boolean}
 */
 var isHappy = function(n) {
  let sum = n;
  let history = {};
  while (sum !== 1) {
      let nPieces = sum.toString().split(''); // O(N) where N = number of digits = log(n)
      sum = 0;
      nPieces.forEach(nPiece => {
          let nPieceInt = parseInt(nPiece);
          sum += nPieceInt * nPieceInt;
      })
      if (history[sum]) {
          return false;
      } else {
          history[sum] = 1;
      }
  }
  return true;
};
