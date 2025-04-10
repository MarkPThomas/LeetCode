// 2025/04/09
// O(log_5(n)) time complexity
// O(1) space complexity
// Time to complete: 28:20 min
// Patterns: Math
// Notes w.r.t. solution: Had to manually work out to discovering powers of 5.
//  Needed a hint to handle case of 25 & higher (i.e. it is multiples of 5, not sums of 5)
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  if (n < 5) { // handles 0! = 0, 1! = 1, 2! = 1 * 2 = 2
    return 0;
  }

  let numZeros = 0;
  while (n) {
    numZeros += Math.floor(n / 5);
    n /= 5;
  }
  return numZeros;
};

// 2025/04/09
// > O(n^2) time complexity
// O(?) space complexity -> size to store # that large
// Time to complete: 15:49 min (TLE @ 372/500)
// Patterns: Math
// Notes w.r.t. solution: Numerical overflow at 12:06.
//  Hint for BigInt & picking off zeros (which I wondered about) got me the rest of the way.
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  if (n < 5) { // handles 0! = 0, 1! = 1, 2! = 1 * 2 = 2
    return 0;
  }

  // BigInt To handle numerical overflow at n = 30
  const big0 = 0n;
  const big10 = 10n;
  const bigN = BigInt(n);

  let numZeros = 0;
  let factorial = 2n;
  let i = 2n;
  while (i < bigN) {
    i++;
    factorial *= i;

    while (factorial > big0 && factorial % big10 === big0) {
      numZeros++;
      factorial /= big10;
    }
  }

  return numZeros;
};