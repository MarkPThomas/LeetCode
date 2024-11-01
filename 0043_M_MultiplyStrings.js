// 2024/11/01
// O(m * (m + n)) = O(m^2 + m * n) time complexity
// O(m * (m + n)) = O(m^2 + m * n) space complexity
// Time to complete: 36:53 min
// Patterns: Math
// Notes w.r.t. solution: Technically went OT, but due to an extremely minor error that took a long time to debug
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return "0";
  }

  function multiplyByDigit(num, digit, tens) {
    const multiplied = Array(tens).fill(0);

    let carryover = 0;
    for (let i = 0; i < num.length; i++) {
      const multiplication = Number(num[i]) * Number(digit) + carryover;
      carryover = Math.floor(multiplication / 10);
      multiplied.push(multiplication % 10);
    }

    if (carryover) {
      multiplied.push(carryover);
    }

    return multiplied;
  }

  function sumNums(nums) {
    let maxLength = nums[nums.length - 1].length;

    const summed = Array(maxLength).fill(0);

    for (const num of nums) {
      let carryover = 0;
      for (let i = 0; i < num.length; i++) {
        const sum = num[i] + summed[i] + carryover;
        carryover = Math.floor(sum / 10);
        summed[i] = sum % 10;
      }

      if (carryover) {
        summed[num.length] = carryover;
      }
    }

    return summed;
  }

  const numShort = num1.length < num2.length ? [...num1] : [...num2];
  numShort.reverse();

  const numLong = num1.length < num2.length ? [...num2] : [...num1];
  numLong.reverse();

  // T: O(m * n)
  // S: O(m * (m + n)) = O(m^2 + m * n)
  const intMultiples = [];
  for (let i = 0; i < numShort.length; i++) {
    let intMultiple = multiplyByDigit(numLong, numShort[i], i);
    intMultiples.push(intMultiple);
  }

  // Longest result = m + n
  // T: O(m * (m + n)) = O(m^2 + m * n)
  // S: O(m + n)
  const summed = sumNums(intMultiples);
  summed.reverse();

  return summed.join('');
};