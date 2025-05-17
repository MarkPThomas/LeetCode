// 2025/05/17
// O(n) time complexity
// O(1) space complexity
// Time to complete: 28:44 min
// Patterns: Greedy
// Notes w.r.t. solution: Realized I could simplify to make faster, so refactored w/o timing. Both are included.

// ===== Refactored =====
/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function (s) {

  function getSwaps(startChar) {
    let swapsA = 0;
    let swapsB = 0;

    for (let i = 0; i < s.length; i++) {
      // All startChars occur at even indices
      // All nextChars occur at odd indices
      if (s[i] === startChar && i % 2 !== 0) {
        swapsA++;
      } else if (s[i] !== startChar && i % 2 === 0) {
        swapsB++;
      }
    }

    return swapsA === swapsB ? swapsA : -1;
  }

  const swaps = Math.min(getSwaps('0'), getSwaps('1'));
  return swaps === Infinity ? -1 : swaps;
};

// ===== Original =====
/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function (s) {

  function getSwaps(startChar) {
    let swapsA = 0;
    let swapsB = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === startChar && i % 2 !== 0) {
        // All startChars occur at even indices
        swapsA++;
      } else if (s[i] !== startChar && i % 2 === 0) {
        // All nextChars occur at odd indices
        swapsB++;
      }
    }

    return swapsA === swapsB ? swapsA : -1;
  }

  const ONE = '1';
  const ZERO = '0';

  let num0 = 0;
  let num1 = 0;
  for (const char of s) {
    if (char === ZERO) {
      num0++;
    } else {
      num1++;
    }
  }

  if (num1 - num0 > 1) {
    return -1;
  }

  if (num1 === num0) { // Even #, 1010 or 0101...
    const swapsA = Math.max(getSwaps(ONE), -1);
    const swapsB = Math.max(getSwaps(ZERO), -1);
    return Math.min(swapsA, swapsB);
  } else if (num0 > num1) { // Odd #, 010...
    return getSwaps(ZERO);
  } else {    // Odd #, 101...
    return getSwaps(ONE);
  }
};