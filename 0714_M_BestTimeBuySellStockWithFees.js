// 2025/02/15
// O(n) time complexity
// O(n) space complexity
// Time to complete: 17:05 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution:
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {

  function dp(day, canBuy, memo) {
    if (day === prices.length) {
      return 0;
    }

    if (memo[day][canBuy]) {
      return memo[day][canBuy];
    }

    const profitHold = dp(day + 1, canBuy, memo);
    const profitBuySell = canBuy
      ? dp(day + 1, 0, memo) - prices[day]
      : dp(day + 1, 1, memo) + prices[day] - fee;

    memo[day][canBuy] = Math.max(profitHold, profitBuySell);

    return memo[day][canBuy];
  }

  const memo = Array(prices.length).fill().map(() => Array(2).fill(0));
  return dp(0, 1, memo);
};