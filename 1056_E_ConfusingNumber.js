// 2024/03/19 - Optimized
// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:30 min (original) + 9:20 min (optimization) = 26:50 min
// Patterns: Array, string manipulation, 2 ptrs
// Notes w.r.t. solution: Lost a lot of time forgetting to pass in arguments to array methods.
/**
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber20240319Optimized = function (n) {
  const rotateInt = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6
  }

  const ints = n.toString().split('');
  let isDifferent = false;

  for (let i = ints.length - 1, j = 0; Math.floor(ints.length / 2) <= i, j < ints.length; i--, j++) {
    const intI = ints[i];
    const intRotateI = rotateInt[intI];

    const intJ = ints[j];
    const intRotateJ = rotateInt[intJ];

    if (intRotateI === undefined || intRotateJ === undefined) {
      return false;
    } else if (!isDifferent && intRotateI != intJ) {
      isDifferent = true;
    }
  }

  return isDifferent;
};

// 2024/03/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 17:30 min
// Patterns: Array, string manipulation
// Notes w.r.t. solution: Lost a lot of time forgetting to pass in arguments to array methods.
/**
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber20240319 = function (n) {
  const rotateInt = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6
  }

  const ints = n.toString().split('');
  const intsReverse = [];

  for (let i = ints.length - 1; 0 <= i; i--) {
    const int = ints[i];
    const intRotate = rotateInt[int];

    if (intRotate === undefined) {
      return false;
    } else {
      intsReverse.push(intRotate);
    }
  }

  const nRotated = parseInt(intsReverse.join(''));

  return nRotated !== n;
};


// 2023/06
// O(n) time complexity
// O(n) space complexity
// Time to complete: 16:00 min
// Patterns: Array, string
// Notes w.r.t. solution: Could have used built in .reverse() method instead of rotation

/**
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber2023 = function (n) {
  const digits = n.toString().split('');

  // trim any leading zeros
  let rightIndex = digits.length - 1;
  let trimIndex = -1;
  while (0 <= rightIndex && digits[rightIndex] === '0') {
    trimIndex = rightIndex;
    rightIndex--;
  }
  if (trimIndex !== -1) {
    digits.slice(0, trimIndex);
  }

  // rotate entire number by swapping outside digits
  let leftIndex = 0;
  rightIndex = digits.length - 1;
  while (leftIndex < rightIndex) {
    const temp = digits[leftIndex];
    digits[leftIndex] = digits[rightIndex];
    digits[rightIndex] = temp;
    leftIndex++;
    rightIndex--;
  }

  // flip any confusing numbers (e.g. 6, 9) & abort if # invalid
  const invalidNumber = {
    2: true,
    3: true,
    4: true,
    5: true,
    7: true,
  }
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === '6') {
      digits[i] = '9';
    } else if (digits[i] === '9') {
      digits[i] = '6';
    } else if (invalidNumber[digits[i]]) {
      return false;
    }
  }

  return digits.join('') !== n.toString();
};