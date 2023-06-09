// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 7:00 min
// Patterns: Binary Search
// Notes w.r.t. solution:

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let min = 1;
  let max = n;
  while (min <= max) {
    let currentGuess = Math.floor((min + max) / 2);
    let guessResult = guess(currentGuess);
    if (guessResult === 0) {
      return currentGuess;
    } else if (guessResult === 1) {
      min = currentGuess + 1;
    } else if (guessResult === -1) {
      max = currentGuess - 1;
    }
  }
};