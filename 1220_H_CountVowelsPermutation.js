// 2025/03/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 17:10 min
// Patterns: Dynamic Progamming - Tree
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function (n) {
  const MOD = 10 ** 9 + 7;
  const vowels = {};
  const A = 'a';
  const E = 'e';
  const I = 'i';
  const O = 'o';
  const U = 'u';

  vowels[A] = 0;
  vowels[E] = 1;
  vowels[I] = 2;
  vowels[O] = 3;
  vowels[U] = 4;

  const memo = Array(n + 1).fill().map(() => Array(5));

  function dp(n, char) {
    if (n === 1) {
      return 1;
    }

    const charCode = vowels[char];
    if (memo[n][charCode] !== undefined) {
      return memo[n][charCode];
    }

    let ways = 0;
    if (char === A) {
      ways += dp(n - 1, E);
    } else if (char === E) {
      ways += dp(n - 1, A);
      ways += dp(n - 1, I);
    } else if (char === I) {
      ways += dp(n - 1, A)
      ways += dp(n - 1, E)
      ways += dp(n - 1, O)
      ways += dp(n - 1, U)
    } else if (char === O) {
      ways += dp(n - 1, I);
      ways += dp(n - 1, U);
    } else if (char === U) {
      ways += dp(n - 1, A);
    }

    ways %= MOD;
    memo[n][charCode] = ways;
    return ways;
  }

  let ways = 0;
  ways += dp(n, A);
  ways += dp(n, E);
  ways += dp(n, I);
  ways += dp(n, O);
  ways += dp(n, U);

  return ways %= MOD;
};