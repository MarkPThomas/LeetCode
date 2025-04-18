// 2025/04/18
// O(n) time complexity
// O(n - d) space complexity
//  where n = # chars, d = max # duplicates
// Time to complete: 5:34 min
// Patterns: Monotonic Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
  const uniqueChars = [];
  for (const char of s) {
    let isUnique = uniqueChars[uniqueChars.length - 1] !== char;
    while (uniqueChars.length && uniqueChars[uniqueChars.length - 1] === char) {
      uniqueChars.pop();
    }

    if (isUnique) {
      uniqueChars.push(char);
    }
  }

  return uniqueChars.join('');
};