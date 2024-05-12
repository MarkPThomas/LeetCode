// 2024/05/12
// O(n * log(m)) time complexity
// O(1) space complexity
//  where m = max integer
// Time to complete: 2:13 min
// Patterns: Math
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
  function getNumberOfDigits(num) {
    let numberOfDigits = 0;

    while (num) {
      numberOfDigits++;
      num = Math.floor(num / 10);
    }

    return numberOfDigits;
  }

  let numberOfEvenDigits = 0;

  nums.forEach((num) => {
    const numberOfDigits = getNumberOfDigits(num);

    if (numberOfDigits % 2 === 0) {
      numberOfEvenDigits++;
    }
  });

  return numberOfEvenDigits;
};