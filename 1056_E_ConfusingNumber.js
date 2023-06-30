// O(n) time complexity
// O(n) space complexity
// Time to complete: 16:00 min
// Patterns: Array, string
// Notes w.r.t. solution: Could have used built in .reverse() method instead of rotation

/**
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber = function (n) {
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