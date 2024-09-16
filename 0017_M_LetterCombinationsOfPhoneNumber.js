// O(n * 4^n) time complexity
// O(n) space complexity, for n levels of recursion
// where n = # digits, assuming upper bound of 4 letters possible for each n
// Time to complete: 15:23 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) {
    return [];
  }

  const letters = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  }

  let results = [];
  const digitChars = digits.split('');

  function backtrack(idx, result) {
    if (idx === digitChars.length) {
      results.push(result.join(''));
      return;
    }

    const digitLetters = letters[digitChars[idx]];
    for (const letter of digitLetters) {
      result.push(letter);
      backtrack(idx + 1, result);
      result.pop();
    }
  }

  backtrack(0, []);
  return results;
};