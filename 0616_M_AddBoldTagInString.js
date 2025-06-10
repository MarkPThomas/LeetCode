// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:

// ===== Solution =====
// O() time complexity
// O(1) space complexity
// Patterns: String
// Notes w.r.t. solution: Brute Force
/**
 * @param {string} s
 * @param {string[]} words
 * @return {string}
 */
var addBoldTag = function (s, words) {
  const boldChars = new Array(s.length).fill(false);

  for (const word of words) {
    // Find all starts of word & tag in array
    let startIdx = s.indexOf(word);
    while (startIdx !== -1) {
      for (let i = startIdx; i < startIdx + word.length; i++) {
        boldChars[i] = true;
      }

      startIdx = s.indexOf(word, startIdx + 1);
    }
  }

  const OPEN = '<b>';
  const CLOSE = '</b>';
  const result = [];
  for (let i = 0; i < s.length; i++) {
    if (boldChars[i] && !boldChars[i - 1]) {
      result.push(OPEN);
    }

    result.push(s[i]);

    if (boldChars[i] && !boldChars[i + 1]) {
      result.push(CLOSE);
    }
  }

  return result.join('');
};