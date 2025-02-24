// 2025/02/19
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - Recursive #s
// Notes w.r.t. solution: Refactored state reduction to remove 'partial' calc
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // 2 x n board
  if (n <= 2) {
    return n;
  }

  let fullPrevPrev = 1;
  let fullPrev = fullPrevPrev;
  let full = 2;  // Filled board

  const MOD = 10 ** 9 + 7;
  for (let i = 3; i <= n; i++) {
    const fullTmp = full;
    full = (2 * full + fullPrevPrev) % MOD;

    fullPrevPrev = fullPrev;
    fullPrev = fullTmp;
  }

  return full;
};

// 2025/02/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - Recursive #s
// Notes w.r.t. solution: Refactored bottom-up solution to remove 'partial' array
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // 2 x n board
  if (n <= 2) {
    return n;
  }

  const MOD = 10 ** 9 + 7
  const full = [];

  full[0] = 1;
  full[1] = 1;
  full[2] = 2;

  for (let i = 3; i <= n; i++) {
    full[i] = (2 * full[i - 1] + full[i - 3]) % MOD;
  }

  return full[n];
};

// 2025/02/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - Recursive #s
// Notes w.r.t. solution: Refactored state reduction from bottom-up solution
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // 2 x n board
  if (n <= 2) {
    return n;
  }

  let full = 2;  // Filled board
  let fullPrev = 1;

  let partial = 1; // Partially filled board (considers trominos)

  const MOD = 10 ** 9 + 7;
  for (let i = 3; i < n + 1; i++) {
    const fullTmp = full;
    full = (full + fullPrev + 2 * partial) % MOD;
    partial = (partial + fullPrev) % MOD;

    fullPrev = fullTmp;
  }

  return full;
};

// 2025/02/15
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - Recursive #s
// Notes w.r.t. solution: Worked bottom-up solution
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // 2 x n board
  if (n <= 2) {
    return n;
  }

  const full = Array(n + 1);  // Filled board
  full[1] = 1;
  full[2] = 2;

  const partial = Array(n + 1); // Partially filled board (considers trominos)
  partial[2] = 1;

  const MOD = 10 ** 9 + 7;
  for (let i = 3; i < n + 1; i++) {
    full[i] = (full[i - 1] + full[i - 2] + 2 * partial[i - 1]) % MOD;
    partial[i] = (partial[i - 1] + full[i - 2]) % MOD;
  }

  return full[n];
};


// 2025/02/15
// O(n) time complexity
// O(n) space complexity
// Time to complete: 30:40 OT/NA min
// Patterns: Dynamic Programming - Recursive #s
// Notes w.r.t. solution: Attempted. Partial solution @ time, then worked top-down solution.
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // 2 x n board
  const MOD = 10 ** 9 + 7;

  const memoPartial = {};
  function dpPartial(n) {
    // Partially filled board (considers trominos)
    if (memoPartial[n]) {
      return memoPartial[n];
    }

    if (n <= 2) {
      return 1;
    }

    memoPartial[n] = (dpPartial(n - 1) + dpFull(n - 2)) % MOD;
    return memoPartial[n];
  }

  const memoFull = {};
  function dpFull(n) {
    // Filled board
    if (memoFull[n]) {
      return memoFull[n];
    }

    if (n === 1) {
      return 1;
    }

    if (n === 2) {
      return 2;
    }

    memoFull[n] = (dpFull(n - 1) + dpFull(n - 2)
      + 2 * dpPartial(n - 1)) % MOD;

    return memoFull[n];
  }

  return dpFull(n);
};