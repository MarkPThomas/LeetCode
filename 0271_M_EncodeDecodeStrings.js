// 2025/02/26
// O(n) time complexity
// O(n * c) space complexity
//  where c = length of delimiter, n = # words
// Time to complete: 15:41 min
// Patterns: String, Design
// Notes w.r.t. solution: Consider escapes+delimiters to avoid false positives.
//  Consider chunking (adding length of word w/ preceding delimiter) to add further validation
/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
  // str can be 0 length
  // separator. 2xseparator indicates 0 length string.
  const separator = '#!,!#';

  return strs.join(separator);
};

/**
* Decodes a single string to a list of strings.
*
* @param {string} s
* @return {string[]}
*/
var decode = function (s) {
  const separator = '#!,!#';

  function atSeparator(i, s, separator) {
    let j = 0;
    while (s[i] === separator[j] && j < separator.length) {
      i++;
      j++;
    }

    return j === separator.length;
  }

  const strs = [];
  let str = [];
  let i = 0;
  while (i < s.length) {
    const char = s[i];
    if (atSeparator(i, s, separator)) {
      strs.push(str.join(''));
      str = [];
      i += separator.length;
    } else {
      str.push(char);
      i++;
    }
  }
  strs.push(str.join(''));

  return strs;
};

/**
* Your functions will be called as such:
* decode(encode(strs));
*/