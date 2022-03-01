// O(N) time complexity
// O(N) space complexity
// Time to complete: 8 min
// Patterns: stack structure
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
  // FILO stack
   let parentheses = {
      '(': ')',
      '[': ']',
      '{': '}'
  };

  let closeBrackets = [];
  for (let i = 0; i < s.length; i++) {
      // check if open bracket
      if (parentheses[s[i]]) {
          // add expected closing bracket to pop off
          closeBrackets.push(parentheses[s[i]]);
      } else {
          // can only have a closing bracket that matches the top of the open brackets stack
          if (closeBrackets.pop() !== s[i]) {
              return false;
          }
      }
  }
  // All closing brackets must be emptied
  return closeBrackets.length === 0;
};