// 2025/01/07
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6:38 min
// Patterns: Dynamic Programming - State Transition by Inaction
// Notes w.r.t. solution:

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const memo = Array(prices.length).fill().map(() => Array(2).fill(0));

  function dp(day, canBuy) {
    if (day >= prices.length) {
      return 0;
    }

    if (memo[day][canBuy]) {
      return memo[day][canBuy];
    }

    const wait = dp(day + 1, canBuy);
    let act = 0;
    if (canBuy) { // Buy
      act = dp(day + 1, 0) - prices[day];
    } else { // Sell
      // Cooldown is just waiting one day -> day + 2 rather than day + 1 increment
      // Cooldown only applies when a stock is sold
      act = dp(day + 2, 1) + prices[day];
    }

    memo[day][canBuy] = Math.max(wait, act);

    return memo[day][canBuy];
  }

  return dp(0, 1);
};