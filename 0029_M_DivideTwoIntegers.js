// Doing this question "properly", following all the rules given, makes this one of our most difficult medium-level questions.

// O(log(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 36:58 min
// Patterns: Math, Exponential Search
// Notes w.r.t. solution: 21:33 for brute force, solved by 36:58, took untimed time to work out edge case of limit (annoying).
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  // Brute force is to sum the divisor until it exceeds the dividend & return 1 less
  // We could optimize by referring to past sums (e.g. 2: 3 + 3 = 6)
  //      Until we overshoot dividend, then subtract lesser sum
  //      Then add greater sums
  //       Until we are within divisor distance
  //  Like a binary search
  //  Just go sum multiple by sum multiple? Or half it

  const MAX = (2 ** 31) - 1;
  const MIN = -(2 ** 31);

  const isNegative = !((dividend < 0 && divisor < 0) || (dividend > 0 && divisor > 0));
  const dividendAbs = Math.abs(dividend);
  const divisorAbs = Math.abs(divisor);

  function capQuotient(quotient) {
    if (divisor === 1 && quotient === MIN) {
      return MIN;
    }

    return isNegative ? -MAX : MAX;
  }

  if (dividend === 0 || divisorAbs > dividendAbs) {
    return 0;
  } else if (divisorAbs === 1) {
    if (dividendAbs >= MAX) {
      return capQuotient(dividend);
    }

    return isNegative ? -dividendAbs : dividendAbs;
  }

  const sums = [];
  let divisorSum = 0;
  let quotient = 0;
  while (dividendAbs - divisorSum >= divisorAbs) {
    if (!sums.length) {
      sums.push([divisorAbs, 1]);
    }

    while (divisorSum < dividendAbs) {
      const [lastSum, lastQuotient] = sums[sums.length - 1];

      divisorSum += lastSum;
      quotient += lastQuotient;

      if (quotient >= MAX) {
        return capQuotient(quotient);
      }

      sums.push([divisorSum, quotient]);
    }
    sums.pop();

    while (divisorSum > dividendAbs) {
      const [lastSum, lastQuotient] = sums[sums.length - 1];

      divisorSum -= lastSum;
      quotient -= lastQuotient;
    }
    sums.pop();
  }

  return isNegative ? -quotient : quotient;
};