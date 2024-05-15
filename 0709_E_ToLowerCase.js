// 2024/05/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:19 min
// Patterns: Hashmap, ASCII
// Notes w.r.t. solution: Solved in 7:59, then optimized. Decided to do more than literally call the built-in function.
/**
 * @param {string} s
 * @return {string}
 */
var toLowerCase = function (s) {
  // return s.toLowerCase();

  const converter = {};
  for (let i = 0; i < 26; i++) {
    const lowerCharCode = 'a'.charCodeAt() + i;
    const upperCharCode = 'A'.charCodeAt() + i;

    converter[upperCharCode] = lowerCharCode;
  }

  const lowerCase = [];
  for (let i = 0; i < s.length; i++) {
    const charCode = s.charCodeAt(i);
    if (converter[charCode]) {
      const newCharCode = converter[charCode] ?? charCode;
      const newChar = String.fromCharCode(newCharCode);

      lowerCase.push(newChar);
    } else {
      lowerCase.push(s[i]);
    }

  }

  return lowerCase.join('');
};