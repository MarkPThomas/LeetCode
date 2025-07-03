// 2025/04/16
// O(5^(n /2)) time complexity
// O(n) space complexity
// Time to complete: 48:10 min
// Patterns: Backtracking, 2 pointer
// Notes w.r.t. solution: Optimized speed, space & complexity a bit from prior solution
/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function (n) {
  const stroboMap = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6
  }
  const stroboInts = Object.values(stroboMap);

  const stroboNums = [];

  function backtrack(idxLeft, num) {
    const idxRight = n - idxLeft - 1;
    const deltaIdx = idxRight - idxLeft;

    if (deltaIdx < 0) {
      stroboNums.push(num.join(''));
      return;
    }

    for (const stroboInt of stroboInts) {
      if (stroboInt === 0 && (n !== 1 && num[0] === undefined)) {
        continue;
      } else if ((stroboInt === 6 || stroboInt === 9) && deltaIdx === 0) {
        continue;
      }

      num[idxLeft] = stroboInt;
      num[idxRight] = stroboMap[stroboInt];

      backtrack(idxLeft + 1, num);
    }
  }

  backtrack(0, Array(n));
  return stroboNums;
};


// 2025/04/16
// O() time complexity
// O(1) space complexity
// Time to complete: 38:14 min
// Patterns: Backtracking, 2 pointer
// Notes w.r.t. solution: 20:20 TLE @ 11/14
/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function (n) {
  const stroboMap = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6
  }
  const stroboInts = Object.values(stroboMap);

  const stroboNums = [];

  function backtrack(n, numLeft, numRight) {
    if (n <= 0) {
      const numRightAdj = [...numRight];
      if (n < 0) {
        numRightAdj.pop();
      }

      stroboNums.push(numLeft.join('') + numRightAdj.reverse().join(''));
      return;
    }

    for (const stroboInt of stroboInts) {
      if (stroboInt === 0 && (n !== 1 && numLeft.length === 0)) {
        continue;
      } else if ((stroboInt === 6 || stroboInt === 9) && n === 1) {
        continue;
      }

      numLeft.push(stroboInt);
      numRight.push(stroboMap[stroboInt]);

      backtrack(n - 2, numLeft, numRight);

      numRight.pop();
      numLeft.pop();
    }
  }

  backtrack(n, [], []);
  return stroboNums;
};


// 2025/04/16
// O(5^n + m * n) time complexity
// O(n) space complexity
//  where m = # of valid strobo nums
// Time to complete: 20:20 min TLE @ 11/14
// Patterns: Backtracking, 2 pointer
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function (n) {
  // set of integers:
  // 0-0, 1-1, 6-9, 8-8
  // for each n, include all unique from set
  //      one at a time, drilling down, then backtrack for next
  // only exception is leave out 0 on first set (no leading 0s?)

  // Entire result must be strobo, so
  //  no trailing 0s (they become leading)
  //      => 0s can only occur in the middle of a number unless it is the sole digit
  // Result must be symmetric by set (so 6-9, or 8-8, etc.)
  //  Only center # is always
  //  This can only be validated once the # is complete
  //  Validation is like a palindrome - 2 ptr solution
  //      initial left = right if odd length, else right = left + 1
  const stroboMap = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6
  }
  const stroboInts = Object.values(stroboMap);

  const stroboNums = [];

  function backtrack(n, num) {
    if (n === 0) { // T: O(n * m)
      if (isStroboNum(num)) {
        stroboNums.push(num.join(''));
      }
      return;
    }

    for (const stroboInt of stroboInts) {
      num.push(stroboInt);
      backtrack(n - 1, num);
      num.pop();
    }
  }

  function isStroboNum(num) { // T: O(n)
    //  Validation is like a palindrome - 2 ptr solution
    //      initial left = right if odd length, else right = left + 1
    let right = Math.floor(num.length / 2);
    let left = (num.length % 2) ? right : right - 1;

    while (0 <= left && right < num.length) {
      if (num[left] !== stroboMap[num[right]]) {
        return false;
      }

      left--;
      right++;
    }

    return (num.length === 1 || num[0] !== 0);
  }

  backtrack(n, []);
  return stroboNums;
};


// ===== Solution =====
// Faster, simpler
/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function (n) {
  function generate(level) {
    // Building out from even #
    if (level === 0) {
      return [''];
    }

    // Building out from odd #
    if (level === 1) {
      return ['0', '1', '8'];
    }

    const prevLevel = generate(level - 2);

    const result = [];
    for (const numStr of prevLevel) {
      if (level !== n) {
        result.push('0' + numStr + '0');
      }
      result.push('1' + numStr + '1');
      result.push('6' + numStr + '9');
      result.push('8' + numStr + '8');
      result.push('9' + numStr + '6');
    }

    return result;
  }

  return generate(n);
};