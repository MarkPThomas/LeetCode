// 2025/01/06
// O(n * k) time complexity
// O(k) space complexity
//  where n = # prices, k = max # transactions
// Time to complete: xx min
// Patterns: Greedy, Kadane's
// Notes w.r.t. solution: Worked out solution. Kadane's generalized to tracking k maximized states.
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  if (k === 0) {
    return 0;
  }

  const cost = Array(k + 1).fill(Infinity);
  const profit = Array(k + 1).fill(0);

  for (const price of prices) {
    for (let i = 0; i < k; i++) {
      cost[i + 1] = Math.min(cost[i + 1], price - profit[i]);
      profit[i + 1] = Math.max(profit[i + 1], price - cost[i + 1]);
    }
  }

  return profit[k];
};

// 2025/01/04
// O(n * k) time complexity
// O(n * k) space complexity
//  where n = # prices, k = max # transactions
// Time to complete: xx min
// Patterns: Dynamic Programming - State Transition by Inaction
// Notes w.r.t. solution: Worked out solution.
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  //  Each day is either a buy or a sell
  //  Buying
  //      - Track buys - cannot buy if a currentHolding is not null (note it can be 0)
  //      - Never buy on the last day. Makes no sense since we cannot sell.
  //  Selling
  //      - Can only be done w/ a present buy (=> can never sell on first day)
  //      - Never sell on a day where price is less than buy. No profit is made.
  //      - Profit = sellPrice - buyPrice. Add to summed profit.
  //      - subtrack 1 from k
  // Once k = 0, we cannot buy or sell anymore, exit.
  // Buy on any given day except the last, sell on any day after, note profit

  // States:
  //  1. day
  //  2. currentHolding (false/true => 0/1 for memo state indices) - flip to canBuy for simpler code
  //  3. transactionsRemaining (= k on day = 1)
  //
  //  dp(day, transactionsRemaining, currentHolding) returns profit of the day

  const memo = Array(prices.length).fill().map(   // days state
    () => Array(k + 1).fill().map(          // transactions left state
      () => Array(2).fill(0)));           // holding state

  return dp(0, k, 1);

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