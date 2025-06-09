// 2025/06/09
// O(max(n, log(k))) time complexity
// O(max(n, log(k))) space complexity
//  where n = # digits in num
// Time to complete: 18:40 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  const numK = [];
  while (k) {
    numK.push(k % 10);
    k = Math.floor(k / 10);
  }
  num.reverse();

  const numSum = [];
  let remainder = 0;

  let i = 0;
  do {
    let sum = (num[i] ?? 0) + (numK[i] ?? 0) + remainder;

    remainder = sum > 9 ? 1 : 0;
    sum %= 10;

    numSum.push(sum);
    i++;
  } while (i < numK.length || i < num.length)

  if (remainder) {
    numSum.push(remainder);
  }

  return numSum.reverse();
};