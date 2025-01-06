// 2025/01/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Greedy, Kadane's
// Notes w.r.t. solution: Worked out solution.
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let t1Cost = Infinity;
  let t1Profit = 0;

  let t2Cost = Infinity;
  let t2Profit = 0;

  for (const price of prices) {
    // Max profit from 1 transaction
    t1Cost = Math.min(t1Cost, price);
    t1Profit = Math.max(t1Profit, price - t1Cost);

    // Max profit if profit from prev transaction is reinvested
    t2Cost = Math.min(t2Cost, price - t1Profit);
    t2Profit = Math.max(t2Profit, price - t2Cost);
  }

  return t2Profit;
};

// 2025/01/04
// O(n) time complexity
// O(n) space complexity
//  where n = # prices
// Time to complete: xx min
// Patterns: Dynamic Programming - State Transition by Inaction
// Notes w.r.t. solution: Worked out solution.
//  TLE @ 202/214
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const memo = Array(prices.length).fill().map(   // days state
    () => Array(3).fill().map(              // transactions left state
      () => Array(2).fill(0)));           // holding state

  return dp(0, 2, 1);

  function dp(day, transactionsLeft, canBuy) {
    if (day === prices.length || !transactionsLeft) {
      return 0; // Base case. We are done.
    }

    if (memo[day][transactionsLeft][canBuy]) {
      return memo[day][transactionsLeft][canBuy];
    }

    const nextDay = day + 1;
    const profitWait = dp(nextDay, transactionsLeft, canBuy);

    let profitAct = 0; // Profit if we can't buy or sell
    if (canBuy) { // Buy
      profitAct = dp(nextDay, transactionsLeft, 0) - prices[day];
    } else { // Sell
      profitAct = dp(nextDay, transactionsLeft - 1, 1) + prices[day];
    }

    memo[day][transactionsLeft][canBuy] = Math.max(profitAct, profitWait);

    return memo[day][transactionsLeft][canBuy];
  }
};