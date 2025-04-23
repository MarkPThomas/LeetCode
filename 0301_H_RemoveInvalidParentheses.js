// 2025/04/22
// O(2^n) time complexity // 2 paths are to keep the char, or remove the char
// O(n) space complexity
// Time to complete: 49:51 min
// Patterns: Backtracking
// Notes w.r.t. solution: Mostly finished in 32:32.
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  const OPEN = '(';
  const CLOSE = ')';

  // T: O(n)
  // T: O(1)
  function getMinRemove() {
    // only remove if at <= min # removals (pre-calc)
    let minRemove = 0;
    let balance = 0;
    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      if (char === OPEN) {
        if (i === s.length - 1) {
          minRemove++;
        } else {
          balance++;
        }
      } else if (char === CLOSE) {
        balance--;
        if (balance < 0) {
          minRemove++;
          balance++;
        }
      }
    }

    // If parens balanced, balance = 0 at end
    //  Excessive closures already handled
    //  Ecxessive openings indicated by a remaining positive #
    if (balance > 0) {
      minRemove += balance;
    }

    return minRemove;
  }

  // T: O(2^n)
  // T: O(n)
  function backtrack(i, balance, result) {
    // save if valid at end of string
    const numRemoved = s.length - result.length;
    if (i === s.length) {
      if (balance === 0 && numRemoved === minRemove && !(result in visited)) {
        results.push(result.join(''));
        visited[result] = true;
      }
      return;
    }

    const char = s[i];
    // ignore any closures if there are no prior openings
    // try removing a closure vs. not removing it
    if (char === OPEN) {
      handleOpenChar(i, balance, result);
    } else if (char === CLOSE) {
      handleCloseChar(i, balance, result, numRemoved);
    } else {
      handleMiscChar(i, balance, result);
    }
  }

  // T: O(2^n)
  // T: O(n)
  function handleOpenChar(i, balance, result) {
    if (i < s.length - 1) { // Always try include unless last
      // Try include
      result.push(s[i]);
      backtrack(i + 1, balance + 1, result);
      result.pop();
    }

    // Try remove
    backtrack(i + 1, balance, result);
  }

  // T: O(2^n)
  // T: O(n)
  function handleCloseChar(i, balance, result, numRemoved) {
    if (balance > 0) {
      // Try include
      result.push(s[i]);
      backtrack(i + 1, balance - 1, result);
      result.pop();
    }

    if (balance > 0 || numRemoved >= minRemove) { // Remove if possible
      // Try remove
      backtrack(i + 1, balance, result);
    }
  }

  // T: O(n)
  // T: O(n)
  function handleMiscChar(i, balance, result) {
    result.push(s[i]);
    backtrack(i + 1, balance, result);
    result.pop();
  }

  const visited = {};
  const results = [];
  const minRemove = getMinRemove();

  backtrack(0, 0, []);

  return results;
};