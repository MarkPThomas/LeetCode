// O(m) time complexity
// O(m) space complexity
//  where m = # digits in n.
// Time to complete: 5:30 min for string, 9:47 for pure numeric
// Patterns: Picking off integers
// Notes w.r.t. solution:

// ==== Purely Numeric ===
/**
 * @param {number} n
 * @return {boolean}
 */
var isArmstrongNumbers = function (n) {
  let tempN = n;

  let numDigits = 0;
  while (tempN) {
    numDigits++;
    tempN = Math.floor(tempN / 10);
  }

  tempN = n;
  let tempSum = 0;
  while (tempN) {
    tempSum += (Math.floor(tempN % 10)) ** numDigits;
    tempN = Math.floor(tempN / 10);
  }

  return tempSum === n;
};


// ==== With strings ====
/**
 * @param {number} n
 * @return {boolean}
 */
var isArmstrongStrings = function (n) {
  let nString = n.toString();
  let numDigits = [];

  for (let i = 0; i < nString.length; i++) {
    numDigits.push(parseInt(nString[i]))
  }

  let armstrongSum = 0;
  numDigits.forEach((digit) => {
    armstrongSum += digit ** numDigits.length;
  });

  return armstrongSum === n;
};