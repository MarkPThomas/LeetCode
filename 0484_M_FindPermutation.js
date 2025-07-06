// 2025/07/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Greedy, 2 Pointer
// Notes w.r.t. solution: Refactored prior solution to eliminate inner loop, improving n^2 to 2*n -> n.
/**
 * @param {string} s
 * @return {number[]}
 */
var findPermutation = function (s) {
  const INCREASING = 'I';
  const digits = [];

  let max = 1;
  digits.push(max);

  let i = 0
  while (i < s.length) {
    if (s[i] === INCREASING) {
      // We are always increasing from max in order to keep # lexicographically smallest
      max++;
      digits.push(max);
      i++;
    } else {
      // Offset max by # decrements, then add decrements from max in order to leep # lexicographically smallest

      // Get # of decrease increments
      let numOffset = 0;
      while (s[i] !== INCREASING && i < s.length) {
        numOffset++;
        i++;
      }

      // Increase last increase/max
      max = digits[digits.length - 1] + numOffset;
      digits[digits.length - 1] = max;

      // Fill in remaining decreases
      let prev = digits[digits.length - 1];
      while (numOffset) {
        prev--;
        digits.push(prev);
        numOffset--;
      }
    }
  }
  return digits;
};

// 2025/07/06
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 34:55 min
// Patterns: Greedy, 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number[]}
 */
var findPermutation = function (s) {
  const INCREASING = 'I';

  let max = 2;
  const digits = [];
  if (s[0] === INCREASING) {
    digits.push(1, 2);
  } else {
    digits.push(2, 1);
  }

  for (let i = 1; i < s.length; i++) {
    if (s[i] === INCREASING) {
      max++;
      digits.push(max);
    } else {
      let j = digits.length - 1;
      digits.push(digits[j] - 1);

      while (digits[j] !== max) {
        digits[j]++;
        j--;
      }
      digits[j]++;
      max = digits[j];
    }
  }
  return digits;
};

// 2025/06/30
// O() time complexity
// O(1) space complexity
// Time to complete: 41:36 min @ 14/26
// Patterns:
// Notes w.r.t. solution: Attempted
/**
 * @param {string} s
 * @return {number[]}
 */
var findPermutation = function (s) {
  // OT/had to leave. Finish attempting

  // I = increasing -> base = 1, 2
  // D = decreasing -> base = 2, 1
  // permutations, so digits cannot be re-used, i.e. use all of range 1<->resultLength
  // smallest lexicraphical => smallest higher order magnitude #s => greedy?
  // n = s.length + 1
  const INCREASING = 'I';

  let max1st = 2;
  let max2nd = 1;
  const digits = [];
  if (s[0] === INCREASING) {
    digits.push(max2nd, max1st);
  } else {
    digits.push(max1st, max2nd);
  }

  for (let i = 1; i < s.length; i++) {
    let nextNum = digits[digits.length - 1];
    if (s[i] === INCREASING) {
      nextNum++;
      if (nextNum <= max1st) {
        nextNum = max1st + 1;
      }

      max2nd = max1st;
      max1st = Math.max(max1st, nextNum);
    } else {
      nextNum--;
      if (nextNum < 1 || nextNum === max2nd) {
        nextNum = nextNum < 1 ? 1 : max1st;
        let j = digits.length - 1;
        do {
          digits[j]++;
          if (digits[j] > max1st) {
            max2nd = max1st;
            max1st = digits[j];
          } else if (digits[j] > max2nd) {
            max2nd = digits[j];
          }
          j--;
        } while (digits[j + 1] === digits[j])

      }
      // nextNum === max1st ?
    }

    digits.push(nextNum);
  }
  return digits;
};