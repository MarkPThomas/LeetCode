// 2025/06/29
// O() time complexity
// O(1) space complexity
// Time to complete: OT 32:47 min
// Patterns: Math
// Notes w.r.t. solution: Never worked out enough of a solution to code :-(

// ===== Solution =====
// O(n) time complexity
// O(1) space complexity
// Patterns: Math
// Notes w.r.t. solution: This problem is dumb
/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *     // Compares 4 different elements in the array
 *     // return 4 if the values of the 4 elements are the same (0 or 1).
 *     // return 2 if three elements have a value equal to 0 and one element has value equal to 1 or vice versa.
 *     // return 0 : if two element have a value equal to 0 and two elements have a value equal to 1.
 *     @param {number} a, b, c, d
 *     @return {number}
 *     this.query = function(a, b, c, d) {
 *         ...
 *     };
 *
 *     // Returns the length of the array
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {ArrayReader} reader
 * @return {number}
 */
var guessMajority = function (reader) {
  let countEqual = 1;
  let countDiffer = 0;
  let indexDiffer = -1;

  function countOccurrence(equal, i) {
    if (equal) {
      countEqual++;
    } else {
      countDiffer++;
      indexDiffer = i;
    }
  }

  const query0123 = reader.query(0, 1, 2, 3);
  const query1234 = reader.query(1, 2, 3, 4);

  countOccurrence(query0123 === query1234, 4);
  countOccurrence(reader.query(0, 2, 3, 4) === query1234, 1);
  countOccurrence(reader.query(0, 1, 3, 4) === query1234, 2);
  countOccurrence(reader.query(0, 1, 2, 4) === query1234, 3);

  for (let i = 5; i < reader.length(); i++) {
    countOccurrence(reader.query(1, 2, 3, i) === query0123, i);
  }

  if (countEqual > countDiffer) {
    return 0;
  } else if (countDiffer > countEqual) {
    return indexDiffer
  } else {
    return -1;
  }
};