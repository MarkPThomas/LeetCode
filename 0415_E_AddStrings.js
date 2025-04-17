// 2025/04/17
// O(max(m, n)) time complexity
// O(max(m, n)) space complexity
//  where m = num1 length, n = num2 length
// Time to complete: 12:38 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  // parse strings right to left, adding one integer at a time
  //  how to add? Try Number for now, if that's not allowed, try char codes
  // when adding, carry remainders

  function convertInt(num) {
    return num ? num.charCodeAt() - '0'.charCodeAt() : 0;
  }

  const totalSum = [];
  let remainder = 0;

  let ptr1 = num1.length - 1;
  let ptr2 = num2.length - 1;
  while (ptr1 >= 0 || ptr2 >= 0) {
    const int1 = convertInt(num1[ptr1]);
    const int2 = convertInt(num2[ptr2]);

    let sum = int1 + int2 + remainder;
    remainder = sum > 9 ? 1 : 0;
    sum %= 10;

    totalSum.push(sum);

    ptr1--;
    ptr2--;
  }

  if (remainder) {
    totalSum.push(remainder);
  }

  return totalSum.reverse().join('');
};