// 2024/12/16
// O(t * c) time complexity
// O(t) space complexity
//  where t = total, c = # coins
// Time to complete: 37:21 min / 48:32 min
// Patterns: Dynamic Programming w/ Iteration
// Notes w.r.t. solution: Solved in 37:21, but optimized until 48:32.
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, total) {
  const dp = Array(total + 1).fill(Infinity);
  dp[0] = 0;

  for (let currTotal = 1; currTotal <= total; currTotal++) {
    for (const coin of coins) {
      if (coin <= currTotal) {
        dp[currTotal] = Math.min(dp[currTotal], dp[currTotal - coin] + 1);
      }
    }
  }

  return dp[total] === Infinity ? -1 : dp[total];
};


// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution: Hack Reactor solution?
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, total) {
  if (total < 0) {
    return -1;
  }

  const counter = Array(total + 1).fill(Infinity);
  counter[0] = 0;

  for (let subTotal = 1; subTotal <= total; subTotal++) {
    coins.forEach((coinValue) => {
      if (coinValue <= subTotal) {
        counter[subTotal] = Math.min(counter[subTotal], counter[subTotal - coinValue] + 1);
      }
    });
  }
  return counter[total] > total ? -1 : counter[total];
};