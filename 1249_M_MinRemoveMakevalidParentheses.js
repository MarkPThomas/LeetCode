// 2025/04/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 12:11 min
// Patterns: Stack, Greedy
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  // stack?
  // store open bracket idxs in one stack
  // if a matching closure is found, remove the last stack item
  // if a mismatching closure is found (i.e. open.length === 0)
  //      add to removal stack

  // to write out, add s chars to output array, skipping removal stack indices
  //  reverse stack first

  const OPEN = '(';
  const CLOSE = ')';

  const parensOpen = [];
  const parensRemove = Array(s.length).fill(false);
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === OPEN) {
      parensOpen.push(i);
    } else if (char === CLOSE && parensOpen.length) {
      parensOpen.pop();
    } else if (char === CLOSE && !parensOpen.length) {
      parensRemove[i] = true;
    }
  }

  while (parensOpen.length) {
    parensRemove[parensOpen.pop()] = true;
  }

  const validParens = [];
  for (let i = 0; i < s.length; i++) {
    if (!parensRemove[i]) {
      validParens.push(s[i]);
    }
  }
  return validParens.join('');
};