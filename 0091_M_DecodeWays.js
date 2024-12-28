// 2024/12/28
// O(n) time complexity
// O(1) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming - Counting/Fibonacci State Reduction
// Notes w.r.t. solution: Solution
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s.length || s[0] === '0') {
    return 0;
  }

  let prevPrev = 1;   // 1 way to decode no chars, i.e. don't, no need
  let prev = 1;       // 1 way to decode 1 char

  for (let i = 2; i <= s.length; i++) {
    let curr = 0;
    if (s[i - 1] !== '0') {
      curr = prev;
    }

    const twoDigit = Number(s.substring(i - 2, i));
    if (10 <= twoDigit && twoDigit <= 26) {
      curr += prevPrev;
    }

    if (!curr) {
      return 0;
    } else {
      prevPrev = prev;
      prev = curr;
    }
  }

  return prev;
};

// 2024/12/28
// O(n) time complexity
// O(n) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming - Counting/Fibonacci
// Notes w.r.t. solution: Solution
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s.length || s[0] === '0') {
    return 0;
  }

  const dp = Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    if (s[i - 1] !== '0') {
      dp[i] = dp[i - 1];
    }

    const twoDigit = Number(s.substring(i - 2, i));
    if (10 <= twoDigit && twoDigit <= 26) {
      dp[i] += dp[i - 2];
    }

    if (!dp[i]) {
      return 0;
    }
  }

  return dp[s.length];
};

// 2024/12/28
// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Dynamic Programming - Counting
// Notes w.r.t. solution: After a break & comment hint, I solved w/o timing.
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  // 2 0s in a row => break
  // Any 0 w/ 3 or higher precedent => break
  // Any 0 must always be paired with precedent 1 or 2
  if (!s.length || s[0] === '0') {
    return 0;
  }

  const chars = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '0') {
      chars.push(s[i]);
    } else if (chars[chars.length - 1].length === 2 || !canMerge(s, i)) {
      return 0;
    } else {
      chars[chars.length - 1] = chars[chars.length - 1] + s[i];
    }
  }

  function canMerge(chars, j) {
    // Valid 2nd state only if not already 2 chars (i.e. w/ 0)
    //  & can begin w/ 1 w/ any, or 2 w/ any <= 6
    return (j < chars.length && chars[j].length === 1
      && (chars[j - 1] === '1'
        || chars[j - 1] === '2' && Number(chars[j] < 7)));
  }

  const dp = Array(chars.length).fill(0);
  dp[0] = 1;
  dp[1] = canMerge(chars, 1) ? 2 : 1;

  for (let i = 2; i < chars.length; i++) {
    dp[i] = dp[i - 1] + (canMerge(chars, i) ? dp[i - 2] : 0);
  }

  return dp[dp.length - 1];
};

// 2024/12/28
// O() time complexity
// O(1) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming - Counting
// Notes w.r.t. solution: Passed 193/269
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  // 2 0s in a row => break
  // Any 0 w/ 3 or higher precedent => break
  // Any 0 must always be paired with precedent 1 or 2
  if (s[0] === '0') {
    return 0;
  }

  const chars = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '0') {
      chars.push(s[i]);
    } else if (chars[chars.length - 1] === '0') {
      return 0;
    } else {
      chars[chars.length - 1] = chars[chars.length - 1] + s[i];
    }
  }

  function canMerge(chars, j) {
    // Valid 2nd state only if not already 2 chars (i.e. w/ 0)
    //  & can begin w/ 1 w/ any, or 2 w/ any <= 6
    return chars[j].length === 1
      && (chars[j - 1] === '1'
        || chars[j - 1] === '2' && Number(chars[j] < 7));
  }

  const dp = Array(chars.length).fill(1);
  for (let i = 1; i < chars.length; i++) {
    let states = dp[i - 1];

    for (let j = i; j < chars.length; j++) {
      if (canMerge(chars, j)) {
        states++;
      }
    }
    dp[i] = states;
  }

  return dp[chars.length - 1];
};

// OICE
// Inputs: strings of numerical codes, unspaced
// Outputs: number of possible numerical decodings
// Constraints: Inputs range form 1 to 100 characters & contain only digits & may have leading 0s
// Edge cases: Leading 0s, all 0s

// Assumptions: All characters are upper case, so codes range from 1-26
// No leading 0s, 0 indicates grouping w/ prior number
// No more than 1 0 in a row (i.e. 10 & 20 are the only w/ 0s)

// Invalid cases return 0

// Groupings:
// 1, 12, but not 123
// Groupings are at most 2 characters, no leading 0s, and only 1 & 2 may have trailing 0s
// Min grouping is number of characters (assuming 1 character per letter) = 1


// Cases
// 236
// Initial result = 1
// i = 0: 2, 2->3 = 23 result++ (2)
// i = 1: 3, 3->6 != valid
// i = 2: 6, 6->__
// result = 2: (2, 3, 6), (23, 6)

// 216
// Initial result = 1
// i = 0: 2, 2->1 = 21 result++ (2)
// i = 1: 1, 1->6 = 16 result++ (3)
// i = 2: 6, 6->__
// result = 3: (2, 3, 6), (21, 6), (2, 16)

// 210
// Initial result = 1
// i = 0: 2, 2->1 = 21 result++ (2)
// i = 1: 1, 1-> 0 = 10 result++ (3)
// i = 2: 0 invalid
// 3: 2, 21, 10


// 2105
// Initial result = 1 only if no 0s => result = 0
// i = 0: 2, 2->1 = 21 but 2->-> 0 s invalid
// i = 1: 1, 1-> 0 = 10 result++ (1)
// i = 2: 0 invalid
// i = 3: 5 -> _
// 1: (2, 10, 5), (21, 05) is invalid

// Case to determine result = 1 w/o iterating all at first
// 2105
// Initial result = 1
// i = 0: 2, 2->1 = 21 but 2->-> 0 s invalid, and since there is a 0, result-- (0)
// i = 1: 1, 1-> 0 = 10 result++ (1)
// i = 2: 0 invalid
// i = 3: 5 -> _
// 1: (2, 10, 5), (21, 05) is invalid

// Case to determine result = 1 w/o iterating all at first
// 2305
// Initial result = 1
// i = 0: 2, 2->3 = 23 but 2->-> 0 s invalid, and since there is a 0, result-- (0)
// i = 1: 3, 3-> 0 = 30 which is invalid
// i = 2: 0 invalid
// i = 3: 5 -> _
// Result = 0

// 1213
//
// 5: (1, 2, 1, 3), (12, 1, 3), (12, 13), (1, 21, 3), (1, 2, 13)

// Valid pairings:
// 0: 10, 20
// 1: 11, 21
// 2: 12, 22
// 3: ...
// 6: 16, 26
// 7+: 17+, !27
// Only checked if leading character is between 1 & 6
// If
// For 0s, only checked ig leading character is 1 or 2
//

// Algorithm psuedocode



