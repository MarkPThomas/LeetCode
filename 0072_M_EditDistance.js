// 2025/02/14
// O() time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Worked solution

// 2025/02/14
// O() time complexity
// O(1) space complexity
// Time to complete: 30 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Attempted. Timed out before writing any code, just trying to understand the prob & work out a strategy :-(
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // states: 3 -
  //  1: insert @ i
  //  2: delete @ i
  //  3. match @ i w/ other string
  //      Char index is not a state because insert/delete cascades through string?

  // rough properties:
  //  lengths, char frequencies, char locations

  // By length properties:
  // If 1 > 2, should only delete, no insert
  // If 1 < 2, should only insert, no delete
  // If 1 = 2, equal # deletions<->inserts. > replace/match, so only do for 2 mismatches at diff locs

  // If 1 = 2, min # is # of differences, as that # of replacements must be made. Delete/insert always more
  // If lengths differ, min # deletes or updates + replacements

  // Differences:

  // Chars match in type & order, but not position -> insert or delete is needed
  //  1 op needed

  // Chars match in type, but not in order -> 'swap' needed
  //      - 1: Can change (or insert) extra non-matching char in correct position
  //          Change vs. insert based on whether lengths match
  //      - 2: + remove at old position
  //  2 ops needed

  //  Extra count of a char
  //      - Insert matching char at needed position
  //      - or delete extra char at diff position
  //  1 op needed
};