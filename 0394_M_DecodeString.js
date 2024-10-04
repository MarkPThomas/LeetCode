// 2024/10/04
// O() time complexity
// O() space complexity
// Time to complete: Over time
// Patterns: Stack
// Notes w.r.t. solution: Was on the right track, could have done better diagramming out strategy more carefully before coding.
//    People consider this one Hard.
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];

  let i = 0;
  while (i < s.length) {
    if (s[i] !== ']') {
      stack.push(s[i]);
      i++;
    } else {
      // Skip char
      i++;

      // Build string
      let string = '';
      let item = stack.pop();
      while (item !== '[' && stack.length) {
        string = item + string;
        item = stack.pop();
      }

      // Build count
      let kChar = '';
      while (!isNaN(parseInt(stack[stack.length - 1])) && stack.length) {
        kChar = stack.pop() + kChar;
      }

      // Add count to stack
      let k = parseInt(kChar);
      while (k) {
        stack.push(string);
        k--;
      }
    }
  }

  return stack.join('');
};